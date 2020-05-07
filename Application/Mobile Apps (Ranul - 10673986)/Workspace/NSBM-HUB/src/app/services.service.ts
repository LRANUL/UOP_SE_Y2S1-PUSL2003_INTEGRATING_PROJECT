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
    return this.firestore.collection('/notices/noticeTypes/notices-PO-To-Students/').snapshotChanges();
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
          awardingBodyUniversity: value.awardingBodyUniversity,
          Email: value.email,
          nsbmStudentID: value.sid,
          degreeCode: value.DegreeCode,
          degree: value.degree,
          batch: value.batch,
          uID: this.userDetails().uid,
          createdDateTime: new Date(),
          // ServerTime:firebase.firestore.FieldValue.serverTimestamp(),
          edited: {
            editedByUID: [this.userDetails().uid],
            editedDateTime: [new Date()],
            editedSection: ["Initial Register"]
          },
          sessionDateTime: {
            loginDateTime: [new Date()],
            logoutDateTime: ['']
          },
          faculty: value.faculty,
          status: "Active"

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

  fetchNotice() {

    return this.firestore.collection('notices/noticeTypes/notices-PO-To-Students').snapshotChanges();

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
  sendAttendance(ModuleCode, email) {
    return this.firestore.firestore.collection('Attendance/History/' + ModuleCode).doc(email).set({
      data: {
        moduleTitle: ModuleCode,
        Attendace: firebase.firestore.FieldValue.increment(1),
      },

    }, { merge: true })
  }
  fetchSession(Faculty) {
    return this.firestore.collection('faculties').doc(Faculty).collection('lectureSessions').snapshotChanges();
  }
  userDetails(){
    return firebase.auth().currentUser;
  }
  sendKey(faculty, PrepKey, DocID, LocationCheck) {
    return this.firestore.firestore.collection('faculties').doc(faculty).collection('lectureSessions').doc(DocID).set({
      SessionCode: PrepKey,
      LocationCheck: LocationCheck,
    }, { merge: true });
  }
}
 