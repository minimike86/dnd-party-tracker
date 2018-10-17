import {Component, OnInit} from '@angular/core';
import { Character } from './character';
import { Race } from './enum-race';
import { Size } from './enum-size';
import { Gender } from './enum-gender';
import { Alignment } from './enum-alignment';
import { AbilityScores } from '../character/ability-scores/ability-scores';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  mockCharacter: Character = {
    id: 1,
    characterName: 'Floon Blagmaar',
    playerName: 'Mike Warner',
    classes: [['Fighter', 1], ['Sorcerer', 1], ['Rogue', 1]],
    ecl: 3,
    race: Race.HUMAN,
    size: Size.MEDIUM,
    gender: Gender.MALE,
    alignment: Alignment.CN,
    religion: 'Pelor',
    height: [5, 10], // feet, inches
    weight: 220, // lbs.
    abilityScores: new AbilityScores(10, 11, 12, 13, 14, 15)
  };

  constructor() { }

  ngOnInit() {
  }

  getCharClassAndLevelString(): string {
    let tempStr = '';
    for (let i = 0, len = this.mockCharacter.classes.length; i < len; i++) {
      if ( i === 0 ) {
        tempStr += this.mockCharacter.classes[i][0] + ' ' + this.mockCharacter.classes[i][1];
      } else {
        tempStr += ' / ' + this.mockCharacter.classes[i][0] + ' ' + this.mockCharacter.classes[i][1];
      }
    }
    return tempStr;
  }

}
