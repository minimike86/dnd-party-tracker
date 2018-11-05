import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceName } from '../../enums/enum-race';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Race {

  public name: RaceName;
  public abilityScoreAdjustments: Map<string, number>;
  public favoredClass: string;

  constructor(name, abilityAdjustment, favoredClass) {
    this.name = name;
    this.abilityScoreAdjustments = abilityAdjustment;
    this.favoredClass = favoredClass;
  }

  getName(): string {
    return this.name;
  }

  getAbilityAdjustment(): Map<string, number> {
    return this.abilityScoreAdjustments;
  }

  getStrength(): number {
    return this.abilityScoreAdjustments.get('strength');
  }

  getDexterity(): number {
    return this.abilityScoreAdjustments.get('dexterity');
  }

  getConstitution(): number {
    return this.abilityScoreAdjustments.get('constitution');
  }

  getIntelligence(): number {
    return this.abilityScoreAdjustments.get('intelligence');
  }

  getWisdom(): number {
    return this.abilityScoreAdjustments.get('wisdom');
  }

  getCharisma(): number {
    return this.abilityScoreAdjustments.get('charisma');
  }

  getFavoredClass(): string {
    return this.favoredClass;
  }

  toString(): string {
    return this.name;
  }

}
