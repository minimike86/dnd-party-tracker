import { Injectable } from '@angular/core';
import { app, auth, User } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }


  login(provider: string) {
    console.log('logging in');
    switch (provider) {
      case 'google':
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
          .then((credential) => {
            this.updateUserData(credential.user);
          });
        break;
    }
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = user;
    userRef.set(data.toJSON(), { merge: true });
    console.log('logged in', user);
  }


  logout() {
    console.log('logged out');
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
