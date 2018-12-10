import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: any = null;

  constructor(private app: FirebaseApp,
              public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {

    this.afAuth.authState.subscribe( data => {
      this.authState = data;
      if ( data !== undefined && data !== null ) {
        this.db.collection('users').doc(data.uid).set(data.toJSON());
      }
    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
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
