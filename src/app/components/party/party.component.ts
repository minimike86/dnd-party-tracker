import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { PartyService } from '../../services/firebase/party/party.service';
import { CharacterService } from '../../services/firebase/character/character.service';
import { PartyId } from '../../models/party/party';
import { CharacterId } from '../../models/character/character';
import {error} from 'util';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public parties: PartyId[];
  public characters: CharacterId[];

  constructor(public authService: AuthService,
              public partyService: PartyService,
              public characterService: CharacterService) {}

  ngOnInit() {
    this.getParties();
    this.getCharacters();
  }

  // Party Functions
  getParties(): void {
    this.partyService.getParties()
      .subscribe(
        parties => this.parties = parties,
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

  getCharacter(characterReference: string): CharacterId {
    if (this.characters !== undefined) {
      return this.characters.filter(characterId => characterId.id === characterReference)[0];
    }
  }

  editCharacter(characterReference: string) {
    //
  }

}
