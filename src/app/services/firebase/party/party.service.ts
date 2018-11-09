import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Party, PartyId } from '../../../models/party/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  public partyCollection: AngularFirestoreCollection<Party>;
  public parties: Observable<PartyId[]>;

  constructor(public db: AngularFirestore) {
    this.partyCollection = db.collection<Party>('/parties');
    this.parties = this.partyCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Party;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getParties(): Observable<PartyId[]> {
    return this.parties;
  }

  addParty(partyId: PartyId): void {
    this.db.collection('parties').add(partyId);
  }

  editParty(partyId: PartyId, newParty: PartyId): void {
    this.db.collection('parties').doc(partyId.id).set(newParty);
  }

  deleteParty(partyId: PartyId): void {
    this.db.collection('parties').doc(partyId.id).delete();
  }

}
