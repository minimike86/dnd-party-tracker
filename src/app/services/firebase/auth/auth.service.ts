import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser;

  constructor(private app: FirebaseApp,
              public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {

    app.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.db.collection('users').doc(user.email).set(user.toJSON());
        this.currentUser = user.email;
      } else {
        // No user is signed in.
        this.currentUser = null;
      }
    });

  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  login(provider: string) {
    switch (provider) {
      case 'google':
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
