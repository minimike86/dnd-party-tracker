import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Skill, SkillId } from '../../../models/character/skill';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skillCollection: AngularFirestoreCollection<Skill>;
  private skills: Array<SkillId>;

  constructor(public db: AngularFirestore) {
    this.skillCollection = db.collection<Skill>('/skills');
    this.getSkills().subscribe( data => {
      this.skills = data;
    });
  }

  getSkills(): Observable<SkillId[]> {
    return this.skillCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Skill;
        return { id, ...data };
      }))
    );
  }

  addSkill(skill: Skill): void {
    this.skillCollection.doc(skill.name.toUpperCase().replace(' ', '')).set(skill);
  }
}
