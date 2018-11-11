import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { PartyService } from '../../services/firebase/party/party.service';
import { CharacterService } from '../../services/firebase/character/character.service';
import { PartyId } from '../../models/party/party';
import { CharacterId } from '../../models/character/character';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public parties: PartyId[];
  public characters: CharacterId[];
  public partiesUserHasPlayerCharacter: string[];

  constructor(public authService: AuthService,
              public partyService: PartyService,
              public characterService: CharacterService) {
  }

  ngOnInit() {
    this.getCharacters(); // Must call characters first
    this.getParties();
  }

  // Party Functions
  getParties(): void {
    this.partyService.getParties()
      .subscribe(
        parties => {
          this.parties = parties;
          this.getPartiesUserHasPlayerCharacter(this.parties);
          },
        err => console.log('Error :: ' + err)
      );
  }

  // Character Functions
  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
        err => console.log('Error :: ' + err)
      );
  }

  getPartiesUserHasPlayerCharacter(parties): void {
    this.partiesUserHasPlayerCharacter = [];
    if (this.parties !== undefined && this.characters !== undefined) {
      for (const partyItem of parties) {
        for (const member of partyItem.members) {
          if (this.getCharacter(member).player === this.authService.getCurrentUser()) {
            this.partiesUserHasPlayerCharacter.push(partyItem.id);
          }
        }
      }
    }
  }

  getCharacter(characterReference: string): CharacterId {
    if (this.characters !== undefined) {
      return this.characters.filter(characterId => characterId.id === characterReference)[0];
    }
  }

  viewCharacter(characterReference: string) {
    //
  }

  editCharacter(characterReference: string) {
    //
  }

  removeCharacter(characterReference: string, partyReference: string) {
    //
  }

}
