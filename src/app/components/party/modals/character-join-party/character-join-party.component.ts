import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/firebase/auth/auth.service';
import {PartyService} from '../../../../services/firebase/party/party.service';
import {CharacterService} from '../../../../services/firebase/character/character.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CharacterId} from '../../../../models/character/character';
import {PartyId} from '../../../../models/party/party';
import { User } from 'firebase';


@Component({
  selector: 'app-character-join-party',
  templateUrl: './character-join-party.component.html',
  styleUrls: ['./character-join-party.component.css']
})
export class CharacterJoinPartyComponent implements OnInit {

  @Input() party: PartyId;
  public characters: CharacterId[];
  public currentUser: User;

  constructor(public authService: AuthService,
              public partyService: PartyService,
              public characterService: CharacterService,
              public activeModal: NgbActiveModal) {
    authService.user$.subscribe(user => {
      this.currentUser = user;
      this.getCharacters();
    });
  }

  ngOnInit() {
    this.getCharacters();
  }

  // Character Functions
  getCharacters(): void {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      this.characterService.getCharacters().subscribe(
          characters => this.characters = characters.filter(characterId => characterId.owner === this.currentUser.uid),
          err => console.log('Error :: ' + err)
        );
    }
  }

  getCharacter(characterReference: string): CharacterId {
    if (this.characters !== undefined) {
      return this.characters.filter(characterId => characterId.id === characterReference)[0];
    }
  }

  addCharacterToParty(partyId: string, characterId: string): void {
    this.partyService.addCharacterToParty(partyId, characterId);
    this.activeModal.close('Added Character');
  }

}
