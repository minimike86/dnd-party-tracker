import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbilityScore } from './ability-scores';
import { RaceName } from '../../enums/enum-race';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Race {

  public name: RaceName;
  public abilityAdjustment: AbilityScore;
  public favoredClass: string;

  constructor(name, abilityAdjustment, favoredClass) {
    this.name = name;
    this.abilityAdjustment = abilityAdjustment;
    this.favoredClass = favoredClass;
  }

  getName(): string {
    return this.name;
  }

  getAbilityAdjustment(): AbilityScore {
    return this.abilityAdjustment;
  }

  getStrength(): number {
    return this.abilityAdjustment.strength;
  }

  getDexterity(): number {
    return this.abilityAdjustment.dexterity;
  }

  getConstitution(): number {
    return this.abilityAdjustment.constitution;
  }

  getIntelligence(): number {
    return this.abilityAdjustment.intelligence;
  }

  getWisdom(): number {
    return this.abilityAdjustment.wisdom;
  }

  getCharisma(): number {
    return this.abilityAdjustment.charisma;
  }

  getFavoredClass(): string {
    return this.favoredClass;
  }

  toString(): string {
    return this.name;
  }

}
