import {Component, Input, OnInit} from '@angular/core';
import { AbilityScores } from './ability-scores';

@Component({
  selector: 'app-ability-scores',
  templateUrl: './ability-scores.component.html',
  styleUrls: ['./ability-scores.component.css']
})
export class AbilityScoresComponent implements OnInit {

  @Input() abilityScores: AbilityScores;
  bindedAbbreviationKeys: Array<string>;

  constructor() {
  }

  ngOnInit() {
    this.bindedAbbreviationKeys = Array.from(this.abilityScores.abbreviation.keys()); // Fix "Expression changed after it was checked."
  }

  getRandomModifier() {
    return Math.floor(Math.random() * Math.floor(100));
  }

}
