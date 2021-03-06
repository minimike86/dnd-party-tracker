import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbModal, NgbPopover, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClassId } from '../../../models/character/character-class';
import { ReligionService } from '../../../services/firebase/religion/religion.service';
import { ReligionId } from '../../../models/character/religion';
import { RaceService } from '../../../services/firebase/race/race.service';
import { generateNewRandomHeight, generateNewRandomWeight, getAgeCategory, RaceId } from '../../../models/character/race';
import { AlignmentPickerComponent } from '../modals/alignment-picker/alignment-picker.component';
import { ReligionPickerComponent } from '../modals/religion-picker/religion-picker.component';


@Component({
  selector: 'app-new-character-class',
  templateUrl: './new-character-class.component.html',
  styleUrls: ['./new-character-class.component.css']
})
export class NewCharacterClassComponent implements OnInit {

  // public character: Character;
  public religions: ReligionId[];
  public races: RaceId[];

  public readyToPickSkills: boolean;
  public playerHasSelectedClass: boolean;

  public classes: CharacterClassId[];
  public favoredClass: string;
  public typeAheadClass: any;
  public selectedClass: CharacterClassId;

  public clericDomains: string[];
  public alignment: string;
  public hitDie: number;
  public hitPoints: number;

  public height: [number, number];
  public heightInchesMin: number;
  public weight: number;

  public age: number;
  public ageCategory: string;

  @ViewChild('popover') public popover: NgbPopover;
  public nextSkillsBtnClass: string;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private router: Router,
              public characterService: CharacterService,
              public religionService: ReligionService,
              public raceService: RaceService,
              private classService: CharacterClassService,
              private modalService: NgbModal) {
    religionService.getReligions().subscribe(data => {
      this.religions = data;
    });
    raceService.getRaces().subscribe(data => {
      this.races = data;
      if (this.races.find(race => race.id === this.characterService.tempCharacter.raceId) !== undefined) {
        this.favoredClass = this.races.find(race => race.id === this.characterService.tempCharacter.raceId).favoredClass;
      }
    });
    classService.getClasses().subscribe(
      value => {
        // Set races from firebase db
        this.classes = value;
        // Sort races by name
        this.classes.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      err => console.log('Error :: ' + err)
    );
    if (this.characterService.tempCharacter.owner === null) {
      console.log('tempCharacter owner is null, returning to character creation step 1.');
      router.navigate( ['/character/new/'] );
    }
  }

  ngOnInit() {
    this.readyToPickSkills = false;
    this.playerHasSelectedClass = false;
    this.classes = [];
    this.clericDomains = [];
    this.characterService.tempCharacter.hitPoints = 0;
    this.characterService.tempCharacter.hitDie = [{hitDie: 0, dieValue: 0}];
    this.characterService.tempCharacter.age = 0;
    this.ageCategory = '';
    this.characterService.tempCharacter.baseAttackBonus = 0;
    this.characterService.tempCharacter.saves.fort = 0;
    this.characterService.tempCharacter.saves.ref = 0;
    this.characterService.tempCharacter.saves.will = 0;
  }

  formatMatches = (matchedValue: any) => matchedValue.name || '';
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (
          term === '' ? this.classes : this.classes.filter( v => v.name.toString().toLowerCase().indexOf( term.toLowerCase() ) > -1  )
        ).slice(0, 15)
      )
    );
  }
  setSelectedClass(selectedValue: any): void {
    this.selectedClass = this.classes.find(race => race.name === selectedValue.name);
    this.characterService.tempCharacter.classes = Array({
      classId: this.selectedClass.id,
      level: 1
    });
    this.playerHasSelectedClass = true;
    this.characterService.tempCharacter.alignment = null;   // reset alignment
    this.characterService.tempCharacter.religion = [];      // reset religion
    this.characterService.tempCharacter.age = this.generateNewRandomAge();
    this.characterService.tempCharacter.hitPoints = this.getHitPointsForClass(
      this.selectedClass,
      this.characterService.tempCharacter.totalAbilityScores.constitution
    );
    this.characterService.tempCharacter.hitDie[0] = {
      hitDie: this.selectedClass.hitDie,
      dieValue: this.characterService.tempCharacter.hitPoints
    };
    this.characterService.tempCharacter.baseAttackBonus = this.selectedClass.baseAttackBonus[0];
    this.characterService.tempCharacter.saves.fort = this.selectedClass.saves.fortitude[0];
    this.characterService.tempCharacter.saves.ref = this.selectedClass.saves.reflex[0];
    this.characterService.tempCharacter.saves.will = this.selectedClass.saves.will[0];
    this.checkClassSelectionActionsPerformed();
  }

  checkClassSelectionActionsPerformed() {
    if (this.selectedClass.id === 'CLERIC') {
      if (this.characterService.tempCharacter.alignment !== null
        && this.characterService.tempCharacter.religion !== undefined
        && this.characterService.tempCharacter.religion.length > 0
        && this.characterService.tempCharacter.clericDomains !== undefined
        && this.characterService.tempCharacter.clericDomains.length === 2) {
        this.readyToPickSkills = true;
        this.nextSkillsBtnClass = 'btn-primary';
      } else {
        this.readyToPickSkills = false;
        this.nextSkillsBtnClass = 'btn-secondary';
      }
    } else {
      this.readyToPickSkills = true;
      this.nextSkillsBtnClass = 'btn-primary';
    }
  }

  getHitPointsForClass(clsId: CharacterClassId, constitution: number): number {
    let hp = clsId.hitDie + this.getAbilityModifier(constitution);
    if ( hp <= 0 ) {
      hp = 1;
    }
    return hp;
  }

  getAbilityModifier(abilityScore: number): number {
    return Math.floor(abilityScore / 2) - 5;
  }

  openSelectAlignmentModal(): void {
    const modalRef = this.modalService.open(AlignmentPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass =
      this.characterService.tempCharacter.classes.length >= 1 ? this.characterService.tempCharacter.classes[0].classId : '';
  }

  openSelectReligionModal(): void {
    const modalRef = this.modalService.open(ReligionPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass =
      this.characterService.tempCharacter.classes.length >= 1 ? this.characterService.tempCharacter.classes[0].classId : '';
  }

  getReligionText(): string {
    let religionText = '';
    for (let i = 0; i < this.characterService.tempCharacter.religion.length; i++) {
      switch (i) {
        case 0: religionText += this.religions
          .find( rel => rel.id === this.characterService.tempCharacter.religion[i] ).name; break;
        case this.characterService.tempCharacter.religion.length - 1: religionText += ', and ' + this.religions
          .find( rel => rel.id === this.characterService.tempCharacter.religion[i] ).name; break;
        default: religionText += ', ' + this.religions
          .find( rel => rel.id === this.characterService.tempCharacter.religion[i] ).name; break;
      }
    }
    this.checkClassSelectionActionsPerformed();
    return religionText;
  }

  getReligionDomains(): string[] {
    let domains: string[] = [];
    for (const rel of this.characterService.tempCharacter.religion) {
      domains = domains.concat(this.religions.find(data => data.id === rel).domains);
    }
    return Array.from(new Set(domains.sort()));
  }

  isClericDomainsValid(): boolean {
    if (this.clericDomains.length === 2) {
      return true;
    } else {
      return false;
    }
  }

  updateClericDomains(): void {
    if (this.clericDomains.length === 2) {
      this.characterService.tempCharacter.clericDomains = this.clericDomains;
    }
  }

  heightFeetChanged(): void {
    if (this.characterService.tempCharacter.height.feet === null || this.characterService.tempCharacter.height.inches === null) {
      this.randomHeight();
    }
  }

  heightInchesChanged(): void {
    if (this.characterService.tempCharacter.height.inches >= 12) {
      this.characterService.tempCharacter.height.feet = this.characterService.tempCharacter.height.feet + 1;
      this.characterService.tempCharacter.height.inches = 0;
    } else if (this.characterService.tempCharacter.height.feet >= 1 && this.characterService.tempCharacter.height.inches <= -1) {
      this.characterService.tempCharacter.height.feet = this.characterService.tempCharacter.height.feet - 1;
      this.characterService.tempCharacter.height.inches = 11;
    }
    if (this.characterService.tempCharacter.height.feet <= 0 && this.characterService.tempCharacter.height.inches <= 1) {
      this.heightInchesMin = 0;
    } else {
      this.heightInchesMin = -1;
    }
    if (this.characterService.tempCharacter.height.feet === null || this.characterService.tempCharacter.height.inches === null) {
      this.randomHeight();
    }
  }

  generateNewRandomAge(): number {
    if (this.classes !== undefined && this.classes !== null
      && this.characterService.tempCharacter.classes.length >= 1
      && this.races !== undefined && this.races !== null) {

      const race: RaceId = this.races.find(data => data.id === this.characterService.tempCharacter.raceId);
      let age = 0;
      let rnd = 0;
      switch (this.selectedClass.startingAgeType) {
        case 'simple':
          for (let i = 0; i < race.startingAges.classAges.simple.dieCount; i++) {
            rnd = Math.floor(Math.random() * race.startingAges.classAges.simple.dieType) + 1;
            age = age + rnd;
          }
          break;
        case 'moderate':
          for (let i = 0; i < race.startingAges.classAges.moderate.dieCount; i++) {
            rnd = Math.floor(Math.random() * race.startingAges.classAges.moderate.dieType) + 1;
            age = age + rnd;
          }
          break;
        case 'complex':
          for (let i = 0; i < race.startingAges.classAges.complex.dieCount; i++) {
            rnd = Math.floor(Math.random() * race.startingAges.classAges.complex.dieType) + 1;
            age = age + rnd;
          }
          break;
      }
      this.characterService.tempCharacter.age = age + race.startingAges.adulthood;
      this.ageHasChanged();
      return race.startingAges.adulthood + age;

    } else {
      console.log('No race and/or class selected unable to set starting age.');
    }
  }

  ageHasChanged() {
    const race: RaceId = this.races.find(data => data.id === this.characterService.tempCharacter.raceId);
    this.ageCategory = getAgeCategory(race, this.characterService.tempCharacter.age);
    if (this.characterService.tempCharacter.age === null) { this.characterService.tempCharacter.age = this.generateNewRandomAge(); }
  }

  randomHeight() {
    this.characterService.tempCharacter.height = generateNewRandomHeight(
      this.races.find(data => data.id === this.characterService.tempCharacter.raceId),
      this.characterService.tempCharacter.gender
    );
  }

  randomWeight() {
    this.characterService.tempCharacter.weight = generateNewRandomWeight(
      this.races.find(data => data.id === this.characterService.tempCharacter.raceId),
      this.characterService.tempCharacter.gender
    );
  }

  weightHasChanged() {
    if (this.characterService.tempCharacter.weight === null) { this.randomWeight(); }
  }

  selectSkills() {
    if (this.characterService.tempCharacter.classes[0].classId === 'CLERIC') {
      // Is a Cleric
      if (this.characterService.tempCharacter.clericDomains !== undefined && this.characterService.tempCharacter.clericDomains.length === 2
        && this.characterService.tempCharacter.alignment !== null
        && this.characterService.tempCharacter.religion !== undefined && this.characterService.tempCharacter.religion.length > 0
        && this.readyToPickSkills) {
        this.router.navigate( ['/character/new/skill'] );
      } else {
        this.popover.ngbPopover = 'Cleric\'s must select an alignment and patron deity. Then select two of the deities divine domains.';
        this.popover.open();
      }
    } else {
      // Not a Cleric
      if (this.readyToPickSkills) {
        this.router.navigate( ['/character/new/skill'] );
      } else {
        this.popover.ngbPopover = 'Select your characters class.';
        this.popover.open();
      }
    }
  }

}
