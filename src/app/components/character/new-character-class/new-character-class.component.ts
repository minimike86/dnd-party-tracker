import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClass, CharacterClassId } from '../../../models/character/character-class';
import { Character } from '../../../models/character/character';
import { AlignmentPickerComponent } from '../modals/alignment-picker/alignment-picker.component';
import { ReligionPickerComponent } from '../modals/religion-picker/religion-picker.component';
import { ReligionId } from '../../../models/character/religion';
import { ReligionService } from '../../../services/firebase/religion/religion.service';
import {generateStartingAge, generateRandomHeight, generateRandomWeight, RaceId, getAgeCategory} from '../../../models/character/race';
import { RaceService } from '../../../services/firebase/race/race.service';


@Component({
  selector: 'app-new-character-class',
  templateUrl: './new-character-class.component.html',
  styleUrls: ['./new-character-class.component.css']
})
export class NewCharacterClassComponent implements OnInit {

  public character: Character;
  public religions: ReligionId[];
  public races: RaceId[];

  public classes: any;
  public typeAheadClass: any;
  public selectedClass: CharacterClassId;
  public playerHasSelectedClass: boolean;

  public alignment: string;
  public hitDie: number;
  public hitPoints: number;

  public height: [number, number];
  public heightFeet: number;
  public heightInches: number;
  public heightInchesMin: number;
  public weight: number;

  public age: number;
  public ageCategory: string;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(public characterService: CharacterService,
              public religionService: ReligionService,
              public raceService: RaceService,
              private classService: CharacterClassService,
              private modalService: NgbModal) {
    religionService.getReligions().subscribe(data => {
      this.religions = data;
    });
    raceService.getRaces().subscribe(data => {
      this.races = data;
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
  }

  ngOnInit() {
    this.character = this.characterService.tempCharacter;
    this.classes = [];
    this.characterService.tempCharacter.ecl = 1; // TODO: Add Racial Level Adjustment
    this.characterService.tempCharacter.hitPoints = 0;
    this.characterService.tempCharacter.hitDie = [{ hitDie: 0, dieValue: 0 }];
    // TODO: Make default height and weight be the races random starting value
    this.characterService.tempCharacter.height = { feet: 0, inches: 0 };
    this.characterService.tempCharacter.weight = 0;
    // TODO: Make age the random starting age for a given race
    this.characterService.tempCharacter.age = 0;
    this.ageCategory = '';
  }

  formatMatches = (matchedValue: any) => matchedValue.name || '';
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (
          term === '' ? this.classes : this.classes.filter( v => v.name.toString().toLowerCase().indexOf( term.toLowerCase() ) > -1  )
        ).slice(0, 10)
      )
    );
  }
  setSelectedClass(selectedValue: any): void {
    this.selectedClass = this.classes.find(race => race.name === selectedValue.name);
    this.character.classes = Array({
      classId: this.selectedClass.id,
      level: 1
    });
    this.playerHasSelectedClass = true;
    this.characterService.tempCharacter.alignment = null;   // reset alignment
    this.characterService.tempCharacter.religion = [];      // reset religion
    this.characterService.tempCharacter.age =
      generateStartingAge(this.races.filter(race => race.id === this.characterService.tempCharacter.raceId)[0], this.selectedClass);
    this.characterService.tempCharacter.hitPoints = this.selectedClass.hitDie;
    this.characterService.tempCharacter.hitDie[0] = {
      hitDie: this.selectedClass.hitDie,
      dieValue: this.characterService.tempCharacter.hitPoints
    };
  }

  openSelectAlignmentModal(): void {
    const modalRef = this.modalService.open(AlignmentPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass = this.character.classes.length >= 1 ? this.character.classes[0].classId : '';
  }

  openSelectReligionModal(): void {
    const modalRef = this.modalService.open(ReligionPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass = this.character.classes.length >= 1 ? this.character.classes[0].classId : '';
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
    return religionText;
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
  }

  generateRandomAge() {
    //
  }

  generateNewRandomHeight() {
    //
  }

  generateNewRandomWeight() {
    //
  }

}
