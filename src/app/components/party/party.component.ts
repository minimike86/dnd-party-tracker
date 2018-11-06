import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

class Party {
  id: number;
  name: string;
  description: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
  }
}

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  public parties: any;
  public newParty: Party;

  constructor(public db: AngularFirestore) {
    db.collection('parties').valueChanges().subscribe(
      value => {
        // Set parties from firebase db
        this.parties = value;
        // Sort parties by id
        this.parties.sort((a, b) => {
          const x = a.id;
          const y = b.id;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        // console.log(this.parties);
      }
    );
  }

  ngOnInit() {
    this.newParty = new Party();
  }

  addParty(): void {
    this.newParty.id = this.parties.length;
    this.db.collection('parties').doc('party' + this.newParty.id).set(JSON.parse(JSON.stringify(this.newParty)));
  }

  editParty(id: number): void {
    let docId: string;
    this.db.collection('parties').get().subscribe(partyDoc => {
      partyDoc.forEach(doc => {
        if (parseInt(doc.id.substr(-1), 10) === parseInt(id.toString(), 10)) {
          console.log(doc.id);
          docId = doc.id;
        }
      });
    }, err => {
      console.error(err);
    }, () => {
      this.db.collection('parties').doc(docId).valueChanges().subscribe(partyDoc => {
        console.log('partyDoc: ', partyDoc);
      });
    });
  }

  deleteParty(id: number): void {
    this.db.collection('parties').get().subscribe(partyDoc => {
      partyDoc.forEach(doc => {
        if (parseInt(doc.id.substr(-1), 10) === parseInt(id.toString(), 10)) {
          this.db.collection('parties').doc(doc.id).delete();
        }
      });
    });
  }

}
