import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // We don't know the initial value of the user at first,
  // so we use Subject instead of BehaviorSubject
  private userDetails$: Subject<User | undefined> = new Subject<User | undefined>();

  constructor(private afstore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {

    const savedUserString: string | null = localStorage.getItem('user');
    if(savedUserString !== null) {
      this.isLoggedIn$.next(true);
    }

    afAuth.authState.subscribe(user => {
      if(user) {

        // This user a firebase user, so we cast it into User
        this.userDetails$.next(user as User);

        const userString: string = JSON.stringify(user);
        localStorage.setItem("user", userString)
        this.isLoggedIn$.next(true);
      }
      else {
        localStorage.removeItem("user")
        this.isLoggedIn$.next(false);
      }
    })
  }

  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider())
  }

  // The logout of firebase isn't part of Angular,
  // that's why it's not an observable
  public async signout(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem("user");
    this.userDetails$.next(undefined);
    this.router.navigate(["/"]); 
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

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
