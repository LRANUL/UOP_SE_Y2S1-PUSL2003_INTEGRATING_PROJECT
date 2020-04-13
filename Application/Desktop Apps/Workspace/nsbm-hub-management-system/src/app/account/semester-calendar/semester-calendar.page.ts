import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';



import { EditLectureSessionModalPage } from './edit-lecture-session-modal/edit-lecture-session-modal.page';
import { MoreDetailsSessionPopoverPage } from './more-details-session-popover/more-details-session-popover.page';

import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-semester-calendar',
  templateUrl: './semester-calendar.page.html',
  styleUrls: ['./semester-calendar.page.scss'],
})
export class SemesterCalendarPage implements OnInit {

  searchSemesterCalendar: FormGroup;

  assignNewLectureSlotSC: FormGroup;

  loadingSpinnerPLS: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private semesterCalendarService: FirestoreService
  ) {


  }



  ngOnInit() {

    // Calling the functions inorder for them to execute upon page load
    this.retrievePublishedBatch();

    this.retrievePublishedDegreeProgram();


    this.publishedLecureSlots;


    this.searchSemesterCalendar = this.formBuilder.group({
      batch: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicYearYear: new FormControl('', Validators.required),
      academicYearSemester: new FormControl('', Validators.required)
    });

    this.assignNewLectureSlotSC = this.formBuilder.group({
      batch: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicYearYear: new FormControl('', Validators.required),
      academicYearSemester: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      lecturer: new FormControl('', Validators.required),
      lectureHall: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      sessionDateSingle: new FormControl('', Validators.required),
      sessionStartTimeSingle: new FormControl('', Validators.required),
      sessionEndTimeSingle: new FormControl('', Validators.required),
      sessionDayMultiple: new FormControl('', Validators.required),
      sessionStartDateMultiple: new FormControl('', Validators.required),
      sessionEndDateMultiple: new FormControl('', Validators.required),
      sessionStartTimeMultiple: new FormControl('', Validators.required),
      sessionEndTimeMultiple: new FormControl('', Validators.required)
    });

  }

  // Retrieving the published batch from the firestore database
  publishedBatches;

  retrievePublishedBatch = () => {
    this.semesterCalendarService.retrievePublishedBatch(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedBatches = response));
  }


  // Retrieving the published degree programs and details from the firestore database
  publishedDegreePrograms;

  publishedDegreeProgramDegree;
  publishedDegreeProgramAwardingBodyUniversity;
  publishedDegreeProgramNoOfYears
  publishedDegreeProgramNoOfSemestersAnnaully;

  retrievePublishedDegreeProgram = () => {
    this.semesterCalendarService.retrievePublishedDegreeProgram(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedDegreePrograms = 
       response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.publishedDegreeProgramDegree = firestoreDoc.degree;
        this.publishedDegreeProgramAwardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.publishedDegreeProgramNoOfYears = firestoreDoc.deliveryNoOfYears;
        this.publishedDegreeProgramNoOfSemestersAnnaully = firestoreDoc.deliveryNoOfSemestersAnnually;
      })
    ));
  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }



  // Alert Box Implementation
  async alertnotice ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();

  }


  numberOfLectureSessions;
  

  publishedLecureSlots;

  // Declaring an array to initialize the number of events (lecture sessions) and their ids
  numberOfLectureSessionsDocuments = [];

  userSelectedAwardingBodyUniversity;

  // Retriving published lecture sessions
  doSearchSemesterCalendar(value){

    this.loadingSpinnerPLS = true;

    if(value.degreeProgram == this.publishedDegreeProgramDegree){
      this.userSelectedAwardingBodyUniversity = this.publishedDegreeProgramAwardingBodyUniversity;
    }

    console.log(value.batch);

    console.log(value.degreeProgram);
    console.log(this.publishedDegreeProgramDegree);
    console.log(this.publishedDegreeProgramAwardingBodyUniversity);

    console.log(value.academicYearYear);
    console.log(value.academicYearSemester);

    

    // Calling function to retrieve the published lecture sessions from the firestore database
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.userSelectedAwardingBodyUniversity).subscribe(lectureSlots => {
      this.eventSourcePSCalendar = []; // Clearing the existing events on the calendar before syncing 
      lectureSlots.forEach(snap => {
        let eventPSCalendar:any = snap.payload.doc.data();
        eventPSCalendar.id = snap.payload.doc.id;
        eventPSCalendar.title = eventPSCalendar.moduleCode + "-" + eventPSCalendar.moduleTitle + " | Status: " + eventPSCalendar.status;
        eventPSCalendar.startTime = eventPSCalendar.startDateTime.toDate();
        eventPSCalendar.endTime = eventPSCalendar.endDateTime.toDate();

        console.log(eventPSCalendar);

        this.eventSourcePSCalendar.push(eventPSCalendar);
      });
    });

    // Calling function to retrive the lecture sessions and setting loading dots to false after the contents has loaded.
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.userSelectedAwardingBodyUniversity).subscribe(() => this.loadingSpinnerPLS = false);

    this.alertnotice("Lecture Sessions Retrieval", "Available lecture sessions are placed on the calendar.");
    
  }

  // More details of lecture sessions popover
  async moreDetailsLectureSession(ev: Event, value){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsSessionPopoverPage,
      componentProps: {
        lectureSessionId: value.id,
        lecturer: value.lecturer,
        lectureHall: value.lectureHall
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
            console.log("Alert Box: Remove Lecture Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Lecture Session Request Accepted");

            // Calling function to remove lecture session
            this.semesterCalendarService.removeLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value);

          }
        }

      ]
    });

    await alert.present();

  }




  // (Publishing new lecture sessions section) and retrieving published lecture sessions 
  doPublishLectureSlotSC(value){

    if(value.degreeProgram == this.publishedDegreeProgramDegree){
      this.userSelectedAwardingBodyUniversity = this.publishedDegreeProgramAwardingBodyUniversity;
    }

    // Calling function to retrieving the new lecture sessions from the firestore database
    this.semesterCalendarService.retrievePublishedLectureSessionsSemesterCalendar(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.userSelectedAwardingBodyUniversity).subscribe(activeLectureSlots => {
      this.eventSourceASCalendar = []; // Clearing the existing events on the calendar before syncing 
      activeLectureSlots.forEach(snap => {
        let eventASCalendar:any = snap.payload.doc.data();
        eventASCalendar.id = snap.payload.doc.id;
        eventASCalendar.title = eventASCalendar.moduleCode + "-" + eventASCalendar.moduleTitle + "\n | Status: " + eventASCalendar.status;
        eventASCalendar.startTime = eventASCalendar.startDateTime.toDate();
        eventASCalendar.endTime = eventASCalendar.endDateTime.toDate();

        console.log(eventASCalendar);

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

  }


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
        this.numberOfLectureSessionsDocuments = [];
      }
      else if ((event.events !== undefined && event.events.length !== 0) == true){
        this.numberOfLectureSessionsDocuments = event.events;
      }
      console.log(this.numberOfLectureSessionsDocuments);
  }

  onCurrentDateChangedPSCalendar(event: Date){
    console.log("Current Lecture Session Date Change: " + event);

    this.numberOfLectureSessionsDocuments = [];
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
    var frontSwipeASCalendar = document.getElementById('activeSemesterCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeASCalendar.slideNext();
  }

  previousMonthASCalendar(){
    var backSwipeASCalendar = document.getElementById('activeSemesterCalendar').querySelector('.swiper-container')['swiper'];
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
