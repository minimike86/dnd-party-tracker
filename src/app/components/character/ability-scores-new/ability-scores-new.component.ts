import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AbilityScore, AbilityScoreAbbreviation  } from '../../../models/character/ability-scores';
import {RaceId} from '../../../models/character/race';


@Component({
  selector: 'app-ability-scores-new',
  templateUrl: './ability-scores-new.component.html',
  styleUrls: ['./ability-scores-new.component.css']
})
export class AbilityScoresNewComponent implements OnInit {

  public charIsNew: boolean;

  @Input() baseAbilityScores: AbilityScore;
  public totalAbilityScores: AbilityScore;
  @Output() totalAbilityScoresChanged: EventEmitter<AbilityScore> = new EventEmitter();

  public abilityScoreAbbr: AbilityScoreAbbreviation;
  public boundAbbreviationKeys: Array<string>;

  public allowCheating: boolean;
  public statRollRules: any;
  public highStat = 16;
  public lowStat = 7;

  public hasRolledStr: boolean;
  public hasRolledDex: boolean;
  public hasRolledCon: boolean;
  public hasRolledInt: boolean;
  public hasRolledWis: boolean;
  public hasRolledCha: boolean;
  public hasRolledAllStats: boolean;

  @Input() selectedRace: RaceId;
  @Input() playerHasSelectedRace: boolean;

  @Output() playerHasRolledAllStatsChanged: EventEmitter<boolean> = new EventEmitter();
  public pointBuy: number;

  constructor() {
  }

  ngOnInit() {
    this.charIsNew = true;
    if (this.baseAbilityScores === undefined) {
      // Create a new character
      this.baseAbilityScores = new AbilityScore(8, 8, 8, 8, 8, 8);
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.allowCheating = false;
      this.statRollRules = { 'id': 0, 'name': '4d6 drop lowest' };
      this.hasRolledStr = false;
      this.hasRolledDex = false;
      this.hasRolledCon = false;
      this.hasRolledInt = false;
      this.hasRolledWis = false;
      this.hasRolledCha = false;
      this.hasRolledAllStats = false;
      this.pointBuy = this.getPointBuyPoints();
    } else {
      // View an existing character
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.charIsNew = false;
    }
    this.abilityScoreAbbr = new AbilityScoreAbbreviation();
    this.boundAbbreviationKeys = Array.from(this.abilityScoreAbbr.abbreviation.keys()); // Fix "Expression changed after it was checked."
  }


  getAbilityModifier(abilityScore: number): string {
    const modifier = Math.floor(abilityScore / 2) - 5;
    if (modifier < 0) {
      return '' + modifier; // '-' is already present in negative number
    } else {
      return '+' + modifier;
    }
  }


  toggleAllowCheating(event: boolean): void {
    this.allowCheating = event;
  }

  selectStatRollingRule(ruleId: any): void {
    this.statRollRules = ruleId;
  }


  rollStat(): number {
    const diePool: Array<number> = [0, 0, 0, 0];
    let dieCount = 0;
    switch (this.statRollRules.id) {
      case 0: // 4d6 drop lowest
        for (let i = 0; i < 4; i++) {                           // Roll 4d6
          diePool[i] = (Math.floor((Math.random() * 6 + 1)));   // Add 1d6 to Die Pool
        }
        diePool.sort().reverse().pop();                         // Sort Die Pool, Drop lowest Die
        diePool.forEach(die => {
          dieCount += die;                                      // Count Die
        });
        break;
      case 1: // 4d6 drop lowest, re-roll 1's
        for (let i = 0; i < 4; i++) {                           // Roll 4d6
          do {
            diePool[i] = (Math.floor((Math.random() * 6 + 1))); // Add 1d6 to Die Pool
          } while (diePool[i] === 1);                           // re-roll 1d6 if it was a 1
        }
        diePool.sort().reverse().pop();                         // Sort Die Pool, Drop lowest Die
        diePool.forEach(die => {
          dieCount += die;                                      // Count Die
        });
        break;
    }
    return dieCount;
  }


  enforceRacialAbilityRules() {
    // Enforce racial ability score rules
    if ( this.selectedRace !== undefined ) {
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.strength !== undefined ) {
        this.totalAbilityScores.strength =
          (this.totalAbilityScores.strength <= this.selectedRace.abilityScoreMinimum.strength)
            ? this.selectedRace.abilityScoreMinimum.strength : this.totalAbilityScores.strength;
      }
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.dexterity !== undefined ) {
        this.totalAbilityScores.dexterity =
          (this.totalAbilityScores.dexterity <= this.selectedRace.abilityScoreMinimum.dexterity)
            ? this.selectedRace.abilityScoreMinimum.dexterity : this.totalAbilityScores.dexterity;
      }
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.constitution !== undefined ) {
        this.totalAbilityScores.constitution =
          (this.totalAbilityScores.constitution <= this.selectedRace.abilityScoreMinimum.constitution)
            ? this.selectedRace.abilityScoreMinimum.constitution : this.totalAbilityScores.constitution;
      }
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.intelligence !== undefined ) {
        this.totalAbilityScores.intelligence =
          (this.totalAbilityScores.intelligence <= this.selectedRace.abilityScoreMinimum.intelligence)
            ? this.selectedRace.abilityScoreMinimum.intelligence : this.totalAbilityScores.intelligence;
      }
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.wisdom !== undefined ) {
        this.totalAbilityScores.wisdom =
          (this.totalAbilityScores.wisdom <= this.selectedRace.abilityScoreMinimum.wisdom)
            ? this.selectedRace.abilityScoreMinimum.wisdom : this.totalAbilityScores.wisdom;
      }
      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.charisma !== undefined ) {
        this.totalAbilityScores.charisma =
          (this.totalAbilityScores.charisma <= this.selectedRace.abilityScoreMinimum.charisma)
            ? this.selectedRace.abilityScoreMinimum.charisma : this.totalAbilityScores.charisma;
      }
    }
  }


  updateTotalAbilityScores(): void {

    if (this.selectedRace !== undefined) {

      // Update total ability scores now that race has changed
      // This is a one off event and should only be called again if race changes
      if (this.hasRolledStr || this.playerHasSelectedRace) {
        this.totalAbilityScores.strength = this.baseAbilityScores.strength + this.selectedRace.abilityScoreAdjustments.strength;
        if (this.totalAbilityScores.strength < 1) {
          this.totalAbilityScores.strength = 1;
        }
      }
      if (this.hasRolledDex || this.playerHasSelectedRace) {
        this.totalAbilityScores.dexterity = this.baseAbilityScores.dexterity + this.selectedRace.abilityScoreAdjustments.dexterity;
        if (this.totalAbilityScores.dexterity < 1) {
          this.totalAbilityScores.dexterity = 1;
        }
      }
      if (this.hasRolledCon || this.playerHasSelectedRace) {
        this.totalAbilityScores.constitution = this.baseAbilityScores.constitution + this.selectedRace.abilityScoreAdjustments.constitution;
        if (this.totalAbilityScores.constitution < 1) {
          this.totalAbilityScores.constitution = 1;
        }
      }
      if (this.hasRolledInt || this.playerHasSelectedRace) {
        this.totalAbilityScores.intelligence = this.baseAbilityScores.intelligence + this.selectedRace.abilityScoreAdjustments.intelligence;
        if (this.totalAbilityScores.intelligence < 1) {
          this.totalAbilityScores.intelligence = 1;
        }
      }
      if (this.hasRolledWis || this.playerHasSelectedRace) {
        this.totalAbilityScores.wisdom = this.baseAbilityScores.wisdom + this.selectedRace.abilityScoreAdjustments.wisdom;
        if (this.totalAbilityScores.wisdom < 1) {
          this.totalAbilityScores.wisdom = 1;
        }
      }
      if (this.hasRolledCha || this.playerHasSelectedRace) {
        this.totalAbilityScores.charisma = this.baseAbilityScores.charisma + this.selectedRace.abilityScoreAdjustments.charisma;
        if (this.totalAbilityScores.charisma < 1) {
          this.totalAbilityScores.charisma = 1;
        }
      }

      // update point buy and emit total score back to parent component
      this.enforceRacialAbilityRules();
      this.pointBuy = this.getPointBuyPoints();
      this.totalAbilityScoresChanged.emit(this.totalAbilityScores);

    }

  }


  rollNewAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        this.baseAbilityScores.strength = this.rollStat();
        this.hasRolledStr = true;
        break;
      case 'DEX':
        this.baseAbilityScores.dexterity = this.rollStat();
        this.hasRolledDex = true;
        break;
      case 'CON':
        this.baseAbilityScores.constitution = this.rollStat();
        this.hasRolledCon = true;
        break;
      case 'INT':
        this.baseAbilityScores.intelligence = this.rollStat();
        this.hasRolledInt = true;
        break;
      case 'WIS':
        this.baseAbilityScores.wisdom = this.rollStat();
        this.hasRolledWis = true;
        break;
      case 'CHA':
        this.baseAbilityScores.charisma = this.rollStat();
        this.hasRolledCha = true;
        break;
    }
    if (this.hasRolledStr && this.hasRolledDex && this.hasRolledCon
      && this.hasRolledInt && this.hasRolledWis && this.hasRolledCha) {
      this.hasRolledAllStats = true;
      this.playerHasRolledAllStatsChanged.emit(this.hasRolledAllStats);
    }
    this.updateTotalAbilityScores();
  }


  lowerAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        if (this.baseAbilityScores.strength > 1) {
          this.baseAbilityScores.strength--;
        }
        break;
      case 'DEX':
        if (this.baseAbilityScores.dexterity > 1) {
          this.baseAbilityScores.dexterity--;
        }
        break;
      case 'CON':
        if (this.baseAbilityScores.constitution > 1) {
          this.baseAbilityScores.constitution--;
        }
        break;
      case 'INT':
        if (this.baseAbilityScores.intelligence > 1) {
          this.baseAbilityScores.intelligence--;
        }
        break;
      case 'WIS':
        if (this.baseAbilityScores.wisdom > 1) {
          this.baseAbilityScores.wisdom--;
        }
        break;
      case 'CHA':
        if (this.baseAbilityScores.charisma > 1) {
          this.baseAbilityScores.charisma--;
        }
        break;
    }
    this.updateTotalAbilityScores();
  }


  raiseAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        if (this.baseAbilityScores.strength < 18 || this.allowCheating) {
          this.baseAbilityScores.strength++;
        }
        break;
      case 'DEX':
        if (this.baseAbilityScores.dexterity < 18 || this.allowCheating) {
          this.baseAbilityScores.dexterity++;
        }
        break;
      case 'CON':
        if (this.baseAbilityScores.constitution < 18 || this.allowCheating) {
          this.baseAbilityScores.constitution++;
        }
        break;
      case 'INT':
        if (this.baseAbilityScores.intelligence < 18 || this.allowCheating) {
          this.baseAbilityScores.intelligence++;
        }
        break;
      case 'WIS':
        if (this.baseAbilityScores.wisdom < 18 || this.allowCheating) {
          this.baseAbilityScores.wisdom++;
        }
        break;
      case 'CHA':
        if (this.baseAbilityScores.charisma < 18 || this.allowCheating) {
          this.baseAbilityScores.charisma++;
        }
        break;
    }
    this.updateTotalAbilityScores();
  }


  getPointBuyPoints(): number {
    let pointBuyPoints = 0;
    if ( this.selectedRace !== undefined ) {

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.strength !== undefined
        && this.totalAbilityScores.strength <= this.selectedRace.abilityScoreMinimum.strength ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.strength
          - this.selectedRace.abilityScoreAdjustments.strength);
      } else {
        if ( (this.baseAbilityScores.strength + this.selectedRace.abilityScoreAdjustments.strength) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.strength
            - this.selectedRace.abilityScoreAdjustments.strength);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.strength);
        }
      }

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.dexterity !== undefined
        && this.totalAbilityScores.dexterity <= this.selectedRace.abilityScoreMinimum.dexterity ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.dexterity
          - this.selectedRace.abilityScoreAdjustments.dexterity);
      } else {
        if ( (this.baseAbilityScores.dexterity + this.selectedRace.abilityScoreAdjustments.dexterity) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.dexterity
            - this.selectedRace.abilityScoreAdjustments.dexterity);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.dexterity);
        }
      }

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.constitution !== undefined
        && this.totalAbilityScores.constitution <= this.selectedRace.abilityScoreMinimum.constitution ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.constitution
          - this.selectedRace.abilityScoreAdjustments.constitution);
      } else {
        if ( (this.baseAbilityScores.constitution + this.selectedRace.abilityScoreAdjustments.constitution) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.constitution
            - this.selectedRace.abilityScoreAdjustments.constitution);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.constitution);
        }
      }

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.intelligence !== undefined
        && this.totalAbilityScores.intelligence <= this.selectedRace.abilityScoreMinimum.intelligence ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.intelligence
          - this.selectedRace.abilityScoreAdjustments.intelligence);
      } else {
        if ( (this.baseAbilityScores.intelligence + this.selectedRace.abilityScoreAdjustments.intelligence) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.intelligence
            - this.selectedRace.abilityScoreAdjustments.intelligence);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.intelligence);
        }
      }

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.wisdom !== undefined
        && this.totalAbilityScores.wisdom <= this.selectedRace.abilityScoreMinimum.wisdom ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.wisdom
          - this.selectedRace.abilityScoreAdjustments.wisdom);
      } else {
        if ( (this.baseAbilityScores.wisdom + this.selectedRace.abilityScoreAdjustments.wisdom) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.wisdom
            - this.selectedRace.abilityScoreAdjustments.wisdom);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.wisdom);
        }
      }

      if ( this.selectedRace.abilityScoreMinimum !== undefined && this.selectedRace.abilityScoreMinimum.charisma !== undefined
        && this.totalAbilityScores.charisma <= this.selectedRace.abilityScoreMinimum.charisma ) {
        pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.charisma
          - this.selectedRace.abilityScoreAdjustments.charisma);
      } else {
        if ( (this.baseAbilityScores.charisma + this.selectedRace.abilityScoreAdjustments.charisma) <= 1 ) {
          pointBuyPoints += this.getPointBuyPoint(this.totalAbilityScores.charisma
            - this.selectedRace.abilityScoreAdjustments.charisma);
        } else {
          pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.charisma);
        }
      }

    } else {
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.strength);
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.dexterity);
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.constitution);
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.intelligence);
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.wisdom);
      pointBuyPoints += this.getPointBuyPoint(this.baseAbilityScores.charisma);
    }

    return pointBuyPoints;
  }


  getPointBuyPoint(abilityScore: number): number {
    switch (abilityScore) {
      case 1:
        return -8;
      case 2:
        return -6;
      case 3:
        return -5;
      case 4:
        return -4;
      case 5:
        return -3;
      case 6:
        return -2;
      case 7:
        return -1;
      case 8:
        return 0;
      case 9:
        return 1;
      case 10:
        return 2;
      case 11:
        return 3;
      case 12:
        return 4;
      case 13:
        return 5;
      case 14:
        return 6;
      case 15:
        return 8;
      case 16:
        return 10;
      case 17:
        return 13;
      case 18:
        return 16;
      default:
        let pointTotal = 16;
        let pointInc = 3;
        for (let i = 11; i <= abilityScore - 8; i++) {
          if (i % 2 === 0) { // Even
            pointTotal += pointInc;
          } else { // Odd
            pointInc++;
            pointTotal += pointInc;
          }
        }
        return pointTotal;
    }
  }

}
