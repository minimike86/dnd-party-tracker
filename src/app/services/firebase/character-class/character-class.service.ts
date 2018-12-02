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

  addCharacterClass(charClass: CharacterClass): void {
    this.classCollection.doc(charClass.name.toUpperCase().replace(new RegExp(' ', 'gi'), '')).set(charClass);
  }

  updateBaseAttackBonus(cls: string, bab: string): void {
    const arrayGood = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const arrayAvrg = [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15];
    const arrayPoor = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];
    switch (bab) {
      case 'good':
        this.classCollection.doc(cls.toUpperCase()).update( { baseAttackBonus: arrayGood } );
        break;
      case 'avrg':
        this.classCollection.doc(cls.toUpperCase()).update( { baseAttackBonus: arrayAvrg } );
        break;
      case 'poor':
        this.classCollection.doc(cls.toUpperCase()).update( { baseAttackBonus: arrayPoor } );
        break;
    }
  }

  updateBaseSaveBonus(cls: string, fort: boolean, ref: boolean, will: boolean): void {
    const arrayGood = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12];
    const arrayPoor = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6];
    this.classCollection.doc(cls.toUpperCase()).update( {
      saves: {
        fortitude: fort ? arrayGood : arrayPoor,
        reflex: ref ? arrayGood : arrayPoor,
        will: will ? arrayGood : arrayPoor
      }
    });
  }

}
