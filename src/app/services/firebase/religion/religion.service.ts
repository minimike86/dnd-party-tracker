import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Religion, ReligionId } from '../../../models/character/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  private religionCollection: AngularFirestoreCollection<Religion>;
  private religions: Array<ReligionId>;

  constructor(public db: AngularFirestore) {
    this.religionCollection = db.collection<Religion>('/religions');
    this.getReligions().subscribe( data => {
      this.religions = data;
    });
  }

  getReligions(): Observable<ReligionId[]> {
    return this.religionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Religion;
        return { id, ...data };
      }))
    );
  }

  addReligion(religion: Religion): void {
    this.religionCollection.doc(religion.name.toUpperCase().replace(' ', '')).set(religion);
  }

}
