import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AbilityScore, AbilityScoreAbbreviation } from '../../../models/character/ability-scores';
import { isUndefined } from 'util';

export class Race {
  public race: string;
  public abilityAdjustment: AbilityScore;
  public favoredClass: string;
  constructor(race, abilityAdjustment, favoredClass) {
    this.race = race;
    this.abilityAdjustment = abilityAdjustment;
    this.favoredClass = favoredClass;
  }
  toString() {
    return this.race;
  }
}

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
  public raceModel: Race;
  races: Array<Race>;

  constructor() {}

  ngOnInit() {
    this.charIsNew = true;
    if (isUndefined(this.baseAbilityScores)) {
      this.baseAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.racialAbilityAdjustment = new AbilityScore(0, 0, 0, 0, 0, 0);
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
    } else {
      this.totalAbilityScores = this.baseAbilityScores;
      this.charIsNew = false;
    }
    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
    this.abilityScoreAbbr = new AbilityScoreAbbreviation();
    this.bindedAbbreviationKeys = Array.from(this.abilityScoreAbbr.abbreviation.keys()); // Fix "Expression changed after it was checked."

    this.races = [
      new Race('Human', new AbilityScore(0, 0, 0, 0, 0, 0), 'Any'),
      new Race('Dwarf', new AbilityScore(0, 0, 2, 0, 0, -2), 'Fighter'),
      new Race('Elf', new AbilityScore(0, 2, -2, 0, 0, 0), 'Wizard'),
      new Race('Gnome', new AbilityScore(-2, 0, 2, 0, 0, 0), 'Bard'),
      new Race('Half-elf', new AbilityScore(0, 0, 0, 0, 0, 0), 'Any'),
      new Race('Half-orc', new AbilityScore(2, 0, 0, -2, 0, -2), 'Barbarian'),
      new Race('Halfling', new AbilityScore(-2, 2, 0, 0, 0, 0), 'Rogue')
    ];
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? [] : this.races.filter(v => v.race.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  getAbilityModifier(abilityScore: number): string {
    const modifier = Math.floor(abilityScore / 2) - 5;
    if (modifier < 0) {
      return '' + modifier; // '-' is already present in negative number
    } else {
      return '+' + modifier;
    }
  }

  updateRacialAbilityAdjustment(abbr: string, bonus: number): void {
    switch (abbr) {
      case 'STR':
        this.racialAbilityAdjustment.strength = bonus;
        break;
      case 'DEX':
        this.racialAbilityAdjustment.dexterity = bonus;
        break;
      case 'CON':
        this.racialAbilityAdjustment.constitution = bonus;
        break;
      case 'INT':
        this.racialAbilityAdjustment.intelligence = bonus;
        break;
      case 'WIS':
        this.racialAbilityAdjustment.wisdom = bonus;
        break;
      case 'CHA':
        this.racialAbilityAdjustment.charisma = bonus;
        break;
    }
    this.updateTotalAbilityScores();
    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
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
    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
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
    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
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
    this.pointBuy = this.getPointBuyPoints(this.baseAbilityScores);
  }


  updateTotalAbilityScores(): void {
    this.totalAbilityScores.strength = this.baseAbilityScores.strength + this.racialAbilityAdjustment.strength;
    this.totalAbilityScores.dexterity = this.baseAbilityScores.dexterity + this.racialAbilityAdjustment.dexterity;
    this.totalAbilityScores.constitution = this.baseAbilityScores.constitution + this.racialAbilityAdjustment.constitution;
    this.totalAbilityScores.intelligence = this.baseAbilityScores.intelligence + this.racialAbilityAdjustment.intelligence;
    this.totalAbilityScores.wisdom = this.baseAbilityScores.wisdom + this.racialAbilityAdjustment.wisdom;
    this.totalAbilityScores.charisma = this.baseAbilityScores.charisma + this.racialAbilityAdjustment.charisma;
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
