import { Component, OnInit } from '@angular/core';
import { PartyId } from '../../models/party/party';
import { PartyService } from '../../services/firebase/party/party.service';
import { CharacterId } from '../../models/character/character';
import { CharacterService } from '../../services/firebase/character/character.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public partyArray: PartyId[];
  public characterArray: CharacterId[];

  constructor(
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

  getCharacter(characterId: string): CharacterId {
    if (this.characterArray !== undefined) {
      return this.characterArray.filter(character => character.id === characterId)[0];
    }
    return null;
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
