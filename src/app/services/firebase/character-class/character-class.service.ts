import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterClass, CharacterClassId } from '../../../models/character/character-class';


@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {

  private classCollection: AngularFirestoreCollection<CharacterClass>;
  private characterClasses: CharacterClassId[];

  constructor(public db: AngularFirestore) {
    this.classCollection = db.collection<CharacterClass>('/classes');
    this.getClasses().subscribe(data => {
      this.characterClasses = data;
    });
  }

  getClasses(): Observable<CharacterClassId[]> {
    return this.classCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as CharacterClass;
        return { id, ...data };
      }))
    );
  }

}
