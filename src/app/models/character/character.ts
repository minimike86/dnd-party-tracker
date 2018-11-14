import { Size } from '../../enums/enum-size';
import { Alignment } from '../../enums/enum-alignment';
import { AbilityScore } from './ability-scores';
import { Item } from '../item/item';
import { Weapon } from '../item/weapon';

export interface CharacterId extends Character {

  id: string;

}

export interface Character {

  owner?: string;        // User account (email)

  // Description
  characterName: string;
  playerName: string;
  classes: Array<{className: string, level: number}>;
  ecl?: number;
  raceId: string;
  size: Size;
  imageUrl?: string;
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
  weaponsId: string;
  inventoryId: string;

}
