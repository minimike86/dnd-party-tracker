import {Component, Input, OnInit} from '@angular/core';
import { AbilityScores } from './ability-scores';

@Component({
  selector: 'app-ability-scores',
  templateUrl: './ability-scores.component.html',
  styleUrls: ['./ability-scores.component.css']
})
export class AbilityScoresComponent implements OnInit {

  @Input() abilityScores: AbilityScores;

  constructor() { }

  ngOnInit() {
  }

}
