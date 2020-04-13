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

  // Retrieving published lecture session and their detais from the firestore database for the semester calendar page
  retrievePublishedLectureSessionsSemesterCalendar(userFaculty, value, userSelectedAwardingBodyUniversity) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
            .where("batch", "==", value.batch)
            .where("degreeProgram", "==", value.degreeProgram)
            .where("awardingBodyUniversity", "==", userSelectedAwardingBodyUniversity)
            .where("academicYear", "==", parseInt(value.academicYearYear)) /* ( parseInt() ) Converting value data type from the form, string to int */
            .where("academicSemester", "==", parseInt(value.academicYearSemester))).snapshotChanges();
  }

  // Retrieving published lecture session and their detais from the firestore database for the lecture schedule page
  retrievePublishedLectureSessionsLectureSchedule(userFaculty, currentDateMidnightUnix, nextDateMidnightUnix) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
              .where("startDateTime", "<=", currentDateMidnightUnix)
              .where("startDateTime", ">=", nextDateMidnightUnix)).snapshotChanges();
  }

  // Retrieving registered modules and their details from the firestore database
  retrieveRegisteredModules(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/modules").snapshotChanges();
  }

  // Retrieving registered lecturers and their details from the firestore database
  retrieveRegisteredLecturers() {
    return this.fireStore.collection("users/userTypes/lecturerUsers").snapshotChanges();
  }

  // Retrieving published degree programs and their details from the firestore database
  retrievePublishedDegreeProgram(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/degreePrograms").snapshotChanges();
  }

  // Retrieving published batch and their details from the firestore database
  retrievePublishedBatch(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/batches").snapshotChanges();
  }

  // Retrieving published lecture halls and their details from the firestore database
  retrievePublishedLectureHallsSOC(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureHalls").snapshotChanges();
  }

  // Retrieving published session statuses and their details from the firestore database
  retrievePublishedSessionStatuses() {
    return this.fireStore.collection("sessionStatuses").snapshotChanges();
  }

  // Updating lecture session values in the firestore database
  updateLectureSession(userFaculty, id, value, userFormDataModuleCode, userFormDataSessionStartDateTime, userFormDataSessionEndDateTime) {
    return this.fireStore.doc("faculties/"+ userFaculty +"/lectureSessions/"+ id).update({
      batch: value.batch,
      degreeProgram: value.degreeProgram,
      academicYear: value.academicYear,
      academicSemester: value.academicSemester,
      moduleCode: userFormDataModuleCode,
      moduleTitle: value.moduleTitle,
      lecture: value.lecturer,
      lectureHall: value.lectureHall,
      status: value.lectureStatus,
      startDateTime: userFormDataSessionStartDateTime,
      endDateTime: userFormDataSessionEndDateTime
    }).then(function() {
      console.log("Values Updated");
    });
  }

  // Removing lecture session from the firestore database
  removeLectureSession(userFaculty, id) {
    return this.fireStore.doc("faculties/"+ userFaculty +"/lectureSessions/"+ id).delete();
  }
 


}
