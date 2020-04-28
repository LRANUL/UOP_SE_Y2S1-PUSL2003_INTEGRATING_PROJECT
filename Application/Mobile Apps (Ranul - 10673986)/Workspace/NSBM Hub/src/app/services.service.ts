import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  navCtrl: any;
  
  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('User is signed in');   
      }
      else {
        // No user is signed in.
        console.log('User is NOT signed in');
      }
    });
  }
  NoticesPull() {
    return this.firestore.collection('notices/notices-PO-To-Students/').snapshotChanges();
  }
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
      var user = firebase.auth().currentUser;
      return new Promise<any>((resolve, reject) => {
        console.log('Student Record Stored')
        this.firestore.collection('users/userTypes/studentUsers').doc(value.email).set({
          name: {
            firstName: value.fName,
            middleName: value.mName,
            lastName: value.lName
          },
          Email: value.email,
          nsbmStudentID: value.sid,
          degree: value.degree,
          batch: value.batch,
          uID: user.uid,
          createdDateTime: new Date(),
          // ServerTime:firebase.firestore.FieldValue.serverTimestamp(),
          edited: {
            editedByUID: [user.uid],
            editedDateTime: [new Date()],
            editedSection: ["Initial Register"]
          },
          sessionDateTime: {
            loginDateTime: [new Date()],
            logoutDateTime: [new Date()]
          },
          faculty: value.faculty,
          status: "active"

        })
          .then(
            (res) => {
              resolve(res)
            },
            err => reject(err)
          )
      })
    })

  }


  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("Log out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }
}
 