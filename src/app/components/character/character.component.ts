import {Component, OnInit} from '@angular/core';
import {Character} from '../../models/character/character';
import {Size} from '../../enums/enum-size';
import {Gender} from '../../enums/enum-gender';
import {Alignment} from '../../enums/enum-alignment';
import {AbilityScore} from '../../models/character/ability-scores';
import {CombatStyle, DamageType, Weapon, WeaponCategory, WeaponType} from '../../models/item/weapon';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  mockCharacter: Character = {
    characterName: 'Floon Blagmaar',
    playerName: 'Mike Warner',
    classes: Array(
            {className: 'Fighter', level: 1},
                  {className: 'Sorcerer', level: 1},
                  {className: 'Rogue', level: 1}
            ),
    ecl: 3,
    raceId: 'V9qgAWIxvCDpaRDv4YaF',
    size: Size.MEDIUM,
    gender: Gender.MALE,
    age: 50,
    alignment: Alignment.CN,
    religion: 'Pelor',
    height: [5, 10], // feet, inches
    weight: 220, // lbs.
    baseAbilityScores: new AbilityScore(8, 16, 12, 18, 6, 17),
    hitPoints: Math.floor(((Math.random() * 6) + 1) * 3 + (1 * 3)),
    hitDie: Array({hitDie: 'd6', dieValue: 6},
                        {hitDie: 'd6', dieValue: 4},
                        {hitDie: 'd4', dieValue: 2}
            ),
    baseAttackBonus: 20,
    inventoryId: '',
    weaponsId: ''
  };

  constructor() {}

  ngOnInit() {
  }

  getCharClassAndLevelString(): string {
    let tempStr = '';
    for (const charClass of this.mockCharacter.classes) {
      if (tempStr === '') {
        tempStr += charClass.className + charClass.level;
      } else {
        tempStr += ' / ' + charClass.className + charClass.level;
      }
    }
    return tempStr;
  }

}
