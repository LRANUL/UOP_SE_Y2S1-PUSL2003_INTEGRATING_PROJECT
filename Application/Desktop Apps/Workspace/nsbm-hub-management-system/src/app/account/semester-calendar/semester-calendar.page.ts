import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-semester-calendar',
  templateUrl: './semester-calendar.page.html',
  styleUrls: ['./semester-calendar.page.scss'],
})
export class SemesterCalendarPage implements OnInit {

  constructor(
    private fireStore: AngularFirestore
  ) {


    // Retrieving the published lecture sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/lectureSessions").snapshotChanges().subscribe(lectureSlots => {
      this.eventSourcePSCalendar = []; // Clearing the existing events on the calendar before syncing 
      lectureSlots.forEach(snap => {
        let eventPSCalendar:any = snap.payload.doc.data();
        eventPSCalendar.id = snap.payload.doc.id;
        eventPSCalendar.title = eventPSCalendar.ModuleCode + "-" + eventPSCalendar.ModuleTitle + " | Status: " + eventPSCalendar.Status;
        eventPSCalendar.startTime = eventPSCalendar.StartTime.toDate();
        eventPSCalendar.endTime = eventPSCalendar.EndTime.toDate();

        console.log(eventPSCalendar)

        this.eventSourcePSCalendar.push(eventPSCalendar);
      });
    });


    // Retrieving the new lecture sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/lectureSessions").snapshotChanges().subscribe(lectureSlots => {
      this.eventSourceASCalendar = []; // Clearing the existing events on the calendar before syncing 
      lectureSlots.forEach(snap => {
        let eventASCalendar:any = snap.payload.doc.data();
        eventASCalendar.id = snap.payload.doc.id;
        eventASCalendar.title = eventASCalendar.ModuleCode + "-" + eventASCalendar.ModuleTitle + " | Status: " + eventASCalendar.Status;
        eventASCalendar.startTime = eventASCalendar.StartTime.toDate();
        eventASCalendar.endTime = eventASCalendar.EndTime.toDate();

        console.log(eventASCalendar)

        this.eventSourcePSCalendar.push(eventASCalendar);
      });
    });


   }

  ngOnInit() {
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

  onTimeSelectedPSCalendar(evt){
    console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
      ", disabled: " + evt.disabled);
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
    this.viewingMonthPSCalendar = title; 
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
