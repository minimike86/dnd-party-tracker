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
            {classId: 'FIGHTER', level: 1},
                  {classId: 'SORCERER', level: 1},
                  {classId: 'ROGUE', level: 1}
            ),
    ecl: 3,
    raceId: 'V9qgAWIxvCDpaRDv4YaF',
    size: Size.MEDIUM,
    gender: Gender.MALE,
    age: 50,
    alignment: Alignment.CN,
    religion: ['BOCCOB'],
    height: { feet: 5, inches: 10 }, // feet, inches
    weight: 220, // lbs.
    baseAbilityScores: new AbilityScore(8, 16, 12, 18, 6, 17),
    hitPoints: Math.floor(((Math.random() * 6) + 1) * 3 + (1 * 3)),
    hitDie: Array({hitDie: 6, dieValue: 6},
                        {hitDie: 6, dieValue: 4},
                        {hitDie: 4, dieValue: 2}
            ),
    baseAttackBonus: 20,
    inventoryId: '',
    weaponsId: ''
  };

  constructor() {}

  ngOnInit() {
  }

  // TODO: Get character class name from db for given classId field
  getCharClassAndLevelString(): string {
    let tempStr = '';
    for (const charClass of this.mockCharacter.classes) {
      if (tempStr === '') {
        tempStr += charClass.classId + charClass.level;
      } else {
        tempStr += ' / ' + charClass.classId + charClass.level;
      }
    }
    return tempStr;
  }

}
