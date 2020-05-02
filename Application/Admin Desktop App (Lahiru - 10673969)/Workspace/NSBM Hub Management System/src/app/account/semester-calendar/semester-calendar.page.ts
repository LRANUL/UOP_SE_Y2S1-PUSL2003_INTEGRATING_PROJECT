import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';



import { EditLectureSessionModalPage } from './edit-lecture-session-modal/edit-lecture-session-modal.page';
import { MoreDetailsSessionPopoverPage } from './more-details-session-popover/more-details-session-popover.page';

import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { EditLectureSeriesModalPage } from './edit-lecture-series-modal/edit-lecture-series-modal.page';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-semester-calendar',
  templateUrl: './semester-calendar.page.html',
  styleUrls: ['./semester-calendar.page.scss'],
})
export class SemesterCalendarPage implements OnInit {

  // Setting min validation for angular material calendar
  minDate: Date;

  // Setting max validation for angular material calendar
  maxDate: Date;
  
  searchSemesterCalendar: FormGroup;

  assignNewLectureSlotSC: FormGroup;

  createNewLectureSeriesForm: FormGroup;

  searchLectureSeriesForm: FormGroup;

  loadingSpinnerPLS: Boolean = false;

  showPublishedLectureSeries: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private semesterCalendarService: FirestoreService
  ) { 

    // Retrieving current date and setting as min data
    this.minDate = new Date();

    // Retrieving the current year
    const currentYear = new Date().getFullYear();
    // Setting the max date december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);
  }

  ngOnInit() {

    // Calling the functions in order for them to execute upon page load
    this.retrievePublishedBatch();

    this.retrievePublishedDegreeProgram();

    this.retrieveRegisteredModules();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHalls();

    this.retrievePublishedSessionStatuses();


    this.searchSemesterCalendar = this.formBuilder.group({
      batch: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicPeriodYear: new FormControl('', Validators.required),
      academicPeriodSemester: new FormControl('', Validators.required)
    });

    this.assignNewLectureSlotSC = this.formBuilder.group({
      batch: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicPeriodYear: new FormControl('', Validators.required),
      academicPeriodSemester: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      lecturer: new FormControl('', Validators.required),
      lectureHall: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      addLectureContentLoadOption: new FormControl('', Validators.required),
      sessionDateSingle: new FormControl(''),
      sessionStartTimeSingle: new FormControl(''),
      sessionEndTimeSingle: new FormControl(''),
      sessionDayMultiple: new FormControl(''),
      sessionStartDateMultiple: new FormControl(''),
      sessionEndDateMultiple: new FormControl(''),
      sessionStartTimeMultiple: new FormControl(''),
      sessionEndTimeMultiple: new FormControl('')
    });
    
    this.createNewLectureSeriesForm = this.formBuilder.group({
      degreeProgram: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      noOfLectures: new FormControl('', Validators.required),
      enrollmentKey: new FormControl('', Validators.required)
    });

    this.searchLectureSeriesForm = this.formBuilder.group({
      degreeProgram: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required)
    });

  }

  
  // Opening notifications popover
  async openNotificationPopover(ev: Event){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: NotificationsPopoverPage,
      componentProps: {
        loggedInUserId: this.sideMenuPageUserFaculty.passUserId()
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
  }


  // Retrieving the published batch from the firestore database
  publishedBatches;
  retrievePublishedBatch = () => {
    this.semesterCalendarService.retrievePublishedBatch(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedBatches = response));
  }

  
  // Retrieving the published degree programs and details from the firestore database
  publishedDegreePrograms;
  retrievePublishedDegreeProgram = () => {
    this.semesterCalendarService.retrievePublishedDegreeProgram(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedDegreePrograms = response));
  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }

  // Retrieving the published modules from the firestore database
  publishedModules;
  retrieveRegisteredModules = () => 
    this.semesterCalendarService.retrieveRegisteredModules(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedModules = response));
  
  // Retrieving the registered lecturers from the firestore database
  registeredLecturers;
  retrieveRegisteredLecturers = () => 
    this.semesterCalendarService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturers = response));

  // Retrieving published lecture halls from the firestore database
  publishedLectureHalls;
  retrievePublishedLectureHalls = () =>
    this.semesterCalendarService.retrievePublishedLectureHalls(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedLectureHalls = response));

  // Retrieving published session statuses from the firestore database
  publishedSessionStatuses;
  retrievePublishedSessionStatuses = () =>
    this.semesterCalendarService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));


  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();

  }


  numberOfLectureSessions;
  
  publishedLectureSlots;

  userSelectedAwardingBodyUniversity;


  publishedModuleTitleOfModuleCode;
  moduleTitle;

  async retrieveModuleTitle(event){
    console.log(event.detail.value);
    // Retrieving the module title of the selected module code
    this.semesterCalendarService.retrievingModuleTitleOfModuleCode(event.detail.value, this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedModuleTitleOfModuleCode =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.moduleTitle = firestoreDoc.moduleTitle;
        console.log(this.moduleTitle);
      })
    ));

  }




  publishedAwardingBodyUniversityOfDegree;
  awardingBodyUniversity;
  degreeCode;

  async retrieveAwardingBodyUniversity(event){

    // Retrieving the awardingBody University of the selected degree
    this.semesterCalendarService.retrievingAwardingBodyUniversityOfDegree(event.detail.value, this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedAwardingBodyUniversityOfDegree =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.awardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.degreeCode = firestoreDoc.degreeCode;
        console.log(this.awardingBodyUniversity);
        console.log(this.degreeCode);
      })
    ));

  }

  // Retrieving published lecture sessions
  doSearchSemesterCalendar(value){

    this.loadingSpinnerPLS = true;



    console.log(value);

    console.log(value.batch);

    console.log(value.degreeProgram);

    console.log(value.academicYearYear);
    console.log(value.academicYearSemester);

    
    
    // Calling function to retrieve the published lecture sessions from the firestore database
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity).subscribe(response => {
      // Checking if any document values where returned
      if (response.length > 0){
        
        this.eventSourcePSCalendar = []; // Clearing the existing events on the calendar before syncing 
        response.forEach(snap => {
          let eventPSCalendar:any = snap.payload.doc.data();
          eventPSCalendar.id = snap.payload.doc.id;
          eventPSCalendar.title = eventPSCalendar.moduleCode + "-" + eventPSCalendar.moduleTitle + " | Status: " + eventPSCalendar.status;
          eventPSCalendar.startTime = eventPSCalendar.startDateTime.toDate();
          eventPSCalendar.endTime = eventPSCalendar.endDateTime.toDate();

          console.log(eventPSCalendar);

          this.eventSourcePSCalendar.push(eventPSCalendar);
        });
        
        this.alertNotice("Lecture Sessions Retrieval", "Available lecture sessions for this semester calendar are placed on the calendar.");

        console.log("Semester Calendar Record Found");
      }
      else{
        this.alertNotice("Not Found", "Lecture sessions for this semester calendar is not available");
        console.log("Semester Calendar Record Found");
      }
    }, error => {
      console.log("Error: " + error);
      this.alertNotice("Error", "An error has occurred: " + error);
    });
  
    // Calling function to retrieve the lecture sessions and setting loading dots to false after the contents has loaded.
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity).subscribe(() => this.loadingSpinnerPLS = false);


  }



  // More details of lecture sessions popover
  async moreDetailsLectureSession(ev: Event, value){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsSessionPopoverPage,
      componentProps: {
        lectureSessionId: value.id,
        batch: value.batch,
        lecturer: value.lecturer,
        lectureHall: value.lectureHall,
        degreeCode: value.degreeCode,
        degree: value.degree,
        awardingBodyUniversity: value.awardingBodyUniversity,
        academicPeriodYear: value.academicYear,
        academicPeriodSemester: value.academicSemester
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
    
  }


  // Editing lecture sessions modal calling, opening modal
  async editLectureSession(value){
    console.log(value);

    const editLectureSessionModal = await this.modalController.create({
      component: EditLectureSessionModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        lectureSessionId: value.id,
        lectureSessionBatch: value.batch,
        lectureSessionDegreeProgram: value.degreeProgram,
        lectureSessionAcademicYear: value.academicYear,
        lectureSessionAcademicSemester: value.academicSemester,
        lectureSesionModuleCode: value.moduleCode,
        lectureSessionModuleTitle: value.moduleTitle,
        lectureSessionStartDateTime: value.startTime,
        lectureSessionEndDateTime: value.endTime,
        lectureSessionLecturer: value.lecturer,
        lectureSessionLectureHall: value.lectureHall,
        lectureSessionStatus: value.status,
        userFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editLectureSessionModal.present();
  }


  // Confirm Box Implementation (Remove existing lecture session)
  async removeLectureSession ( title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Event Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Event Session Request Accepted");

            // Calling function to remove lecture session
            this.semesterCalendarService.removeLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value);

          }
        }

      ]
    });
    await alert.present();
  }

  userSelectedOption;
  userSelectionLectureAssignIndividually: Boolean = false;
  userSelectionLectureAssignGroup: Boolean = false;

  // Load form content depending on assigning eah lecture session individually or in a group 
  async loadFormContent(event){

    this.userSelectedOption = event.detail.value;

    this.userSelectionLectureAssignIndividually = false;

    this.userSelectionLectureAssignGroup = false;
    
    console.log("Response: " + event.detail.value);

    if(this.userSelectedOption == "lectureAssignIndividually"){
      this.userSelectionLectureAssignIndividually = true;
    }
    else if(this.userSelectedOption == "lectureAssignGroup"){
      this.userSelectionLectureAssignGroup = true;
    }
  }


  // Reseting lecture session start and end date angular material calendar
  resetSessionStartEndDate(value){

    if (value.detail.value != "") {
      this.assignNewLectureSlotSC.controls['sessionStartDateMultiple'].setValue(null);
      this.assignNewLectureSlotSC.controls['sessionEndDateMultiple'].setValue(null);
    }

  }

  // Reseting lecture session end date angular material calendar
  resetSessionEndDate(event: MatDatepickerInputEvent<Date>) {
    if(event.value != null){
      this.assignNewLectureSlotSC.controls['sessionEndDateMultiple'].setValue(null);
    }
  }


  // Confirm Box Implementation (Publish lecture session)
  async publishLectureSession (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Published Lecture Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Published Lecture Session Request Accepted");

            this.doPublishLectureSlotSC(value);
          }
        }
      ]
    });
    await alert.present();
  }

  // (Publishing new lecture sessions section) and retrieving the newly published lecture sessions 
  doPublishLectureSlotSC(value){


    if(value.addLectureContentLoadOption == "lectureAssignIndividually"){
      // If user selects 'lectureAssignIndividually' option

      // Extracting month, date and year from selected lecture session date, sample format - 04/30/2020
      // Month has to be incremented by one because the month range is retrieve by - 0-11
      let lectureSessionDate = (new Date(value.sessionDateSingle).getMonth()+1) + "/" + new Date(value.sessionDateSingle).getDate() + "/" + new Date(value.sessionDateSingle).getFullYear();

      // Merging lecture session date and lecture session start time into date format
      let lectureSessionStartDateTime = new Date(lectureSessionDate + " " + value.sessionStartTimeSingle);

      // Merging lecture session date and lecture session end time into date format
      let lectureSessionEndDateTime = new Date(lectureSessionDate + " " + value.sessionEndTimeSingle);

      // Adding the lecture session details into the firestore database
      this.semesterCalendarService.addNewLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.degreeCode, this.awardingBodyUniversity, 
        this.moduleTitle, lectureSessionStartDateTime, lectureSessionEndDateTime)
        .then(success => {
          this.alertNotice("Lecture Session Published", "New Lecture Session has been published.");
        }, error => {
          console.log("Error: " + error);
          this.alertNotice("ERROR", "Error has occurred: " + error);
      });
    }
    else if(value.addLectureContentLoadOption == "lectureAssignGroup"){
      // If user selects 'lectureAssignGroup' option

      // Retrieving the user selected day value, ranging from 1 to 7 (Sunday to Saturday)
      let userSelectedDay = value.sessionDayMultiple;

      // Retieving the user selected session start date
      let userSelectedSessionStartDate = value.sessionStartDateMultiple;

      // Retrieving day value of the user selected session start date
      let userSelectedSessionStartDateDay = (userSelectedSessionStartDate.getDay() + 1);

      let firstSessionDateTime;

      let firstSessionDateTimeUnix;

      // Checking if user selected day value is equal to the day value of the user selected session start date 
      if(userSelectedDay == userSelectedSessionStartDateDay){
        firstSessionDateTime = userSelectedSessionStartDate;
      }
      else if(userSelectedDay != userSelectedSessionStartDateDay){
        // For looping identifying the next date for the user selected day value
        // Will be running seven loops until day value is found
        for (let index = 0; index < 7; index++) {
          // Retieving the date value (1 - 31) and increment it by one 
          // This will be assigned to the user selected session start datetime value
          userSelectedSessionStartDate.setDate(userSelectedSessionStartDate.getDate() + 1);

          // Retriving the current day value of the user selected session start datetime value and incrementing it by one
          // Because value is in range from 0-6 (Sunday to Saturday)
          let currentDayValue = (userSelectedSessionStartDate.getDay() + 1);

          // Checking if the user selected day value is equal to the iteration day value
          if(currentDayValue == userSelectedDay){

            firstSessionDateTime = userSelectedSessionStartDate;

            // Exiting the for loop if the user selected day value is equal to the iteration day value
            break;
          }
        }
      }

      // Extracting the UNIX timpastamp - no of seconds from the firstSessionDateTime
      firstSessionDateTimeUnix = firstSessionDateTime.getTime();
      
      // Retrieving the user selected session end date
      let userSelectedSessionEndDate = value.sessionEndDateMultiple;

      // Extracting the unix timestamp from the selected session end date
      let sessionEndDateTimeUnix = userSelectedSessionEndDate.getTime();

      let sessionPeriodTimeDifference;

      // Getting the count of seconds within the session period
      if(sessionEndDateTimeUnix > firstSessionDateTimeUnix){
        sessionPeriodTimeDifference = (sessionEndDateTimeUnix - firstSessionDateTimeUnix);
      }

      // Converting the number of session period seconds to days
      let sessionPeriodNoOfDays = (sessionPeriodTimeDifference / (1000 * 60 * 60 * 24));

      // Dividing the no of days by seven to extract the number of session within the session period
      let noOfSessions = sessionPeriodNoOfDays / 7;

      let lecturePublicationCount = 0;

      // Running a for loop untill the number of sessions with one addtional to iterate for the final week of the session period
      for (let index = 0; index <= noOfSessions; index++) {

        // Checking if the iterating session value is greater than the user selected session end date, 
        // If equal - for loop will  be exited
        // Else if - lecture sessions will be published with the entered details for the session period 
        if(firstSessionDateTime > userSelectedSessionEndDate){
          break;
        }
        else{
          // Extracting month, date and year from iterating lecture session date, sample format - 04/30/2020
          // Month has to be incremented by one because the month range is retrieve by - 0-11
          let lectureSessionDate = (new Date(firstSessionDateTime).getMonth()+1) + "/" + new Date(firstSessionDateTime).getDate() + "/" + new Date(firstSessionDateTime).getFullYear();

          // Merging lecture session date and user selected lecture session start time into date format
          let lectureSessionStartDateTime = new Date(lectureSessionDate + " " + value.sessionStartTimeMultiple);

          // Merging lecture session date and user selected lecture session end time into date format
          let lectureSessionEndDateTime = new Date(lectureSessionDate + " " + value.sessionEndTimeMultiple);

          // Adding the lecture session details into the firestore database
          this.semesterCalendarService.addNewLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.degreeCode, this.awardingBodyUniversity, 
            this.moduleTitle, lectureSessionStartDateTime, lectureSessionEndDateTime)
            .then(success => {
              lecturePublicationCount++;
            }, error => {
              console.log("Error: " + error);
              this.alertNotice("ERROR", "Error has occurred: " + error);
          });
        }

        if(lecturePublicationCount == (noOfSessions+1)){
          this.alertNotice("Lecture Sessions Published", "New Lecture Sessions have been published. Check the 'Active Calander'.");
        }
        else if(lecturePublicationCount != (noOfSessions+1)){
          this.alertNotice("ERROR", "Error has occurred. Not all lecture sessions were created.");
        }

        // Incrementing the days by seven days to retrieve lecture session date for every week of the session period
        firstSessionDateTime.setDate(firstSessionDateTime.getDate() + 7);
      }


    }

    // Calling function to retrieving the lecture sessions for this degree program, batch, academic period year and academic period semester from the firestore database
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity).subscribe(activeLectureSlots => {
      this.eventSourceASCalendar = []; // Clearing the existing lecture sessions on the calendar before syncing 
      activeLectureSlots.forEach(snap => {
        console.log("Event " + activeLectureSlots);
        let eventASCalendar:any = snap.payload.doc.data();
        eventASCalendar.id = snap.payload.doc.id;
        eventASCalendar.title = eventASCalendar.moduleCode + "-" + eventASCalendar.moduleTitle + " | Status: " + eventASCalendar.status;
        eventASCalendar.startTime = eventASCalendar.startDateTime.toDate();
        eventASCalendar.endTime = eventASCalendar.endDateTime.toDate();

        this.eventSourceASCalendar.push(eventASCalendar);
      });
    });
    
  }


  



  // Resetting search assigned semester calendar
  resetSearchAssignedSemesterCalendar(){

    // Resetting formControlGroup
    this.searchSemesterCalendar.reset();

    // Resetting calendar
    this.eventSourcePSCalendar = []; 

  }

  // Resetting assign semester calendar
  resetAssignSemesterCalendar(){
    // Resetting formControlGroup
    this.assignNewLectureSlotSC.reset();

    // Resetting calendar
    this.eventSourceASCalendar = []; 
  }



  // Process of adding a new lecture series
  doCreateNewLectureSeries(value){

    this.semesterCalendarService.createNewLectureSeries(value, this.sideMenuPageUserFaculty.passUserFaculty(), this.awardingBodyUniversity, this.moduleTitle);

    this.alertNotice("Lecture Series Created", "New Lecture Series has been created.");

  }

  // Resetting create new lecture series form
  resetCreatedLectureSeries(){

    this.createNewLectureSeriesForm.reset();

    this.publishedLectureSeries = "";
  }

  


  publishedLectureSeries;

  // Process of searching published lecture series 
  doSearchLectureSeries(value){

    console.log(value);
    console.log(this.awardingBodyUniversity);
    console.log(this.moduleTitle);

    this.semesterCalendarService.retrievePublishedLectureSeries(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity, this.moduleTitle).subscribe(response => {
        // Checking if any document values where returned
        if (response.length > 0){

          this.showPublishedLectureSeries = true;
          
          this.publishedLectureSeries = response;

          console.log("Lecture Series Record Found");
        }
        else{
          this.alertNotice("Not Found", "Lecture Series Record is not available");
          console.log("Lecture Series Record Not Found");
        }
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
      });
  }

  // Resetting search lecture series form
  resetSearchCreatedLectureSeries(){

    this.searchLectureSeriesForm.reset();

    this.showPublishedLectureSeries = false;

  }


  // Editing lecture series modal calling, opening modal
  async editLectureSeries(value){
    const editLectureSeriesModal = await this.modalController.create({
      component: EditLectureSeriesModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        lectureSeriesDocId: value.payload.doc.id,
        lectureSeriesNoOfLecturers: value.payload.doc.data().noOfLectures,
        lectureSeriesEnrollmentKey: value.payload.doc.data().enrollmentKey,
        loggedInUserFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editLectureSeriesModal.present();
  }


  // Confirm Box Implementation (Remove existing lecture series)
  async removeLectureSeries ( title: string, content: string, value) {

    let lectureSeriesDocId = value.payload.doc.id;

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Lecture Series Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Lecture Series Request Accepted");

            // Calling function to remove lecture series
            this.semesterCalendarService.removeLectureSeries(lectureSeriesDocId, this.sideMenuPageUserFaculty.passUserFaculty());

            this.showPublishedLectureSeries = false;
          }
        }
      ]
    });
    await alert.present();
  }

  


  // Declaring an array to initialize the number of events (lecture sessions) and their details
  lectureSessionsDocuments = [];

  // Published Semester Calendar
  eventSourcePSCalendar;
  viewingMonthPSCalendar;

  calendarPSCalendar = {
    mode: 'month',
    currentDate: new Date()
  }

  selectedDate = new Date();

  nextMonthPSCalendar(){
    var frontSwipePSCalendar = document.getElementById('publishedSemesterCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipePSCalendar.slideNext();
  }

  previousMonthPSCalendar(){
    var backSwipePSCalendar = document.getElementById('publishedSemesterCalendar').querySelector('.swiper-container')['swiper'];
    backSwipePSCalendar.slidePrev();
  }

  onViewTitleChangedPSCalendar(title){
  //  console.log(title);
    this.viewingMonthPSCalendar = title; 
  }

  onEventSelectedPSCalendar(event) {
  //  console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title); 
  }

  onTimeSelectedPSCalendar(event){
  //  console.log("Lecture Session Selected Time: " + event.selectedTime + ", has sessions: " + (event.events !== undefined && event.events.length !== 0) +
  //    ", disabled: " + event.disabled);

      if((event.events !== undefined && event.events.length !== 0) == false){
        this.lectureSessionsDocuments = [];
      }
      else if ((event.events !== undefined && event.events.length !== 0) == true){
        this.lectureSessionsDocuments = event.events;
      }
  //    console.log(this.lectureSessionsDocuments);
  }

  onCurrentDateChangedPSCalendar(event: Date){
  //  console.log("Current Lecture Session Date Change: " + event);

    this.lectureSessionsDocuments = [];
  }

  onRangeChangedPSCalendar(evt) {
  //  console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


  




  // Active Semester Calendar
  eventSourceASCalendar;
  viewingMonthASCalendar;

  calendarASCalendar = {
    mode: 'month',
    currentDate: new Date()
  }

  nextMonthASCalendar(){
    var frontSwipeASCalendar = document.getElementById('activeSemesterCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeASCalendar.slideNext();
  }

  previousMonthASCalendar(){
    var backSwipeASCalendar = document.getElementById('activeSemesterCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeASCalendar.slidePrev();
  }

  onViewTitleChangedASCalendar(title){
    this.viewingMonthASCalendar = title; 
  }

  onEventSelectedASCalendar(event) {
  //  console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedASCalendar(evt){
  //  console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
  //    ", disabled: " + evt.disabled);
  }

  onCurrentDateChangedASCalendar(event: Date){
  //  console.log("Current Lecture Session Date Change: " + event);
  }

  onRangeChangedASCalendar(evt) {
  //  console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


}
