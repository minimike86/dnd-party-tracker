import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyService } from '../../../../services/firebase/party/party.service';
import { PartyId } from '../../../../models/party/party';

@Component({
  selector: 'app-confirm-delete-party',
  templateUrl: './confirm-delete-party.component.html',
  styleUrls: ['./confirm-delete-party.component.css']
})
export class ConfirmDeletePartyComponent {

  @Input() party: PartyId;

  constructor(public partyService: PartyService,
              public activeModal: NgbActiveModal) {
    this.party = {
      id: '',
      name: '',
      description: '',
      campaign: '',
      members: [],
      partyLeader: '',
      dateCreated: null
    };
  }

  deleteParty(): void {
    this.partyService.deleteParty(this.party.id);
    this.activeModal.close('Party Deleted');
  }

}
