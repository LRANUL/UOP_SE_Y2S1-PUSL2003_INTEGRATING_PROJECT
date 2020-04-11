import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginCredential } from './../../types';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private fireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
  ) { }

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
      this.fireStore.collection("newUserDetailsWebAdminVerification").doc(value.NSBMEmailAddress).set({
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

  // Retrieving the auth details of the logged in user from firebase authentication
  retrieveLoggedInUserDetailsAuth(){
    return firebase.auth().currentUser
  }


  // Retrieving the details of the logged in user from firestore database with the use of firebasr authentication Uid
  retrieveLoggedInUserDetailsFirestore(Uid){
    return this.fireStore.collection("users/userTypes/programOfficeUsers", ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', Uid)).snapshotChanges();
  }

  createNewNotice(record) {
    return this.fireStore.collection('Notices').add(record);
  }

  // Retrieving the published notices (Lecturers to Program Office (PO)) from the firestore database
  retrievePublishedNotices_Lecturers_To_PO(){
    return this.fireStore.collection("notices/noticeTypes/notices-Lecturers-To-PO").snapshotChanges();
  }

  // Retrieving the published notices (Program Office (PO) to Students) from the firestore database
  retrievePublishedNotices_PO_To_Students(){
    return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Students").snapshotChanges();
  }

  // Retrieving the published notices (Program Office (PO) to Lecturers) from the firestore database
  retrievePublishedNotices_PO_To_Lecturers(){
    return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Lecturers").snapshotChanges();
  }

  // Retrieving published modules and their details from the firestore database
  retrievePublishedModules() {
    return this.fireStore.collection("studentCategories/studentCategoryTypes/modules").snapshotChanges();
  }

  // Retrieving registered lecturers and their details from the firestore database
  retrieveRegisteredLecturers() {
    return this.fireStore.collection("users/userTypes/lecturerUsers").snapshotChanges();
  }

  // Retrieving published degree programs and their details from the firestore database
  retrievePublishedDegreeProgram() {
    return this.fireStore.collection("studentCategories/studentCategoryTypes/degreeProgram").snapshotChanges();
  }

  // Retrieving published batch and their details from the firestore database
  retrievePublishedBatch() {
    return this.fireStore.collection("studentCategories/studentCategoryTypes/batch").snapshotChanges();
  }

  // Retrieving published lecture halls and their details from the firestore database
  retrievePublishedLectureHallsSOC() {
    return this.fireStore.collection("faculties/School of Computing/lectureHalls").snapshotChanges();
  }


}
