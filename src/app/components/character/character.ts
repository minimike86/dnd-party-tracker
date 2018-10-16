import { Race } from './enum-race';
import { Size } from './enum-size';
import { Alignment } from './enum-alignment';
import {AbilityScores} from './ability-scores/ability-scores';

export class Character {

  id: number;

  // Description
  characterName: string;
  playerName: string;
  classes: Array<[string, number]>;
  ecl?: number;
  race: Race;
  size: Size;
  gender: string;
  alignment: Alignment;
  religion?: string;
  height: [number, number]; // 5' 10"
  weight: number;           // 220 lbs.
  looks?: string;

  // Ability Scores
  abilityScores: AbilityScores;

}
