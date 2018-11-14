import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CharacterService } from '../../../services/firebase/character/character.service';
import { CharacterClassService } from '../../../services/firebase/character-class/character-class.service';
import { CharacterClass, CharacterClassId } from '../../../models/character/character-class';
import { Character } from '../../../models/character/character';


@Component({
  selector: 'app-new-character-class',
  templateUrl: './new-character-class.component.html',
  styleUrls: ['./new-character-class.component.css']
})
export class NewCharacterClassComponent implements OnInit {

  public character: Character;
  public classes: any;
  public typeAheadClass: any;
  public selectedClass: any;
  public playerHasSelectedClass: boolean;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(characterService: CharacterService,
              classService: CharacterClassService) {

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

    this.character = characterService.tempCharacter;

  }

  ngOnInit() {
    this.classes = [];
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
    console.log(selectedValue);
    // Set selected race and emit updates back to parent component
    this.selectedClass = this.classes.find(race => race.name === selectedValue.name);
    this.playerHasSelectedClass = true;
  }

}
