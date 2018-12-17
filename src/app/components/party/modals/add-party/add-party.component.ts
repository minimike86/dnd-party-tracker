import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/firebase/auth/auth.service';
import { Party } from '../../../../models/party/party';
import { PartyService } from '../../../../services/firebase/party/party.service';
import { User } from 'firebase';


@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent {

  public party: Party;
  public currentUser: User;
  public nameIsValid: boolean;

  constructor(public authService: AuthService,
              public partyService: PartyService,
              public activeModal: NgbActiveModal) {

    this.party = {
      name: '',
      description: '',
      campaign: '',
      members: [],
      partyLeader: '',
      dateCreated: new Date()
    };

    this.authService.user$.subscribe(data => {
      this.currentUser = data;
      this.party.partyLeader = this.currentUser.uid;
    });

  }

  isNameValid(): boolean {
    if ( this.party.name.length >= 1 ) {
      return this.nameIsValid = true;
    } else {
      return this.nameIsValid = false;
    }
  }

  addParty(): void {
    this.isNameValid();
    if (this.nameIsValid) {
      this.partyService.addParty(this.party);
      this.activeModal.close('Party Added');
    }
  }

}
