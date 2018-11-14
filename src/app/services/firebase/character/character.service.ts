import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Character, CharacterId} from '../../../models/character/character';
import {Alignment} from '../../../enums/enum-alignment';
import {Size} from '../../../enums/enum-size';
import {AbilityScore} from '../../../models/character/ability-scores';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterCollection: AngularFirestoreCollection<Character>;
  private characters: CharacterId[];
  public tempCharacter: Character;

  constructor(public db: AngularFirestore) {
    this.characterCollection = db.collection<Character>('/characters');
    this.getCharacters().subscribe(data => {
      this.characters = data;
    });
    this.tempCharacter = {
      owner: '',
      characterName: '',
      playerName: '',
      classes: [{
        className: '',
        level: 0
      }],
      ecl: 1,
      raceId: '',
      size: Size.MEDIUM,
      imageUrl: '',
      gender: '',
      alignment: Alignment.N,
      religion: '',
      height: [0, 0], // 5' 10"
      weight: 0,      // 220 lbs.
      looks: '',
      baseAbilityScores: new AbilityScore(0, 0, 0, 0,  0, 0),
      hitPoints: 0,
      hitDie: [],
      baseAttackBonus: 0,
      weaponsId: '',
      inventoryId: '',
    };
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
