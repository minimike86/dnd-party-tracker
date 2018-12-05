import { AbilityScore } from './ability-scores';

export interface CharacterId extends Character {

  id: string;

}

export interface Character {

  owner?: string;        // User account (email)

  // Description
  characterName: string;
  playerName: string;
  classes: Array<{classId: string, level: number}>;
  clericDomains?: Array<string>;
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

  // Skills
  skillRanks: {
    skillId: string,
    ranks: number,
    misc: number
  }[];

  // Inventory
  weaponsId: string;
  inventoryId: string;

}
