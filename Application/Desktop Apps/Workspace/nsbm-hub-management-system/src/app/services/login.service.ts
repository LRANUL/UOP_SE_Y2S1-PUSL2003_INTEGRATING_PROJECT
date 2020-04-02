import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginCredential } from '../types';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  login(credentials: LoginCredential): Promise<any>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }


  // Retriving the current date and time from the localhost
  currentDT = new Date();
  currentDateTime = this.currentDT.getDate() + "/" + this.currentDT.getMonth() + "/" + this.currentDT.getFullYear() + " " + this.currentDT.getHours() + ":" + this.currentDT.getMinutes() + ":" + this.currentDT.getSeconds();
 

  // Creating new firestore document and adding new new user details for web admin verification
  // Web Admin Email Trigger
  newUserRegistorDetailsVerification(value){
    return new Promise<any>((resolve, reject) => {

      // Adding module details into firestore
      this.firestore.collection("newUserDetailsWebAdminVerification").doc(value.NSBMEmailAddress).set({
        name: {
          firstName: value.firstName,
          middleName: value.middleName,
          lastName: value.lastName
        },
        faculty: value.faculty,
        createdDatetime: this.currentDateTime
      })

    })
  }
  
}
