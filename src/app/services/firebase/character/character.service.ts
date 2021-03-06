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
import {Skill} from '../../../models/character/skill';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterCollection: AngularFirestoreCollection<Character>;
  private characters: CharacterId[];
  public tempCharacter$: Observable<Character>;
  public tempCharacter: Character;

  constructor(public db: AngularFirestore) {
    this.characterCollection = db.collection<Character>('/characters');
    this.getCharacters().subscribe(data => {
      this.characters = data;
    });
    this.newCharacter();
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
      tempAbilityScores: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0,  wisdom: 0, charisma: 0 },
      totalAbilityScores: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0,  wisdom: 0, charisma: 0 },
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

  getCharacter(characterId: string): Observable<CharacterId> {
    return this.characterCollection.doc(characterId).snapshotChanges().pipe(
      map(actions => {
        const id = actions.payload.id;
        const data = actions.payload.data() as Character;
        return { id, ...data };
      })
    );
  }

  addCharacter(character: Character): void {
    console.log(character);
    this.characterCollection.add(character);
  }

  deleteCharacter(characterId: string): void {
    this.characterCollection.doc(characterId).ref.delete();
  }

}
