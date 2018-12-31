import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feat, FeatId } from '../../../models/feat/feat';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeatService {

  private featCollection: AngularFirestoreCollection<Feat>;
  public feats$: Observable<FeatId[]>;

  /*
  constructor(public db: AngularFirestore) {
    this.featCollection = db.collection<Feat>('/feats');
  }
  */
  constructor(private http: HttpClient) {
    this.getFeats();
  }

  getFeats(): Observable<any> {
    return this.http.get<FeatId[]>('assets/json/feats.json');
  }

  addFeat(feat: Feat): void {}

  /*
  getFeats(): Observable<FeatId[]> {
    return this.featCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Feat;
        return { id, ...data };
      }))
    );
  }

  addFeat(feat: Feat): void {
    this.featCollection.doc(feat.name.toUpperCase().replace(new RegExp(' ', 'gi'), '')).set(feat);
  }

  deleteFeat(featId: string): void {
    this.featCollection.doc(featId).delete();
  }
  */

}
