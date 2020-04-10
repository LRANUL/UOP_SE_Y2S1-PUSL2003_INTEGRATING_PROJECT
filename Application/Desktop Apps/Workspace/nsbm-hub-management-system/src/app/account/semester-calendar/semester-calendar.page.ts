import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ModalController, PopoverController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

import { MatTooltipModule } from '@angular/material';

import { EditLectureSessionModalPage } from './edit-lecture-session-modal/edit-lecture-session-modal.page';
import { LectureSchedulePage } from '../lecture-schedule/lecture-schedule.page';
import { MoreDetailsSessionPopoverPage } from './more-details-session-popover/more-details-session-popover.page';

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
    private fireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {


  }



  ngOnInit() {

    this.publishedLecureSlots;


    
    

    this.searchSemesterCalendar = this.formBuilder.group({
      batch: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicYearYear: new FormControl('', Validators.required),
      academicYearSemester: new FormControl('', Validators.required)
    })

    this.assignNewLectureSlotSC = this.formBuilder.group({
      batch: new FormControl(''),
      degreeProgram: new FormControl(''),
      academicYearYear: new FormControl(''),
      academicYearSemester: new FormControl(''),
      module: new FormControl(''),
      sessionDateSingle: new FormControl(''),
      sessionStartTimeSingle: new FormControl(''),
      sessionEndTimeSingle: new FormControl(''),
      sessionDayMultiple: new FormControl(''),
      sessionStartDateMultiple: new FormControl(''),
      sessionEndDateMultiple: new FormControl(''),
      sessionStartTimeMultiple: new FormControl(''),
      sessionEndTimeMultiple: new FormControl('')
    });

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

  // Retriving published lecture sessions
  doSearchSemesterCalendar(value){

    this.loadingSpinnerPLS = true;

    // Retrieving the published lecture sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/lectureSessions", ref => ref
      .where("batch", "==", value.batch)
      .where("degreeProgram", "==", value.degreeProgram)
      .where("academicYear", "==", parseInt(value.academicYearYear)) /* ( parseInt() ) Converting value data type from the form, string to int */
      .where("academicSemester", "==", parseInt(value.academicYearSemester))).snapshotChanges().subscribe(lectureSlots => {
      this.eventSourcePSCalendar = []; // Clearing the existing events on the calendar before syncing 
      lectureSlots.forEach(snap => {
        let eventPSCalendar:any = snap.payload.doc.data();
        eventPSCalendar.id = snap.payload.doc.id;
        eventPSCalendar.title = eventPSCalendar.moduleCode + "-" + eventPSCalendar.moduleTitle + " | Status: " + eventPSCalendar.status;
        eventPSCalendar.startTime = eventPSCalendar.startTime.toDate();
        eventPSCalendar.endTime = eventPSCalendar.endTime.toDate();

        console.log(eventPSCalendar);

        this.eventSourcePSCalendar.push(eventPSCalendar);
      });
    });



    // Setting loading dots to false after the contents has loaded.
    this.fireStore.collection("sessions/sessionTypes/lectureSessions", ref => ref
      .where("batch", "==", value.batch)
      .where("degreeProgram", "==", value.degreeProgram)
      .where("academicYear", "==", parseInt(value.academicYearYear)) /* ( parseInt() ) Converting value data type from the form, string to int */
      .where("academicSemester", "==", parseInt(value.academicYearSemester))).snapshotChanges().subscribe(() => this.loadingSpinnerPLS = false);

    this.alertnotice("Lecture Sessions Retrieval", "Available lecture sessions are placed on the calendar.");
    
  }

  // More details of lecture sessions popover
  async moreDetailsLectureSession(ev: Event, value){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsSessionPopoverPage,
      componentProps: {
        lectureSessionId: value.id,
        lecturer: value.lecturer,
        lecturehall: value.lectureHall
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
        lectureSessionId: value
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

            // Implementation of deleting a lecture session from firestore
            this.fireStore.doc("sessions/sessionTypes/lectureSessions/" + value).delete();

          }
        }

      ]
    });

    await alert.present();

  }




  // Publishing new lecture sessions and retrieving published lecture sessions 
  doPublishLectureSlotSC(value){

    // Retrieving the new lecture sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/lectureSessions", ref => ref
    .where("batch", "==", value.batch)
    .where("degreeProgram", "==", value.degreeProgram)
    .where("academicYear", "==", parseInt(value.academicYearYear)) /* ( parseInt() ) Converting value data type from the form, string to int */
    .where("academicSemester", "==", parseInt(value.academicYearSemester))).snapshotChanges().subscribe(activeLectureSlots => {
      this.eventSourceASCalendar = []; // Clearing the existing events on the calendar before syncing 
      activeLectureSlots.forEach(snap => {
        let eventASCalendar:any = snap.payload.doc.data();
        eventASCalendar.id = snap.payload.doc.id;
        eventASCalendar.title = eventASCalendar.moduleCode + "-" + eventASCalendar.moduleTitle + "\n | Status: " + eventASCalendar.status;
        eventASCalendar.startTime = eventASCalendar.startTime.toDate();
        eventASCalendar.endTime = eventASCalendar.endTime.toDate();

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
