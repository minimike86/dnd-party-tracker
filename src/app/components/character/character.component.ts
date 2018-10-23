import {Component, OnInit} from '@angular/core';
import {Character} from '../../models/character/character';
import {Race} from '../../enums/enum-race';
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
    id: 1,
    characterName: 'Floon Blagmaar',
    playerName: 'Mike Warner',
    classes: Array(
            {className: 'Fighter', level: 1},
                  {className: 'Sorcerer', level: 1},
                  {className: 'Rogue', level: 1}
            ),
    ecl: 3,
    race: Race.HUMAN,
    size: Size.MEDIUM,
    gender: Gender.MALE,
    alignment: Alignment.CN,
    religion: 'Pelor',
    height: [5, 10], // feet, inches
    weight: 220, // lbs.
    baseAbilityScores: new AbilityScore(
                                        8,
                                        16,
                                        12,
                                        18,
                                        6,
                                        17),
    hitPoints: Math.floor(((Math.random() * 6) + 1) * 3 + (1 * 3)),
    hitDie: Array({hitDie: 'd6', dieValue: 6},
                        {hitDie: 'd6', dieValue: 4},
                        {hitDie: 'd4', dieValue: 2}
            ),
    baseAttackBonus: 20,
    inventory: null,
    weapons: Array(
      new Weapon(1, 'Longsword +2', '', {platinum: 0, gold: 15, electrum: 0, silver: 0, copper: 0}, 4,
        WeaponCategory.MARTIAL, CombatStyle.MELEE, WeaponType.ONE_HANDED, 2, Size.MEDIUM, false, false, false,
        false, null, '1d8', Array(DamageType.SLASHING), '19-20/x2', null,
        null, false),
      new Weapon(2, 'Longbow, composite', '', {platinum: 0, gold: 100, electrum: 0, silver: 0, copper: 0},
        4, WeaponCategory.MARTIAL, CombatStyle.RANGED, null, 0, Size.MEDIUM, false, false, false,
        true, Array({ammoType: 'Arrows', quantity: 20}), '1d8', Array(DamageType.PIERCING), 'x3',
        110, null, false))
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
