import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character, CharacterId } from '../../../models/character/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public characterCollection: AngularFirestoreCollection<Character>;
  public characters: Observable<CharacterId[]>;

  constructor(public db: AngularFirestore) {
    this.characterCollection = db.collection<Character>('/characters');
    this.characters = this.characterCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Character;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getCharacters(): Observable<CharacterId[]> {
    return this.characters;
  }

  addCharacter(characterId: CharacterId): void {
    this.db.collection('/characters').add(characterId);
  }

  editCharacter(characterId: CharacterId, newCharacter: CharacterId): void {
    this.db.collection('/characters').doc(characterId.id).set(newCharacter);
  }

  deleteCharacter(characterId: CharacterId): void {
    this.db.collection('/characters').doc(characterId.id).delete();
  }

}
