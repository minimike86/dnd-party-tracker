import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Character, CharacterId} from '../../../models/character/character';
import {Alignment} from '../../../enums/enum-alignment';
import {Size} from '../../../enums/enum-size';
import {AbilityScore} from '../../../models/character/ability-scores';
import {HttpClient} from '@angular/common/http';
import {FeatId} from '../../../models/feat/feat';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterCollection: AngularFirestoreCollection<Character>;
  private characters: CharacterId[];
  public tempCharacter$: Observable<Character>;
  public tempCharacter: Character;

  /*
  constructor(public db: AngularFirestore) {
    this.characterCollection = db.collection<Character>('/characters');
    this.getCharacters().subscribe(data => {
      this.characters = data;
    });
    this.newCharacter();
  }
  */
  constructor(private http: HttpClient) {
    this.tempCharacter$ = this.http.get<Character>('assets/json/character.json');
  }

  newCharacter(): void {
    this.tempCharacter = {
      owner: null,
      characterName: null,
      playerName: null,
      classes: [],
      ecl: null,
      raceId: null,
      size: null,
      imageUrl: null,
      gender: null,
      age: null,
      alignment: null,
      religion: [],
      height: { feet: 5, inches: 10 }, // 5' 10"
      weight: null, // 220 lbs.
      looks: null,
      personality: null,
      background: null,
      tempAbilityScores: new AbilityScore(0, 0, 0, 0,  0, 0),
      totalAbilityScores: new AbilityScore(0, 0, 0, 0,  0, 0),
      hitPoints: null,
      hitDie: [],
      baseAttackBonus: null,
      saves: { fort: null, ref: null, will: null },
      skillRanks: [],
      feats: [],
      weaponsId: null,
      inventoryId: null,
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

  addCharacter(character: Character): void {
    this.characterCollection.doc(character.characterName.toUpperCase().replace(new RegExp(' ', 'gi'), '')).set(character);
  }

}
