import {Component, Input, OnInit} from '@angular/core';
import { AbilityScore, AbilityScoreAbbreviation } from '../../../models/character/ability-scores';

@Component({
  selector: 'app-ability-scores',
  templateUrl: './ability-scores.component.html',
  styleUrls: ['./ability-scores.component.css']
})
export class AbilityScoresComponent implements OnInit {

  @Input() baseAbilityScores: AbilityScore;
  totalAbilityScores: AbilityScore;
  abilityScoreAbbr: AbilityScoreAbbreviation;
  bindedAbbreviationKeys: Array<string>;

  constructor() {}

  ngOnInit() {
    this.totalAbilityScores = this.baseAbilityScores;
    this.abilityScoreAbbr = new AbilityScoreAbbreviation();
    this.bindedAbbreviationKeys = Array.from(this.abilityScoreAbbr.abbreviation.keys()); // Fix "Expression changed after it was checked."
  }

  getAbilityModifier(abilityScore: number): string {
    const modifier = Math.floor(abilityScore / 2) - 5;
    if (modifier < 0) {
      return '' + modifier; // '-' is already present in negative number
    } else {
      return '+' + modifier;
    }
  }

}
