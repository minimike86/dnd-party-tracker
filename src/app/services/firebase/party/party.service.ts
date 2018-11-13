import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Party, PartyId } from '../../../models/party/party';
import {CharacterService} from '../character/character.service';
import {CharacterId} from '../../../models/character/character';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private partyCollection: AngularFirestoreCollection<Party>;
  private parties: PartyId[];
  private characters: CharacterId[]; // TODO: Used to sort party members by character name - remove the need to use...

  constructor(public characterService: CharacterService,
              public db: AngularFirestore) {
    this.partyCollection = db.collection<Party>('/parties');
    this.getCharacters(); // TODO: Used to sort party members by character name - remove the need to use...
    this.getParties().subscribe(data => {
      this.parties = data;
    });
  }

  getParties(): Observable<PartyId[]> {
    return this.partyCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Party;
        if (data.members !== undefined) {
          data.members.sort((a1, b) => (this.getCharacter(a1).characterName > this.getCharacter(b).characterName)
              ? 1 : ((this.getCharacter(b).characterName > this.getCharacter(a1).characterName) ? -1 : 0));
        }
        return { id, ...data };
      }))
    );
  }

  // TODO: Used to sort party members by character name - remove the need to use...
  private getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
        err => console.log('Error :: ' + err)
      );
  }

  // TODO: Used to sort party members by character name - remove the need to use...
  private getCharacter(characterReference: string): CharacterId {
    if (this.characters !== undefined) {
      return this.characters.filter(characterId => characterId.id === characterReference)[0];
    }
  }

  addParty(party: Party): void {
    this.partyCollection.add(party);
  }

  deleteParty(partyId: string): void {
    this.partyCollection.doc(partyId).delete();
  }

  // adds the selected character to a parties existing members array, then remove duplicates
  addCharacterToParty(partyId: string, characterId: string): void {
    let partyMembers = [];
    this.parties.filter(x => x.id === partyId)
      .filter(y => {
        partyMembers = y.members;
        this.partyCollection.doc(partyId).update(
          { members: partyMembers.concat(characterId).filter((el, i, a) => i === a.indexOf(el)) }
          );
      });
  }

  deleteCharacterFromParty(partyId: string, characterId: string): void {
    let partyMembers = [];
    this.parties.filter(x => x.id === partyId).filter( y => {
      partyMembers = y.members.filter(element => element !== characterId);
    });
    this.partyCollection.doc(partyId).update(
      { members: partyMembers }
    );
  }

}
