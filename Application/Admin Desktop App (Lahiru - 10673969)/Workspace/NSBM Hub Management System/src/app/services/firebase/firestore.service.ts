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

  // Retrieving the auth details of the logged in user from firebase authentication
  retrieveLoggedInUserDetailsAuth(){
    return firebase.auth().currentUser
  }

  // Updating account activity field in the logged in program office user document in the firestore database
  updateProgramOfficeUserActivity(accountActivity, docId){
    return new Promise<any>((resolve, reject) => {
        this.fireStore.doc("/users/userTypes/programOfficeUsers/"+ docId).update({
            accountActivity: accountActivity
        })
        .then(response => resolve(response),
            error => reject(error))
    });
  }

  // Verifying entered login credentials after the user has already logged in
  verifyLoginCredentials(value) {
    return new Promise<any>((resolve, reject) => {
        const loginCredentials = firebase.auth.EmailAuthProvider.credential(
            value.emailAddress,
            value.password
        )
        let currentUser = firebase.auth().currentUser;
        currentUser.reauthenticateWithCredential(loginCredentials).then(
            response => resolve(response),
            error => reject(error)
        );
    });
  }


  // Retrieving the details of the logged in user from firestore database with the use of firebase authentication Uid
  retrieveLoggedInUserDetailsLecturer(Uid) {
    return this.fireStore.collection("users/userTypes/lecturerUsers", ref => ref
            .where("userId", '==', Uid)).snapshotChanges();
  }

  // Retrieving the details of the logged in user from firestore database with the use of firebase authentication Uid
  retrieveLoggedInUserDetailsProgramOffice(Uid) {
      return this.fireStore.collection("users/userTypes/programOfficeUsers", ref => ref
              .where("userId", '==', Uid)).snapshotChanges();
  }


  // Creating new document into user activity monitoring collection in firestore database
  userActivityMonitoring(loggedInUserId, loggedInUserEmail){
    this.fireStore.collection("userActivityMonitoring/").add({
      loginDateTime: new Date(),
      userEmail: loggedInUserEmail,
      userId: loggedInUserId
    }); 
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
        createdDatetime: new Date()
      })

    })
  }

  // Implementation of Registering a new lecturer into the system (firebase authentication)
  lecturerRegistrationDetails(value, loggedInUserId, loggedInUserFaculty) {
    return new Promise<any>((resolve, reject) => { // Adding new record into firebase auth

        // Creating new firebase authentication user
        firebase.auth().createUserWithEmailAndPassword(value.nsbmEmail, value.confirmPassword).then(success => {

            // Adding lecturer details into firestore
            this.fireStore.collection("users/userTypes/lecturerUsers/").doc(value.nsbmEmail).set({
                nsbmLecturerId: value.nsbmLecturerId,
                name: {
                    prefix: value.nameTitle,
                    firstName: value.firstName,
                    middleName: value.middleName,
                    lastName: value.lastName
                },
                specializedFaculty: value.specializedFaculty,
                specialization: value.specialization,
                createdDetails: {
                    createdByPOUserId: loggedInUserId,
                    createdDateTime: new Date(),
                    createdFaculty: loggedInUserFaculty
                },
                editedDetails: {
                    editedByUserId: "Registration Phase",
                    editedDateTime: new Date(),
                    editedSection: "Registration Phase"
                },
                sessionDetails: {
                    loginDateTime: [new Date()],
                    logoutDateTime: [new Date()]
                },
                status: value.lecturerStatus,
                accountActivity: "Offline",
                userId: success.user.uid
            });
            resolve(success);
        }, error => reject(error))

    })
  }

  // Publishing news by creating a new document and adding details into firestore database
  publishNews(coverImageSection, attachmentLinkSection, coverImageFileName, coverImageFilePath, coverImageFileSize, loggedInUserFaculty, loggedInUserId, value){
    return new Promise<any>((resolve, reject) => {
      // Creating a new ID for the document
      const docId = this.fireStore.createId();

      if(coverImageSection == true && attachmentLinkSection == true){
        this.fireStore.collection("news/").doc(docId).set({
          title: value.newsTitle,
          description: value.newsDescription,
          category: value.newsCategory,
          newsCreatedUid: loggedInUserId,
          newsCreatedFaculty: loggedInUserFaculty,
          newsCreatedDateTime: new Date(),
          attachmentLink: value.newsAttachmentLink,
          coverImage: {
            coverImageFileName: coverImageFileName,
            coverImageFilePath: coverImageFilePath,
            coverImageFileSize: coverImageFileSize,
          }
        }).then(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
      }
      else if(coverImageSection == true && attachmentLinkSection == false){
        this.fireStore.collection("news/").doc(docId).set({
          title: value.newsTitle,
          description: value.newsDescription,
          category: value.newsCategory,
          newsCreatedUid: loggedInUserId,
          newsCreatedDateTime: new Date(),
          newsCreatedFaculty: loggedInUserFaculty,
          coverImage: {
            coverImageFileName: coverImageFileName,
            coverImageFilePath: coverImageFilePath,
            coverImageFileSize: coverImageFileSize,
          }
        }).then(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
      }
      else if(coverImageSection == false && attachmentLinkSection == true){
        this.fireStore.collection("news/").doc(docId).set({
          title: value.newsTitle,
          description: value.newsDescription,
          category: value.newsCategory,
          newsCreatedUid: loggedInUserId,
          newsCreatedDateTime: new Date(),
          newsCreatedFaculty: loggedInUserFaculty,
          attachmentLink: value.newsAttachmentLink,
        }).then(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
      }
      else if(coverImageSection == false && attachmentLinkSection == false){
        this.fireStore.collection("news/").doc(docId).set({
          title: value.newsTitle,
          description: value.newsDescription,
          category: value.newsCategory,
          newsCreatedUid: loggedInUserId,
          newsCreatedDateTime: new Date(),
          newsCreatedFaculty: loggedInUserFaculty
        }).then(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
      }
    })
  }

  // Publishing new notice by creating a new document and add details into the firestore database
  publishNotice(coverImageToggle, noticeType, recipientType, coverImageFileName, coverImageFilePath, coverImageFileSize, loggedInUserId, value){
    return new Promise<any>((resolve, reject) => { // Adding new record into firebase auth

      // Creating a new ID for the document
      const docId = this.fireStore.createId();

      // If notice type is 'notices sent for students'
      if(noticeType == "notices-PO-To-Students"){
        if(coverImageToggle == true){ // If cover image toggle is toggled
          if(recipientType == "Module"){ // If recipient type is 'Module'
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
                noticeTitle: value.noticeTitle,
                noticeDescription: value.noticeDescription,
                noticeCategory: value.noticeCategory,
                noticeRecipient: {
                  noticeRecipientModule: value.noticeRecipientModule,
                  noticeRecipientBatch: "NULL" 
                },
                noticeCoverImage: {
                  coverImageFileName: coverImageFileName,
                  coverImageFilePath: coverImageFilePath,
                  cooverImageFileSize: coverImageFileSize
                },
                noticeCreated: {
                  noticeCreatedByUid: loggedInUserId,
                  noticeCreatedByFaculty: value.noticeAuthor,
                  noticeCreatedDateTime: new Date()
                },
                noticeUpdate: {
                  updatedByName: "NULL",
                  updatedByFaculty: "NULL",
                  updatedDateTime: "NULL",
                  updatedSection: "NULL",
                }
              }).then(success => {
                resolve(success);
              }, error => {
                reject(error);
            });
          }
          else if(recipientType == "Batch"){ // If recipient type is 'Batch'
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
              noticeTitle: value.noticeTitle,
              noticeDescription: value.noticeDescription,
              noticeCategory: value.noticeCategory,
              noticeRecipient: {
                noticeRecipientModule: "NULL",
                noticeRecipientBatch: value.noticeRecipientBatch 
              },
              noticeCoverImage: {
                coverImageFileName: coverImageFileName,
                coverImageFilePath: coverImageFilePath,
                cooverImageFileSize: coverImageFileSize
              },
              noticeCreated: {
                noticeCreatedByUid: loggedInUserId,
                noticeCreatedByFaculty: value.noticeAuthor,
                noticeCreatedDateTime: new Date()
              },
              noticeUpdate: {
                updatedByName: "NULL",
                updatedByFaculty: "NULL",
                updatedDateTime: "NULL",
                updatedSection: "NULL",
              }
            }).then(success => {
              resolve(success);
            }, error => {
              reject(error);
            });
          }
        }
        else if(coverImageToggle == false){ // If cover image toggle is not toggled
          if(recipientType == "Module"){ // If recipient type is 'Module'
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
              noticeTitle: value.noticeTitle,
              noticeDescription: value.noticeDescription,
              noticeCategory: value.noticeCategory,
              noticeRecipient: {
                noticeRecipientModule: value.noticeRecipientModule,
                noticeRecipientBatch: "NULL"
              },
              noticeCreated: {
                noticeCreatedByUid: loggedInUserId,
                noticeCreatedByFaculty: value.noticeAuthor,
                noticeCreatedDateTime: new Date()
              },
              noticeUpdate: {
                updatedByName: "NULL",
                updatedByFaculty: "NULL",
                updatedDateTime: "NULL",
                updatedSection: "NULL",
              }
            }).then(success => {
              resolve(success);
            }, error => {
              reject(error);
            });
          }
          else if(recipientType == "Batch"){ // If recipient type is 'Batch'
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
              noticeTitle: value.noticeTitle,
              noticeDescription: value.noticeDescription,
              noticeCategory: value.noticeCategory,
              noticeRecipient: {
                noticeRecipientModule: "NULL",
                noticeRecipientBatch: value.noticeRecipientBatch 
              },
              noticeCreated: {
                noticeCreatedByUid: loggedInUserId,
                noticeCreatedByFaculty: value.noticeAuthor,
                noticeCreatedDateTime: new Date()
              },
              noticeUpdate: {
                updatedByName: "NULL",
                updatedByFaculty: "NULL",
                updatedDateTime: "NULL",
                updatedSection: "NULL",
              }
            }).then(success => {
              resolve(success);
            }, error => {
              reject(error);
            });
          }
        }
      }
      else if(noticeType == "notices-PO-To-Lecturers"){
        if(coverImageToggle == true){ // If cover image toggle is toggled
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
              noticeTitle: value.noticeTitle,
              noticeDescription: value.noticeDescription,
              noticeCategory: value.noticeCategory,
              noticeRecipient: value.noticeRecipient,
              noticeCoverImage: {
                coverImageFileName: coverImageFileName,
                coverImageFilePath: coverImageFilePath,
                cooverImageFileSize: coverImageFileSize
              },
              noticeCreated: {
                noticeCreatedByUid: loggedInUserId,
                noticeCreatedByFaculty: value.noticeAuthor,
                noticeCreatedDateTime: new Date()
              },
              noticeUpdate: {
                updatedByName: "NULL",
                updatedByFaculty: "NULL",
                updatedDateTime: "NULL",
                updatedSection: "NULL",
              }
            }).then(success => {
              resolve(success);
            }, error => {
              reject(error);
            });
        }
        else if(coverImageToggle == false){ // If cover image toggle is not toggled
            this.fireStore.collection("notices/noticeTypes/"+ noticeType +"/").doc(docId).set({
              noticeTitle: value.noticeTitle,
              noticeDescription: value.noticeDescription,
              noticeCategory: value.noticeCategory,
              noticeRecipient: value.noticeRecipient,
              noticeCreated: {
                noticeCreatedByUid: loggedInUserId,
                noticeCreatedByFaculty: value.noticeAuthor,
                noticeCreatedDateTime: new Date()
              },
              noticeUpdate: {
                updatedByName: "NULL",
                updatedByFaculty: "NULL",
                updatedDateTime: "NULL",
                updatedSection: "NULL",
              }
            }).then(success => {
              resolve(success);
            }, error => {
              reject(error);
            });
        }
      }
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

  // Adding new lecture session by creating a new document in firestore database
  addNewLectureSession(userFaculty, value, degreeCode, awardingBodyUniversity, moduleTitle, sessionStartDateTime, sessionEndDateTime){
    return new Promise<any>((resolve, reject) => { 
      this.fireStore.collection("faculties/" + userFaculty + "/lectureSessions/").add({
          academicSemester: parseInt(value.academicPeriodSemester),
          academicYear: parseInt(value.academicPeriodYear),
          degree: value.degreeProgram,
          awardingBodyUniversity: awardingBodyUniversity,
          degreeCode: degreeCode,
          batch: value.batch,
          startDateTime: new Date(sessionStartDateTime),
          endDateTime: new Date(sessionEndDateTime),
          lectureHall: value.lectureHall,
          lecturer: value.lecturer,
          moduleCode: value.module,
          moduleTitle: moduleTitle,
          status: value.status
        }).then(success => {
          resolve(success);
        }, error => {
          reject(error);
        });
    })
  }

  // Adding new lecture series by creating a new document in firestore database
  createNewLectureSeries(value, userFaculty, awardingBodyUniversity, moduleTitle) {
    this.fireStore.collection("faculties/" + userFaculty + "/lectureSeries/").add({
        degree: value.degreeProgram,
        awardingBodyUniversity: awardingBodyUniversity,
        batch: value.batch,
        enrollmentKey: value.enrollmentKey,
        noOfLectures: value.noOfLectures,
        moduleCode: value.module,
        moduleTitle: moduleTitle,
        enrolledStudents: ["Initial Series Creation"]
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

  // Adding new degree program by creating a new document and assigning the values to firestore database
  addNewDegreeProgram(value, userFaculty){
    this.fireStore.collection("faculties/"+ userFaculty +"/degreePrograms/").add({
        degreeCode: value.degreeCode,
        degree: value.degree,
        awardingBodyUniversity: value.awardingBodyUniversity,
        deliveryNoOfYears: value.academicPeriodYear,
        deliveryNoOfSemestersAnnually: value.academicPeriodSemester,
        programDelivery: value.programDelivery,
        programCoordinator: value.programCoordinator
    });
  }

  // Adding new batch by creating a new document and assigning the values to firestore database
  addNewBatch(value, awardingBodyUniversity, userFaculty){
      this.fireStore.collection("faculties/"+ userFaculty +"/batches/").add({
          batch: value.batch,
          degree: value.degreeProgram,
          awardingBodyUniversity: awardingBodyUniversity,
          status: value.status
      });
  }

  // Adding new credit weighting by creating a new document and assigning the values to firestore database
  addNewCreditWeighting(value){
      this.fireStore.collection("noOfModuleCreditsWeighting/").add({
          creditsWeighting: value.creditWeighting,
          description: value.description,
          status: value.status
      });
  }

  // Adding new lecture hall by creating a new document and assigning the values to firestore database
  addNewLectureHall(value, userFaculty){
      this.fireStore.collection("faculties/"+ userFaculty +"/lectureHalls/").add({
          lectureHall: value.lectureHall,
          level: value.level,
          approximateNoOfSeatsAvailable: value.approximateNoOfSeatsAvailable
      });
  }



  // Adding new session status by creating a new document and assigning the values to firestore database
  addNewSessionStatus(value){
      this.fireStore.collection("sessionStatuses/").add({
          status: value.status,
          description: value.description
      });
  }

  // Adding new user account status by creating a new document and assigning the values to firestore database
  addNewUserAccountStatus(value){
      this.fireStore.collection("userStatuses/").add({
          status: value.status,
          description: value.description
      });
  }


  // Adding new notice category by creating a new document and assigning the values to firestore database
  addNewNoticeCategory(value){
      this.fireStore.collection("categories/categoryTypes/noticeCategories/").add({
          category: value.category,
          description: value.description
      });
  }

  // Adding new news category by creating a new document and assigning the values to firestore database
  addNewNewsCategory(value){
    this.fireStore.collection("categories/categoryTypes/newsCategories/").add({
        category: value.category,
        description: value.description
    });
  }
  
  
  // Publishing new notice by adding the details to the firestore database
  createNewNotice(record) {
    return this.fireStore.collection('Notices').add(record);
  }


  // Searching for registered student details with the user entered nsbm id
  searchRegisteredStudentNSBMId(nsbmStudentId) {
    return this.fireStore.collection("users/userTypes/studentUsers", ref => ref
        .where("nsbmStudentID", "==", nsbmStudentId)).snapshotChanges();
  }

  // Searching for registered student details with the user entered nsbm email address
  searchRegisteredStudentNSBMEmail(nsbmEmailAddress) {
      return this.fireStore.collection("users/userTypes/studentUsers", ref => ref
          .where("Email", "==", nsbmEmailAddress)).snapshotChanges();
  }



  // Searching for registered lecturer details with the user entered nsbm id
  searchRegisteredLecturerNSBMId(nsbmLecturerId) {
      return this.fireStore.collection("users/userTypes/lecturerUsers", ref => ref
          .where("nsbmLecturerId", "==", nsbmLecturerId)).snapshotChanges();
  }

  // Searching for registered lecturer details with the user entered nsbm email address
  searchRegisteredLecturerNSBMEmail(nsbmEmailAddress) {
      return this.fireStore.collection("users/userTypes/lecturerUsers", ref => ref
          .where("nsbmEmailAddress", "==", nsbmEmailAddress)).snapshotChanges();
  }


  // Retrieving published lecture series and their details from the firestore database
  retrievePublishedLectureSeries(userFaculty, value, awardingBodyUniversity, moduleTitle) {
    return this.fireStore.collection("faculties/" + userFaculty + "/lectureSeries/", ref => ref
        .where("degree", "==", value.degreeProgram)
        .where("awardingBodyUniversity", "==", awardingBodyUniversity)
        .where("moduleCode", "==", value.module)
        .where("moduleTitle", "==", moduleTitle)
        .where("batch", "==", value.batch)).snapshotChanges();
  }

  // Retrieving published news from current date to three days before from the firestore database
  retrievePublishedNews(currentDate, dateThreeDaysBeforeCurrentDate){
    return this.fireStore.collection("news", ref => ref
            .where("newsCreatedDateTime", ">=", new Date(dateThreeDaysBeforeCurrentDate))
            .where("newsCreatedDateTime", "<=", new Date(currentDate))
            .orderBy("newsCreatedDateTime", "desc")
    ).snapshotChanges();
  }

  // Retrieving published news for selected date from the firestore database
  retrievePublishedNewsSelectedDate(selectedDate, nextDate){
    return this.fireStore.collection("news", ref => ref 
              .where("newsCreatedDateTime", ">=", new Date(selectedDate))
              .where("newsCreatedDateTime", "<=", new Date(nextDate))
              .orderBy("newsCreatedDateTime", "desc")
    ).snapshotChanges();
  }



  // Retrieving published Lectuers to PO notices from current date to three days before from the firestore database
  retrievePublishedLecturerToPONotice(currentDate, dateThreeDaysBeforeCurrentDate) {
    return this.fireStore.collection("notices/noticeTypes/notices-Lecturers-To-PO/", ref => ref
        .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(dateThreeDaysBeforeCurrentDate))
        .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(currentDate))
        .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
    ).snapshotChanges();
  }

  // Retrieving published PO to Students notices from current date to three days before from the firestore database
  retrievePublishedPOToStudentNotice(currentDate, dateThreeDaysBeforeCurrentDate) {
      return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Students/", ref => ref
          .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(dateThreeDaysBeforeCurrentDate))
          .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(currentDate))
          .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
      ).snapshotChanges();
  }

  // Retrieving published PO to Lectuers notices from current date to three days before from the firestore database
  retrievePublishedPOToLecturerNotice(currentDate, dateThreeDaysBeforeCurrentDate) {
      return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Lecturers/", ref => ref
          .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(dateThreeDaysBeforeCurrentDate))
          .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(currentDate))
          .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
      ).snapshotChanges();
  }




  // Retrieving published Lecturers to PO notices for the selected date from the firestore database
  retrievePublishedLecturerToPONoticeSelectedDate(selectedDate, nextDate) {
    return this.fireStore.collection("notices/noticeTypes/notices-Lecturers-To-PO/", ref => ref
        .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(selectedDate))
        .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(nextDate))
        .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
    ).snapshotChanges();
  }

  // Retrieving published PO to Students notices for the selected date from the firestore database
  retrievePublishedPOToStudentNoticeSelectedDate(selectedDate, nextDate) {
      return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Students/", ref => ref
          .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(selectedDate))
          .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(nextDate))
          .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
      ).snapshotChanges();
  }

  // Retrieving published PO to Lecturers notices for the selected date from the firestore database
  retrievePublishedPOToLecturerSelectedDate(selectedDate, nextDate) {
      return this.fireStore.collection("notices/noticeTypes/notices-PO-To-Lecturers/", ref => ref
          .where("noticeCreated.noticeCreatedDateTime", ">=", new Date(selectedDate))
          .where("noticeCreated.noticeCreatedDateTime", "<=", new Date(nextDate))
          .orderBy("noticeCreated.noticeCreatedDateTime", "desc")
      ).snapshotChanges();
  }



  // Retrieving published lecture sessions and their details from the firestore database
  retrieveAllPublishedLectureSessions(userFaculty) {
    return this.fireStore.collection("faculties/" + userFaculty + "/lectureSessions").snapshotChanges();
  }

  // Retrieving published lecture sessions and their detais from the firestore database for the current date
  retrievePublishedLectureSessionsCurrentDate(userFaculty, currentDate, nextDate) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
            .where("startDateTime", ">=", new Date(currentDate))
            .where("startDateTime", "<=", new Date(nextDate))
            .orderBy("startDateTime")
            ).snapshotChanges();
  }

  // Retrieving published lecture session and their detais from the firestore database for the semester calendar page
  retrievePublishedLectureSessionsSemesterCalendar(userFaculty, value, awardingBodyUniversity) {
    return this.fireStore.collection("faculties/" + userFaculty + "/lectureSessions/", ref => ref
        .where("batch", "==", value.batch)
        .where("degree", "==", value.degreeProgram)
        .where("awardingBodyUniversity", "==", awardingBodyUniversity)
        .where("academicYear", "==", parseInt(value.academicPeriodYear)) /* ( parseInt() ) Converting value data type from the form, string to int */
        .where("academicSemester", "==", parseInt(value.academicPeriodSemester)))
        .snapshotChanges();
  }

  // Retrieving published lecture session and their detais from the firestore database for the lecture schedule page
  retrievePublishedLectureSessionsLectureSchedule(userFaculty, currentDate, nextDate) {
    return this.fireStore.collection("faculties/"+ userFaculty +"/lectureSessions", ref => ref
              .where("startDateTime", ">=", new Date(currentDate))
              .where("startDateTime", "<=", new Date(nextDate))
              ).snapshotChanges();
  }

  // Retrieving published ACTIVE module credits weighting and their details from the firestore database
  retrievePublishedModuleCreditsWeightingActive() {
    return this.fireStore.collection("noOfModuleCreditsWeighting", ref => ref
        .where("status", "==", "Active")).snapshotChanges();
  }

  // Retrieving the moduleTitle from the selected module title from the firestore database
  retrievingModuleTitleOfModuleCode(moduleCode, userFaculty) {
    return this.fireStore.collection("faculties/" + userFaculty + "/modules", ref => ref
        .where("moduleCode", "==", moduleCode)).snapshotChanges();
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
    return this.fireStore.collection("sessionStatuses", ref => ref
            .orderBy("status")
            ).snapshotChanges();
  }

  // Retrieving published user account statuses and their details from the firestore database
  retrievePublishedUserStatuses() {
    return this.fireStore.collection("userStatuses", ref => ref
            .orderBy("status")
            ).snapshotChanges();
  }


  // Retrieving published notice categories and their details from the firestore database
  retrievePublishedNoticeCategories() {
    return this.fireStore.collection("categories/categoryTypes/noticeCategories", ref => ref
          .orderBy("category")
          ).snapshotChanges();
  }

  // Retrieving published news categories and their details from the firestore database
  retrievePublishedNewsCategories(){
    return this.fireStore.collection("categories/categoryTypes/newsCategories", ref => ref
            .orderBy("category")
            ).snapshotChanges();
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

  // Retrieving the awardingBodyUniversity from the selected degree from the firestore database
  retrievingAwardingBodyUniversityOfDegree(degree, userFaculty) {
    return this.fireStore.collection("faculties/" + userFaculty + "/degreePrograms", ref => ref
        .where("degree", "==", degree)).snapshotChanges();
  }

  // Updating account details of logged in program office user by updating the document in the firestore database
  updateProgramOfficeUser(value, docId){
    return new Promise<any>((resolve, reject) => {
        this.fireStore.doc("/users/userTypes/programOfficeUsers/"+ docId).update({
            name: {
                prefix: value.prefixName,
                firstName: value.firstName,
                middleName: value.middleName,
                lastName: value.lastName
            },
            faculty: value.faculty
        })
        .then(response => resolve(response),
            error => reject(error))
    });  
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

  // Removing PO to Students notice from the firestore database
  removePublishedPOTOStudentsNotice(docId){
    this.fireStore.doc("notices/noticeTypes/notices-PO-To-Students/"+ docId).delete();
  }

  // Removing PO to Lecturers notice from the firestore database
  removePublishedPOTOLecturersNotice(docId){
    this.fireStore.doc("notices/noticeTypes/notices-PO-To-Lecturers/"+ docId).delete();
  }

  //Removing degree program fron the firestore database
  removeDegreeProgram(docId, userFaculty) {
    return this.fireStore.doc("faculties/" + userFaculty + "/degreePrograms/" + docId).delete();
  }

  // Removing published batch from the firestore database
  removeBatch(docId, userFaculty){
      return this.fireStore.doc("faculties/"+ userFaculty +"/batches/"+ docId).delete();
  }

  // Removing published credit weighting from the firestore database
  removeCreditWeighting(docId){
      return this.fireStore.doc("noOfModuleCreditsWeighting/"+ docId).delete();
  }

  // Removing published lecture hall from the firestore database
  removeLectureHall(docId, userFaculty){
      return this.fireStore.doc("faculties/"+ userFaculty +"/lectureHalls/"+ docId).delete();
  }

  // Removing published session status from the firestore database
  removeSessionStatus(docId){
      return this.fireStore.doc("sessionStatuses/"+ docId).delete();
  }

  // Removing published user account status from the firestore database
  removeUserAccountStatus(docId){
      return this.fireStore.doc("userStatuses/"+ docId).delete();
  }

  // Removing published notice category from the firestore database
  removeNoticeCategory(docId){
      return this.fireStore.doc("categories/categoryTypes/noticeCategories/"+ docId).delete();
  }

  // Removing published news category from the firestore database
  removeNewsCategory(docId){
    return this.fireStore.doc("categories/categoryTypes/newsCategories/"+ docId).delete();
  }

  // Removing published lecture series from the firestore database
  removeLectureSeries(docId, userFaculty){
    return this.fireStore.doc("faculties/"+ userFaculty +"/lectureSeries/"+ docId).delete();
  }



  // Disabling the user acount by updating user account status to 'disabled' in the firestore database
  disableUserAccount(userType, docId) {
    return this.fireStore.doc("users/userTypes/" + userType + "/" + docId).update({
        status: "Disabled"
    }).then(function () {
        console.log("User Account has been disabled");
    });
  }

  // Enabling the user acount by updating user account status to 'disabled' in the firestore database
  enableUserAccount(userType, docId) {
    return this.fireStore.doc("users/userTypes/" + userType + "/" + docId).update({
        status: "Active"
    }).then(function () {
        console.log("User Account has been disabled");
    });
  } 


}
