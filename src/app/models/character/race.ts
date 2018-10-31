import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbilityScore} from './ability-scores';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
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
