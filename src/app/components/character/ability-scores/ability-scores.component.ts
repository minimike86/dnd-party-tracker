import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {AbilityScore, AbilityScoreAbbreviation} from '../../../models/character/ability-scores';
import {RaceService} from '../../../services/character/race.service';
import {Race} from '../../../models/character/race';
import {RaceName} from '../../../enums/enum-race';


@Component({
  selector: 'app-ability-scores',
  templateUrl: './ability-scores.component.html',
  styleUrls: ['./ability-scores.component.css']
})
export class AbilityScoresComponent implements OnInit {

  @Input() baseAbilityScores: AbilityScore;
  public racialAbilityAdjustment: AbilityScore;
  public totalAbilityScores: AbilityScore;
  public abilityScoreAbbr: AbilityScoreAbbreviation;
  public bindedAbbreviationKeys: Array<string>;
  public pointBuy: number;
  public charIsNew: boolean;
  public readyToPickClass: boolean;
  public races: Array<Race>;
  public selectedRace: Race;
  public typeAheadRace: string;

  constructor(raceService: RaceService) {
    this.races = raceService.getRaceList().sort();
    this.selectedRace = this.races.find(race => race.name === RaceName.NULL);
  }

  ngOnInit() {
    this.charIsNew = true;
    this.readyToPickClass = false;
    if (this.baseAbilityScores === undefined) {
      this.baseAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.racialAbilityAdjustment = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
    } else {
      this.totalAbilityScores = this.baseAbilityScores;
      this.charIsNew = false;
    }
    this.abilityScoreAbbr = new AbilityScoreAbbreviation();
    this.bindedAbbreviationKeys = Array.from(this.abilityScoreAbbr.abbreviation.keys()); // Fix "Expression changed after it was checked."

  }

  search = (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? [] : this.races.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  getAbilityModifier(abilityScore: number): string {
    const modifier = Math.floor(abilityScore / 2) - 5;
    if (modifier < 0) {
      return '' + modifier; // '-' is already present in negative number
    } else {
      return '+' + modifier;
    }
  }

  isRaceType(race: any): boolean {
    if (race !== undefined) {
      return race.constructor.name === 'Race';
    } else {
      return false;
    }
  }

  updateRacialAbilityAdjustmentRace(race: Race): void {
    console.log('race: ' + race.name);
    if (this.isRaceType(race)) {
      console.log('selectedRace: ' + race.getAbilityAdjustment().strength);
      this.selectedRace = race;
    }
    this.updateTotalAbilityScores();
  }

  rollNewAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        this.baseAbilityScores.strength = this.rollStat();
        break;
      case 'DEX':
        this.baseAbilityScores.dexterity = this.rollStat();
        break;
      case 'CON':
        this.baseAbilityScores.constitution = this.rollStat();
        break;
      case 'INT':
        this.baseAbilityScores.intelligence = this.rollStat();
        break;
      case 'WIS':
        this.baseAbilityScores.wisdom = this.rollStat();
        break;
      case 'CHA':
        this.baseAbilityScores.charisma = this.rollStat();
        break;
    }
    this.updateTotalAbilityScores();
  }


  lowerAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        if (this.baseAbilityScores.strength > 1) {
          this.baseAbilityScores.strength = this.baseAbilityScores.strength - 1;
        }
        break;
      case 'DEX':
        if (this.baseAbilityScores.dexterity > 1) {
          this.baseAbilityScores.dexterity = this.baseAbilityScores.dexterity - 1;
        }
        break;
      case 'CON':
        if (this.baseAbilityScores.constitution > 1) {
          this.baseAbilityScores.constitution = this.baseAbilityScores.constitution - 1;
        }
        break;
      case 'INT':
        if (this.baseAbilityScores.intelligence > 1) {
          this.baseAbilityScores.intelligence = this.baseAbilityScores.intelligence - 1;
        }
        break;
      case 'WIS':
        if (this.baseAbilityScores.wisdom > 1) {
          this.baseAbilityScores.wisdom = this.baseAbilityScores.wisdom - 1;
        }
        break;
      case 'CHA':
        if (this.baseAbilityScores.charisma > 1) {
          this.baseAbilityScores.charisma = this.baseAbilityScores.charisma - 1;
        }
        break;
    }
    this.updateTotalAbilityScores();
  }


  raiseAbilityScore(abbr: string): void {
    switch (abbr) {
      case 'STR':
        this.baseAbilityScores.strength = this.baseAbilityScores.strength + 1;
        break;
      case 'DEX':
        this.baseAbilityScores.dexterity = this.baseAbilityScores.dexterity + 1;
        break;
      case 'CON':
        this.baseAbilityScores.constitution = this.baseAbilityScores.constitution + 1;
        break;
      case 'INT':
        this.baseAbilityScores.intelligence = this.baseAbilityScores.intelligence + 1;
        break;
      case 'WIS':
        this.baseAbilityScores.wisdom = this.baseAbilityScores.wisdom + 1;
        break;
      case 'CHA':
        this.baseAbilityScores.charisma = this.baseAbilityScores.charisma + 1;
        break;
    }
    this.updateTotalAbilityScores();
  }


  updateTotalAbilityScores(): void {
    this.totalAbilityScores.strength = this.baseAbilityScores.strength + this.selectedRace.abilityAdjustment.strength;
    this.totalAbilityScores.dexterity = this.baseAbilityScores.dexterity + this.selectedRace.abilityAdjustment.dexterity;
    this.totalAbilityScores.constitution = this.baseAbilityScores.constitution + this.selectedRace.abilityAdjustment.constitution;
    this.totalAbilityScores.intelligence = this.baseAbilityScores.intelligence + this.selectedRace.abilityAdjustment.intelligence;
    this.totalAbilityScores.wisdom = this.baseAbilityScores.wisdom + this.selectedRace.abilityAdjustment.wisdom;
    this.totalAbilityScores.charisma = this.baseAbilityScores.charisma + this.selectedRace.abilityAdjustment.charisma;

    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
    this.checkPlayerIsReadyToPickClass();
  }

  checkPlayerIsReadyToPickClass(): void {
    if ( this.totalAbilityScores.strength >= 3
      && this.totalAbilityScores.dexterity >= 3
      && this.totalAbilityScores.constitution >= 3
      && this.totalAbilityScores.intelligence >= 3
      && this.totalAbilityScores.wisdom >= 3
      && this.totalAbilityScores.charisma >= 3
      && this.isRaceType(this.selectedRace)
      && this.selectedRace.name !== ''
    ) {
      this.readyToPickClass = true;
    } else {
      this.readyToPickClass = false;
    }
  }


  rollStat(): number {
    const diePool: Array<number> = [0, 0, 0, 0];
    let dieCount = 0;
    for (let i = 0; i < 4; i++) {                         // Roll 4d6
      diePool[i] = (Math.floor((Math.random() * 6 + 1))); // Add 1d6 to Die Pool
    }
    diePool.sort().reverse().pop();                       // Sort Die Pool, Drop lowest Die
    diePool.forEach(die => {
      dieCount += die;                                    // Count Die
    });
    return dieCount;
  }


  getPointBuyPoints(baseAbilityScores: AbilityScore): number {
    let pointBuyPoints = 0;
    if (baseAbilityScores.strength !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.strength);
    }
    if (baseAbilityScores.dexterity !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.dexterity);
    }
    if (baseAbilityScores.constitution !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.constitution);
    }
    if (baseAbilityScores.intelligence !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.intelligence);
    }
    if (baseAbilityScores.wisdom !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.wisdom);
    }
    if (baseAbilityScores.charisma !== 0) {
      pointBuyPoints += this.getPointBuyPoint(baseAbilityScores.charisma);
    }
    return pointBuyPoints;
  }

  getPointBuyPoint(abilityScore: number): number {
    let point = -5;
    let pointInc = 1;
    let pointIncMultiplier = 1;
    for (let i = 4; i <= abilityScore; i++) {
      if (i > 14) {
        if (i % 2 === 0) {
          pointInc++;
        } else {
          pointIncMultiplier++;
        }
        if (pointInc >= 2) { pointInc--; }
      }
      point += (pointInc * pointIncMultiplier);
    }
    return point;
  }



}
