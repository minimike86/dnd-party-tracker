import { Component, OnInit } from '@angular/core';
import { AbilityScore } from '../../../models/character/ability-scores';
import {AuthService} from '../../../services/firebase/auth/auth.service';


@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {

  public playerName: string;
  public characterName: string;
  public totalAbilityScores: AbilityScore;
  public playerHasRolledAllStats: boolean;
  public playerHasSelectedRace: boolean;
  public selectedRace: any;
  public readyToPickClass: boolean;

  constructor(public authService: AuthService) {
    this.authService.afAuth.user.subscribe(data => {
      this.playerName = data !== null ? data.displayName : '';
    });
  }

  ngOnInit() {
    this.playerName = ''
    this.characterName = '';
    this.readyToPickClass = false;
    this.playerHasRolledAllStats = false;
    this.playerHasSelectedRace = false;
  }

  checkPlayerIsReadyToPickClass(): void {
    if ( (this.playerName.length >= 1)
      && (this.characterName.length >= 1)
      && this.playerHasSelectedRace
      && this.playerHasRolledAllStats
    ) {
      this.readyToPickClass = true;
    } else {
      this.readyToPickClass = false;
    }
  }

  playerHasRolledAllStatsChanged(playerHasRolledAllStats: boolean) {
    // console.log('playerHasRolledAllStats: ', playerHasRolledAllStats);
    this.playerHasRolledAllStats = playerHasRolledAllStats;
  }

  selectedRaceChangedHandler(selectedRace: any) {
    // console.log('selectedRace: ', selectedRace);
    this.selectedRace = selectedRace;
  }

  playerHasSelectedRaceChangedHandler(playerHasSelectedRace: boolean) {
    // console.log('playerHasSelectedRace: ', playerHasSelectedRace);
    this.playerHasSelectedRace = playerHasSelectedRace;
  }

  totalAbilityScoresChangedHandler(totalAbilityScores: AbilityScore) {
    // console.log('totalAbilityScores: ', totalAbilityScores);
    this.totalAbilityScores = totalAbilityScores;
    this.checkPlayerIsReadyToPickClass();
  }

}
