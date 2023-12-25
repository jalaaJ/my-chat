import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';

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
    console.log(res);
  }

}
