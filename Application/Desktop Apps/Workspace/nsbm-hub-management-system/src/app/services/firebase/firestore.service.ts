import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginCredential } from './../../types';
import * as firebase from 'firebase/app';
import { error } from 'util';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private fireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private alertController: AlertController
  ) { }

  // Logging the user by verifying the entered login credentials
  login(credentials: LoginCredential): Promise<any>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  // Logging the currently logged in user
  logout() {
    this.angularFireAuth.auth.signOut();
  }

  // Retriving the current date and time from the localhost
  currentDT = new Date();
  currentDateTime = this.currentDT.getDate() + "/" + this.currentDT.getMonth() + "/" + this.currentDT.getFullYear() + " " + this.currentDT.getHours() + ":" + this.currentDT.getMinutes() + ":" + this.currentDT.getSeconds();
 

  // Creating new firestore document and adding new new user details for web admin verification
  // Web Admin Email Trigger
  newUserRegisterDetailsVerification(value){
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


  // Registering new module by adding the user provided details into the firestore database
  registerModule(userFaculty, value, userFormAwardingBodyUniversity){
    // Creating an ID for the document
    const docId = this.fireStore.createId();

    return this.fireStore.collection("faculties/"+ userFaculty +"/modules").doc(docId).set({
      moduleCode: value.moduleCode,
      moduleTitle: value.moduleTitle,
      creditsWeighting: value.creditsWeighting,
      degree: value.degreeProgram,
      awardingBodyUniversity: userFormAwardingBodyUniversity,
      academicPeriod: {
        academicYear: value.academicPeriodYear,
        academicSemester: value.academicPeriodSemester
      },
      moduleLeader: value.moduleLeader,
      assignedLecturer: value.assignedLecturer,
      assignedLectureHall: value.assignedLectureHall
    }).then(function() {
      console.log("Module registerd and values were added");
    });
  }

  // Publishing new event session by adding the details to the firestore database
  publishNewEventSession(userFaculty, value, eventStartDateTime, eventEndDateTime){
    // Creating an ID for the document
    const docId = this.fireStore.createId();

    return this.fireStore.collection("faculties/"+ userFaculty +"/eventSessions").doc(docId).set({
      eventTitle: value.eventTitle,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
      status: value.eventStatus
    }).then(function() {
      console.log("New event published and values added");
    })
  }

  // Publishing new transport schedule slot by adding the details to the firestore database
  publishNewTransportSlot(transportSlotType, value, userId){
    // Creating an ID for the document
    const docId = this.fireStore.createId();
    console.log(value.availableDays);
    if(transportSlotType == "nsbmDestination"){
      return this.fireStore.collection("transportationSchedule/transportScheduleType/"+ transportSlotType).doc(docId).set({
        departure: value.departure,
        destination: "NSBM",
        departureTime: value.departureTime,
        approximatedArrivalTime: value.approArrivalTime,
        availableWeekdays: value.availableWeekdays,
        availableWeekends: value.availableWeekends,
        status: value.status,
        createdByUid: userId
      })
    }
    else if(transportSlotType == "nsbmDeparture"){
      return this.fireStore.collection("transportationSchedule/transportScheduleType/"+ transportSlotType).doc(docId).set({
        departure: "NSBM",
        destination: value.destination,
        departureTime: value.departureTime,
        approximatedArrivalTime: value.approArrivalTime,
        availableWeekdays: value.availableWeekdays,
        availableWeekends: value.availableWeekends,
        status: value.status,
        createdByUid: userId
      })
    }
  }
  
  // Publishing new notice by adding the details to the firestore database
  createNewNotice(record) {
    return this.fireStore.collection('Notices').add(record);
  }

  // Retrieving the auth details of the logged in user from firebase authentication
  retrieveLoggedInUserDetailsAuth(){
    return firebase.auth().currentUser
  }

  // Retrieving the details of the logged in user from firestore database with the use of firebase authentication Uid
  retrieveLoggedInUserDetailsFirestore(Uid){
    return this.fireStore.collection("users/userTypes/programOfficeUsers", ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', Uid)).snapshotChanges();
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
  retrievePublishedLectureSessionsLectureSchedule(userFaculty, currentDate, nextDate) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
              .where("startDateTime", ">=", new Date(currentDate))
              .where("startDateTime", "<=", new Date(nextDate))
              ).snapshotChanges();
  }

  // Retrieving published lecture sessions for the current date and their details from the firestore database fro the 
  // dashboard page, today's lectures section
  retrievePublishedLectureSessionsDashboardTodayLectures(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions").snapshotChanges();
  }

  // Retrieving published oncoming lecture sessions from the current date and their details from the firestore database
  // for the dashboard page, upcoming lectures section
  retrievePublishedLectureSessionsDashboardUpcomingLectures(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
              .where("startDateTime", ">", new Date())).snapshotChanges();
  }

  // Retrieving the events sessions and their details from the firestore database
  retrievePublishedEventSessions(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/eventSessions").snapshotChanges();
  }

  // Retrieving registered module and their details from the firestore database for the module page (Module Code)
  retrieveRegisterdModulesModuleCode(userFaculty, value){
    return this.fireStore.collection("faculties/"+ userFaculty +"/modules", ref => ref 
              .where("moduleCode", "==", value)).snapshotChanges();
  }


  // Retrieving registered module and their details from the firestore database for the module page (Module Title)
  retrieveRegisterdModulesModuleTitle(userFaculty, value){
    return this.fireStore.collection("faculties/"+ userFaculty +"/modules", ref => ref 
              .where("moduleTitle", "==", value)).snapshotChanges();
  }

  // Retrieving registered module and their details from the firestore database for the module page (Degree Program)
  retrieveRegisterdModulesDegreeProgram(userFaculty, userSelectedDegree, userSelectedAwardingBodyUniversity){
    return this.fireStore.collection("faculties/"+ userFaculty +"/modules", ref => ref 
              .where("degree", "==", userSelectedDegree)
              .where("awardingBodyUniversity", "==", userSelectedAwardingBodyUniversity)).snapshotChanges();
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

  // Retrieving published batches and their details from the firestore database
  retrievePublishedBatch(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/batches").snapshotChanges();
  }

  // Retrieving published lecture halls and their details from the firestore database
  retrievePublishedLectureHalls(userFaculty) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureHalls").snapshotChanges();
  }

  // Retrieving published session statuses and their details from the firestore database
  retrievePublishedSessionStatuses() {
    return this.fireStore.collection("sessionStatuses").snapshotChanges();
  }

  // Retrieving published module credits weighting and their details from the firestore database
  retrievePublishedModuleCreditsWeighting() {
    return this.fireStore.collection("noOfModuleCreditsWeighting", ref => ref
            .where("status", "==", "Active")).snapshotChanges();
  }

  // Retrieving published transportation schedules and their details from the firestore database
  retrievePublishedTransportationSchedules(transportSlotType) {
    return this.fireStore.collection("transportationSchedule/transportScheduleType/"+ transportSlotType + "/").snapshotChanges();
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
      console.log("Lecture Session Details has been updated.");
    });
  }

  // Updating module values in the firestore database
  updateModule(userFaculty, docId, value, userFormDataAwardingBodyUniversity) {
    return this.fireStore.doc("faculties/"+ userFaculty +"/modules/"+ docId).update({
      moduleCode: value.moduleCode,
      moduleTitle: value.moduleTitle,
      creditsWeighting: value.creditsWeighting,
      degree: value.degreeProgram,
      awardingBodyUniversity: userFormDataAwardingBodyUniversity,
      academicPeriod: {
        academicYear: value.academicPeriodYear,
        academicSemester: value.academicPeriodSemester,
      },
      moduleLeader: value.moduleLeader,
      assignedLecturer: value.assignedLecturer,
      assignedLectureHall: value.assignedLectureHall
    }).then(function() {
      console.log("Module Details has been updated.");
    });
  }

  // Updating event session values in the firestore database
  updateEventSession(userFaculty, docId, value, eventStartDateTime, eventEndDateTime){
    return this.fireStore.doc("faculties/"+ userFaculty +"/eventSessions/"+ docId).update({
      eventTitle: value.eventTitle,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
      status: value.eventStatus
    }).then(function() {
      console.log("Event Session Details has been updated.");
    });
  }

  // Updating transport slot values in the firestore database
  updateTransportSlot(transportSlotType, docId, value){
    
    if(transportSlotType == "nsbmDestination"){
      return this.fireStore.doc("transportationSchedule/transportScheduleType/"+ transportSlotType + "/" + docId).update({
        departure: "NSBM",
        destination: value.destination,
        departureTime: value.departureTime,
        approximatedArrivalTime: value.approArrivalTime,
        availableWeekdays: value.availableWeekdays,
        availableWeekends: value.availableWeekends,
        status: value.status
      }).then(function() {
        console.log("Transport slot details has been updated.");
      });
    }
    else if(transportSlotType == "nsbmDeparture"){
      return this.fireStore.doc("transportationSchedule/transportScheduleType/"+ transportSlotType + "/" + docId).update({
        departure: value.departure,
        destination: "NSBM",
        departureTime: value.departureTime,
        approximatedArrivalTime: value.approArrivalTime,
        availableWeekdays: value.availableWeekdays,
        availableWeekends: value.availableWeekends,
        status: value.status
      }).then(function() {
        console.log("Transport slot details has been updated.");
      });
    }

  }

  // Removing event session from the firestore database
  removeEventSession(userFaculty, id) {
    return this.fireStore.doc("faculties/"+ userFaculty +"/eventSessions/"+ id).delete();
  }

  // Removing lecture session from the firestore database
  removeLectureSession(userFaculty, id) {
    return this.fireStore.doc("faculties/"+ userFaculty +"/lectureSessions/"+ id).delete();
  }

  // Removing registered modules from the firestore database
  removeRegisteredModule(userFaculty, DocId){
    this.fireStore.doc("faculties/"+ userFaculty +"/modules/"+ DocId).delete();
  }
 
  // Removing published transport schedule from the firestore database
  removePublishedTransportSlot(transportSlotType, docId){
    this.fireStore.doc("transportationSchedule/transportScheduleType/"+ transportSlotType + "/" + docId).delete();
  }


}
