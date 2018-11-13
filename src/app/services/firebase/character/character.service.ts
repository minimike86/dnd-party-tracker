import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character, CharacterId } from '../../../models/character/character';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterCollection: AngularFirestoreCollection<Character>;
  private characters: CharacterId[];

  constructor(public db: AngularFirestore) {
    this.characterCollection = db.collection<Character>('/characters');
    this.getCharacters().subscribe(data => {
      this.characters = data;
    });
  }

  getCharacters(): Observable<CharacterId[]> {
    return this.characterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Character;
        return { id, ...data };
      }))
    );
  }

}
