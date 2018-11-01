import { RaceName } from '../../enums/enum-race';
import { Size } from '../../enums/enum-size';
import { Alignment } from '../../enums/enum-alignment';
import { AbilityScore } from './ability-scores';
import { Item } from '../../models/item/item';
import { Weapon } from '../item/weapon';

export class Character {

  id: number;

  // Description
  characterName: string;
  playerName: string;
  classes: Array<{className: string, level: number}>;
  ecl?: number;
  race: RaceName;
  size: Size;
  gender: string;
  alignment: Alignment;
  religion?: string;
  height: [number, number]; // 5' 10"
  weight: number;           // 220 lbs.
  looks?: string;

  // Ability Scores
  baseAbilityScores: AbilityScore;

  // HP
  hitPoints: number;
  hitDie?: Array<{hitDie: string, dieValue: number}>;

  // BAB
  baseAttackBonus: number;

  // Inventory
  weapons: Array<Weapon>;
  inventory: Array<Item>;

}
