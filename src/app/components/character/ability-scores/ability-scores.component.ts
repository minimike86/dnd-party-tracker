import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AbilityScore, AbilityScoreAbbreviation  } from '../../../models/character/ability-scores';


@Component({
  selector: 'app-ability-scores',
  templateUrl: './ability-scores.component.html',
  styleUrls: ['./ability-scores.component.css']
})
export class AbilityScoresComponent implements OnInit {

  @Input() baseAbilityScores: AbilityScore;
  public totalAbilityScores: AbilityScore;
  @Output() totalAbilityScoresChanged: EventEmitter<AbilityScore> = new EventEmitter();

  public abilityScoreAbbr: AbilityScoreAbbreviation;
  public boundAbbreviationKeys: Array<string>;

  constructor() {}

  ngOnInit() {
    if (this.baseAbilityScores === undefined) {
      // Create a new character
      this.baseAbilityScores = new AbilityScore(8, 8, 8, 8, 8, 8);
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
    } else {
      // View an existing character
      this.totalAbilityScores = new AbilityScore(0, 0, 0, 0, 0, 0);
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

}
