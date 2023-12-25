import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afstore: AngularFirestore, private afAuth: AngularFireAuth) {}

  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider())
  }

  // private authLogin(provider: firebase.default.auth.AuthProvider) {
  //   return this.afAuth.signInWithPopup(provider).then(res => {
  //     console.log(res);
  //   })
  // }

  private async authLogin(provider: firebase.default.auth.AuthProvider) {
    const res = await this.afAuth.signInWithPopup(provider);
    this.setUserData(res.user as User);
  }

  private setUserData(user: User){
    if(!user) return;

    // Collection of users in the database
    const userReference: AngularFirestoreDocument<User> = this.afstore.doc(
      `users/${user.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userReference.set(userData, {

      // We use it so we won't override the data, we append it
      merge: true
    })
  }

}
