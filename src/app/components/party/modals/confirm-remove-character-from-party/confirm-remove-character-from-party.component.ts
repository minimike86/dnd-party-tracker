import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyService } from '../../../../services/firebase/party/party.service';
import { PartyId } from '../../../../models/party/party';
import { CharacterId } from '../../../../models/character/character';

@Component({
  selector: 'app-confirm-remove-character-from-party',
  templateUrl: './confirm-remove-character-from-party.component.html',
  styleUrls: ['./confirm-remove-character-from-party.component.css']
})
export class ConfirmRemoveCharacterFromPartyComponent {

  @Input() party: PartyId;
  @Input() character: CharacterId;

  constructor(public partyService: PartyService,
              public activeModal: NgbActiveModal) {
  }

  deleteCharacterFromParty(): void {
    this.partyService.deleteCharacterFromParty(this.party.id, this.character.id);
    this.activeModal.close('Character Deleted From Party');
  }

}
