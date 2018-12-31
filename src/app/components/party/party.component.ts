import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { PartyService } from '../../services/firebase/party/party.service';
import { CharacterService } from '../../services/firebase/character/character.service';
import { PartyId } from '../../models/party/party';
import { CharacterId } from '../../models/character/character';
import { AddPartyComponent } from './modals/add-party/add-party.component';
import { ConfirmDeletePartyComponent } from './modals/confirm-delete-party/confirm-delete-party.component';
import { CharacterJoinPartyComponent } from './modals/character-join-party/character-join-party.component';
import { ConfirmRemoveCharacterFromPartyComponent } from './modals/confirm-remove-character-from-party/confirm-remove-character-from-party.component';
import { User } from 'firebase';


@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public parties: PartyId[];
  public characters: CharacterId[];
  public partiesUserHasPlayerCharacter: string[];
  public routerParamId: string;
  public currentUser: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              public partyService: PartyService,
              public characterService: CharacterService,
              private modalService: NgbModal) {
    this.routerParamId = this.route.snapshot.paramMap.get('id');
    authService.user$.subscribe(user => {
      this.currentUser = user;
      this.getCharacters(); // Must call characters first
      this.getParties();
    });
  }

  ngOnInit() {
  }

  // Party Functions
  getParties(): void {
    this.partyService.getParties()
      .subscribe(
        parties => {

          this.parties = parties;
          this.parties.sort((aParty, bParty) => (aParty.dateCreated < bParty.dateCreated)
                                ? 1 : ((bParty.dateCreated < aParty.dateCreated) ? -1 : 0));

          if (this.routerParamId !== undefined && this.routerParamId !== null) {
            switch (this.routerParamId) {
              case 'owned':
                this.parties = this.parties.filter(party => party.partyLeader === this.currentUser.uid);
                break;
              default:
                this.parties = this.parties.filter(party => party.id === this.routerParamId);
            }
          }

          this.getPartiesUserHasPlayerCharacter(this.parties);

        },
        err => console.log('Error :: ' + err)
      );
  }

  openCharacterJoinPartyModal(partyId: PartyId): void {
    const modalRef = this.modalService.open(CharacterJoinPartyComponent, { size: 'lg' });
    modalRef.componentInstance.party = partyId;
  }

  openDeletePartyModal(partyId: PartyId): void {
    const modalRef = this.modalService.open(ConfirmDeletePartyComponent, {});
    modalRef.componentInstance.party = partyId;
  }

  openNewPartyModal(): void {
    const modalRef = this.modalService.open(AddPartyComponent, { size: 'lg' });
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
          if (this.getCharacter(member).owner === this.currentUser.uid) {
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
    this.router.navigate( ['/character/id/' + characterReference] );
  }

  editCharacter(characterReference: string) {
    //
  }

  openRemoveCharacterFromPartyModal(partyId: PartyId, characterId: CharacterId): void {
    const modalRef = this.modalService.open(ConfirmRemoveCharacterFromPartyComponent, {});
    modalRef.componentInstance.party = partyId;
    modalRef.componentInstance.character = characterId;
  }

  removeCharacter(partyReference: string, characterReference: string) {
    this.partyService.deleteCharacterFromParty(partyReference, characterReference);
  }

}
