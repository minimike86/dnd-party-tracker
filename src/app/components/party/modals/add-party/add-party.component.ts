import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/firebase/auth/auth.service';
import { Party } from '../../../../models/party/party';
import { PartyService } from '../../../../services/firebase/party/party.service';


@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent {

  public party: Party;
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

    this.authService.afAuth.user.subscribe(data => {
      this.party.partyLeader = data.uid;
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

  getPartyLeaderEmail(): string {
    return this.authService.currentUser.email;
  }

}
