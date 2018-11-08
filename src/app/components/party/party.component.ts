import { Component, OnInit } from '@angular/core';
import { PartyId } from '../../../app/models/party/party';
import { PartyService } from '../../services/firebase/party/party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public partyArray: PartyId[];

  constructor(public partyService: PartyService) {}

  ngOnInit() {
    this.partyService.getParties().subscribe(parties => {
      console.log('subscribe', parties);
      this.partyArray = parties;
    });
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
