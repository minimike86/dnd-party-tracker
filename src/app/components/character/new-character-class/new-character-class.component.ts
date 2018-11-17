import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClass, CharacterClassId } from '../../../models/character/character-class';
import { Character } from '../../../models/character/character';
import { AlignmentPickerComponent } from '../modals/alignment-picker/alignment-picker.component';
import { AbilityScore } from '../../../models/character/ability-scores';
import { ReligionPickerComponent } from '../modals/religion-picker/religion-picker.component';


@Component({
  selector: 'app-new-character-class',
  templateUrl: './new-character-class.component.html',
  styleUrls: ['./new-character-class.component.css']
})
export class NewCharacterClassComponent implements OnInit {

  public character: Character;
  public alignment: string;

  public heightFeet: number;
  public heightInches: number;
  public heightInchesMin: number;
  public weight: number;

  public age: number;
  public ageCategory: string;

  public classes: any;
  public typeAheadClass: any;
  public selectedClass: CharacterClassId;
  public playerHasSelectedClass: boolean;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(public characterService: CharacterService,
              private classService: CharacterClassService,
              private modalService: NgbModal) {
    this.classes = classService.getClasses().subscribe(
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
    // TODO: Make default height and weight be the races random starting value
    this.heightFeet = 0;
    this.heightInches = 0;
    this.heightInchesMin = 0;
    this.weight = 0;
    // TODO: Make age the random starting age for a given race
    this.age = 0;
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
    // Set selected race and emit updates back to parent component
    this.selectedClass = this.classes.find(race => race.name === selectedValue.name);
    this.character.classes = Array({
      classId: this.selectedClass.id,
      level: 1
    });
    this.playerHasSelectedClass = true;
  }

  openSelectAlignmentModal(): void {
    const modalRef = this.modalService.open(AlignmentPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass = this.character.classes.length >= 1 ? this.character.classes[0].classId : '';
  }

  openSelectReligionModal(): void {
    const modalRef = this.modalService.open(ReligionPickerComponent, { size: 'lg' });
    modalRef.componentInstance.characterClass = this.character.classes.length >= 1 ? this.character.classes[0].classId : '';
  }

  heightInchesChanged(): void {
    if (this.heightInches >= 12) {
      this.heightFeet = this.heightFeet + 1;
      this.heightInches = 0;
    } else if (this.heightFeet >= 1 && this.heightInches <= -1) {
      this.heightFeet = this.heightFeet - 1;
      this.heightInches = 11;
    }
    if (this.heightFeet <= 0 && this.heightInches <= 1) {
      this.heightInchesMin = 0;
    } else {
      this.heightInchesMin = -1;
    }
  }

  generateRandomAge(dieCount: number, dieType: number): void {
    const adulthoodAgeForRace = Math.floor((Math.random() * 110) + 14);
    const ageForClass = (Math.floor((Math.random() * dieType) + 1) * dieCount);
    this.age = adulthoodAgeForRace + ageForClass;
  }

  generateRandomHeight(): void {
    //
  }

  generateRandomWeight(): void {
    //
  }

  getAgingEffects(race: any, age: number): AbilityScore {
    if (age >= race.agingEffects.venerable) {
      return new AbilityScore(-6, -6, -6, 3, 3, 3);
    } else if (age >= race.agingEffects.old) {
      return new AbilityScore(-3, -3, -3, 2, 2, 2);
    } else if (age >= race.agingEffects.middleAge) {
      return new AbilityScore(-1, -1, -1, 1, 1, 1);
    }
    return new AbilityScore(0, 0, 0, 0, 0, 0);
  }

}
