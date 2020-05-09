import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,private route: Router) { }

  isfound;

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          if(this.isfound= email.includes("@student"))
          {
            this.route.navigate(['about us']);
          }else
          {
            this.route.navigate(['home']);
          }
        }
      })
  }

  createUser(user){
    this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName + '' + user.ids + '' + user.faculty + '' + user.degreeCode + '' + user.degreeProgram + '' + user.university
        });
        this.insertUserData(userCredential)
          .then(() => {
            this.route.navigate(['login']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/userTypes/studentUsers/${userCredential.user.email}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      studentID: this.newUser.ids,
      faculty: this.newUser.faculty,
      degreeCode: this.newUser.degreeCode,
      degreeProgram: this.newUser.degreeProgram,
      awardinguniversityBody: this.newUser.university
    })
  }
}
