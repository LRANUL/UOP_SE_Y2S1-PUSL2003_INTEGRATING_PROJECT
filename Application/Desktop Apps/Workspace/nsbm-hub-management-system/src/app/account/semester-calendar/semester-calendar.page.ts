import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-semester-calendar',
  templateUrl: './semester-calendar.page.html',
  styleUrls: ['./semester-calendar.page.scss'],
})
export class SemesterCalendarPage implements OnInit {

  searchSemesterCalendar: FormGroup;

  assignNewLectureSlotSC: FormGroup;

  constructor(
    private fireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {

    
    
  

   }

   
   

  ngOnInit() {

    this.publishedLecureSlots;


    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });
    
    this.searchSemesterCalendar = this.formBuilder.group({
      batch: new FormControl(''),
      degreeProgram: new FormControl(''),
      academicYearYear: new FormControl(''),
      academicYearSemester: new FormControl('')
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

  // Laoding Spinner Implementation
  async screenLoadingSpinner() {
    const loading = await this.loadingController.create({
      message: 'Retrieving Content, Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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




  publishedLecureSlots;



  doSearchSemesterCalendar(value){

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

    

    this.screenLoadingSpinner();

    this.alertnotice("Lecture Sessions Retrieval", "Available lecture sessions are placed on the calendar.");
    
  }

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
        eventASCalendar.title = eventASCalendar.moduleCode + "-" + eventASCalendar.moduleTitle + " | Status: " + eventASCalendar.status;
        eventASCalendar.startTime = eventASCalendar.startTime.toDate();
        eventASCalendar.endTime = eventASCalendar.endTime.toDate();

        console.log(eventASCalendar);

        this.eventSourceASCalendar.push(eventASCalendar);
      });
    });

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
  }

  onCurrentDateChangedPSCalendar(event: Date){
    console.log("Current Lecture Session Date Change: " + event);
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
