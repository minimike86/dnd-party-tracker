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

  public partyArray: PartyId[];
  public characterArray: CharacterId[];

  constructor(
    public authService: AuthService,
    public partyService: PartyService,
    public characterService: CharacterService
  ) {}

  ngOnInit() {
    this.partyService.getParties().subscribe(parties => {
      this.partyArray = parties;
    });
    this.characterService.getCharacters().subscribe( characters => {
      this.characterArray = characters;
    });
  }

  getCharacter(characterReference: string): CharacterId {
    if (this.characterArray !== undefined) {
      return this.characterArray.filter(character => character.id === characterReference)[0];
    }
    return null;
  }

  editCharacter(characterReference: string) {
    //
  }

  addParty(partyId: PartyId) {
    this.addParty(partyId);
  }

  editParty(partyId: PartyId, newParty: PartyId) {
    this.editParty(partyId, newParty);
  }

  deleteParty(partyId: PartyId) {
    this.deleteParty(partyId);
  }

}
