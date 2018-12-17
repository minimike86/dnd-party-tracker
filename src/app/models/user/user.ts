import {User as FirebaseUser} from 'firebase';

export interface Roles {
  player?: boolean;
  dm?: boolean;
  admin?: boolean;
}

export interface User extends FirebaseUser {
  uid: string;
  apiKey: string;
  appName: string;
  authDomain: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  photoURL: string;
  providerData: any;
  redirectEventId: any;
  stsTokenManager: any;
  roles: Roles;
}
