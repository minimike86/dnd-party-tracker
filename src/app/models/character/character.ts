import { Size } from '../../enums/enum-size';
import { Alignment } from '../../enums/enum-alignment';
import { AbilityScore } from './ability-scores';
import { Item } from '../item/item';
import { Weapon } from '../item/weapon';
import {Religion} from './religion';

export interface CharacterId extends Character {

  id: string;

}

export interface Character {

  owner?: string;        // User account (email)

  // Description
  characterName: string;
  playerName: string;
  classes: Array<{classId: string, level: number}>;
  ecl?: number;
  raceId: string;
  size: string;
  imageUrl?: string;
  gender: string;
  age: number;
  alignment: string;
  religion?: Array<string>;
  height: { feet: number, inches: number }; // 5' 10"
  weight: number;           // 220 lbs.
  looks?: string;
  personality?: string;
  background?: string;

  // Ability Scores
  tempAbilityScores: AbilityScore;
  totalAbilityScores: AbilityScore;

  // HP
  hitPoints: number;
  hitDie?: Array<{hitDie: number, dieValue: number}>;

  // BAB
  baseAttackBonus: number;

  // Saves
  saves: { fort: number, ref: number, will: number };

  // Inventory
  weaponsId: string;
  inventoryId: string;

}
