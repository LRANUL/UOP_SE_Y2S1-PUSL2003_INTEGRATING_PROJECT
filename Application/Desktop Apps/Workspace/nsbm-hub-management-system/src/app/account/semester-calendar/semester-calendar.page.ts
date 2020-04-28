import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';



import { EditLectureSessionModalPage } from './edit-lecture-session-modal/edit-lecture-session-modal.page';
import { MoreDetailsSessionPopoverPage } from './more-details-session-popover/more-details-session-popover.page';

import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { EditLectureSeriesModalPage } from './edit-lecture-series-modal/edit-lecture-series-modal.page';

@Component({
  selector: 'app-semester-calendar',
  templateUrl: './semester-calendar.page.html',
  styleUrls: ['./semester-calendar.page.scss'],
})
export class SemesterCalendarPage implements OnInit {

  
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
  ) { }

  ngOnInit() {

    // Calling the functions inorder for them to execute upon page load
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

  // Retriving published lecture sessions
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
  
    // Calling function to retrive the lecture sessions and setting loading dots to false after the contents has loaded.
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
    
    console.log("Reponse: " + event.detail.value);

    if(this.userSelectedOption == "lectureAssignIndividaully"){
      this.userSelectionLectureAssignIndividually = true;
    }
    else if(this.userSelectedOption == "lectureAssignGroup"){
      this.userSelectionLectureAssignGroup = true;
    }

  }

  


  // (Publishing new lecture sessions section) and retrieving published lecture sessions 
  doPublishLectureSlotSC(value){

    // Retrieving selected session date
    // Mon Apr 20 2020 10:13:54 GMT+0530 (India Standard Time)
    let selectedSessionDateTime = new Date(value.sessionDateSingle);

    let selectedSessionDate = selectedSessionDateTime.getFullYear() + "-" + selectedSessionDateTime.getMonth() + "-" + selectedSessionDateTime.getDate();
    console.log(selectedSessionDate);
    // Retrieving selected session start time
    // Mon Apr 20 2020 09:07:54 GMT+0530 (India Standard Time)
    let selectedSessionStartTime = new Date(value.sessionStartTimeSingle);

    // Retrieving selected session end time
    // Mon Apr 20 2020 12:02:54 GMT+0530 (India Standard Time)
    let selectedSessionEndTime = new Date(value.sessionEndTimeSingle);

    // taking the sesion date and session start time and merging them together. Assign this value to a variable
    // Mon Apr 20 2020 09:07:00 GMT+0530 (India Standard Time)
    let selectedSessionStartDateTime = new Date(selectedSessionDateTime.getFullYear(), selectedSessionDateTime.getMonth(), selectedSessionDateTime.getDate(), 
      selectedSessionStartTime.getHours(), selectedSessionStartTime.getMinutes(), 0, 0);
    
      // taking the sesion date and session end time and merging them together. Assign this value to a variable
    // Mon Apr 20 2020 12:02:00 GMT+0530 (India Standard Time)
    let selectedSessionEndDateTime = new Date(selectedSessionDateTime.getFullYear(), selectedSessionDateTime.getMonth(), selectedSessionDateTime.getDate(), 
      selectedSessionEndTime.getHours(), selectedSessionEndTime.getMinutes(), 0, 0);

     
      
    if(value.addLectureContentLoadOption == "lectureAssignIndividaully"){
      // If user selects 'lectureAssignIndividaully' option

      // Adding the lecture session details into the firestore database
      this.semesterCalendarService.addNewLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.degreeCode, this.awardingBodyUniversity, this.moduleTitle, selectedSessionStartDateTime, selectedSessionEndDateTime);
      
      this.alertNotice("Lecture Session Added", "New Lecture Session has been added.");


    }
    else if(value.addLectureContentLoadOption == "lectureAssignGroup"){
      // If user selects 'lectureAssignGroup' option

    }

    // Calling function to retrieving the lecture sessions for this degree program, batch, academic period year and academic period semester from the firestore database
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity).subscribe(activeLectureSlots => {
      this.eventSourceASCalendar = []; // Clearing the existing lecture sessions on the calendar before syncing 
      activeLectureSlots.forEach(snap => {
        let eventASCalendar:any = snap.payload.doc.data();
        eventASCalendar.id = snap.payload.doc.id;
        eventASCalendar.title = eventASCalendar.moduleCode + "-" + eventASCalendar.moduleTitle + "\n | Status: " + eventASCalendar.status;
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
    console.log(title);
    this.viewingMonthPSCalendar = title; 
  }

  onEventSelectedPSCalendar(event) {
    console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title); 
  }

  onTimeSelectedPSCalendar(event){
    console.log("Lecture Session Selected Time: " + event.selectedTime + ", has sessions: " + (event.events !== undefined && event.events.length !== 0) +
      ", disabled: " + event.disabled);

      if((event.events !== undefined && event.events.length !== 0) == false){
        this.lectureSessionsDocuments = [];
      }
      else if ((event.events !== undefined && event.events.length !== 0) == true){
        this.lectureSessionsDocuments = event.events;
      }
      console.log(this.lectureSessionsDocuments);
  }

  onCurrentDateChangedPSCalendar(event: Date){
    console.log("Current Lecture Session Date Change: " + event);

    this.lectureSessionsDocuments = [];
  }

  onRangeChangedPSCalendar(evt) {
    console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


  




  // Active Semester Calendar
  eventSourceASCalendar;
  viewingMonthASCalendar;

  calendarASCalendar = {
    mode: 'month',
    currentDate: new Date()
  }

  nextMonthASCalendar(){
    var frontSwipeASCalendar = document.getElementById('EventCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeASCalendar.slideNext();
  }

  previousMonthASCalendar(){
    var backSwipeASCalendar = document.getElementById('EventCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeASCalendar.slidePrev();
  }

  onViewTitleChangedASCalendar(title){
    console.log(title);
    this.viewingMonthASCalendar = title; 
  }

  onEventSelectedASCalendar(event) {
    console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedASCalendar(evt){
    console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
      ", disabled: " + evt.disabled);
  }

  onCurrentDateChangedASCalendar(event: Date){
    console.log("Current Lecture Session Date Change: " + event);
  }

  onRangeChangedASCalendar(evt) {
    console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


}
