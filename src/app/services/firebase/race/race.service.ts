import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Race, RaceId } from '../../../models/character/race';


@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private raceCollection: AngularFirestoreCollection<Race>;
  private races: RaceId[];

  constructor(public db: AngularFirestore) {
    this.raceCollection = db.collection<Race>('/races');
    this.getRaces().subscribe( data => {
      this.races = data;
    });
  }

  getRaces(): Observable<RaceId[]> {
    return this.raceCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Race;
        return { id, ...data };
      }))
    );
  }

  addRace(race: Race): void {
    this.raceCollection.doc(
      (race.variety === undefined || race.variety === null)
          ? race.name.toUpperCase().replace(' ', '')
          : race.name.toUpperCase().replace(' ', '') + '-' + race.variety.toUpperCase().replace(' ', '')
    ).set(race);
  }

}
