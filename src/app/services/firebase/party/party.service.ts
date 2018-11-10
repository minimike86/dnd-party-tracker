import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Party, PartyId } from '../../../models/party/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private partyCollection: AngularFirestoreCollection<Party>;

  constructor(public db: AngularFirestore) {
    this.partyCollection = db.collection<Party>('/parties');
  }

  getParties(): Observable<PartyId[]> {
    return this.partyCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Party;
        return { id, ...data };
      }))
    );
  }

}
