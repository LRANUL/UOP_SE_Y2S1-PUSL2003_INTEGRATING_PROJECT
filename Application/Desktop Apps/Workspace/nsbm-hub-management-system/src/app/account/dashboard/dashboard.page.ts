import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { FirestoreService } from '../../services/firebase/firestore.service';

import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AngularFirestore } from '@angular/fire/firestore';

import { SideMenuPage } from '../side-menu/side-menu.page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(
    private dashboardService: FirestoreService,
    private fireStore: AngularFirestore,
    private sideMenuPageUserFaculty: SideMenuPage
  ) {

    // Retrieving the lecture sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/lectureSessions").snapshotChanges().subscribe(lectureSlots => {
      this.eventSourceLecture = []; // Clearing the existing events on the calendar before syncing 
      lectureSlots.forEach(snap => {
        let eventLecture:any = snap.payload.doc.data();
        eventLecture.id = snap.payload.doc.id;
        eventLecture.title = eventLecture.moduleCode + "-" + eventLecture.moduleTitle + " | Status: " + eventLecture.status;
        eventLecture.startTime = eventLecture.startDateTime.toDate();
        eventLecture.endTime = eventLecture.endDateTime.toDate();

        console.log(eventLecture)

        this.eventSourceLecture.push(eventLecture);
      });
    });

    // Retrieving the event sessions from the firestore database
    this.fireStore.collection("sessions/sessionTypes/eventSessions").snapshotChanges().subscribe(eventSlots => {
      this.eventSourceEvent = []; // Clearing the exisiting events on the calendar before syncing
      eventSlots.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.title = event.Title;
        event.startTime = event.startDateTime.toDate();
        event.endTime = event.endDateTime.toDate();

        console.log(event);

        this.eventSourceEvent.push(event);
      })
    })
    

   }

  ngOnInit() {

    this.retrievePublishedNotices_Lecturers_To_PO();

    // Retrieving user faculty from the sideMenu page
    console.log(this.sideMenuPageUserFaculty.passUserFaculty());
  
  }




  // Retrieving published notices (Lecturers To Program Office (PO)) and assigning them
  publishedNotices_Lecturers_To_PO;
  retrievePublishedNotices_Lecturers_To_PO = () => 
    this.dashboardService.retrievePublishedNotices_Lecturers_To_PO().subscribe(response => (this.publishedNotices_Lecturers_To_PO = response));



  // Lecture Calendar
  eventSourceLecture;
  viewingMonthLecture;

  calendarLecture = {
    mode: 'month',
    currentDate: new Date()
  }

  selectedDate = new Date();

  nextMonthLecture(){
    var frontSwipeLecture = document.getElementById('LectureCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeLecture.slideNext();
  }

  previousMonthLecture(){
    var backSwipeLecture = document.getElementById('LectureCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeLecture.slidePrev();
  }

  onViewTitleChangedLecture(title){
    console.log(title);
    this.viewingMonthLecture = title; 
  }

  onEventSelectedLecture(event) {
    console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedLecture(evt){
    console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
      ", disabled: " + evt.disabled);
  }

  onCurrentDateChangedLecture(event: Date){
    console.log("Current Lecture Session Date Change: " + event);
  }

  onRangeChangedLecture(evt) {
    console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


  // Event Calendar
  eventSourceEvent;
  viewingMonthEvent;

  calendarEvent = {
    mode: 'month',
    currentDate: new Date()
  }

  nextMonthEvent(){
    var frontSwipeEvent = document.getElementById('EventCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeEvent.slideNext();
  }

  previousMonthEvent(){
    var backSwipeEvent = document.getElementById('EventCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeEvent.slidePrev();
  }

  onViewTitleChangedEvent(title){
    console.log(title);
    this.viewingMonthEvent = title;
  }

  onEventSelectedEvent(event) {
    console.log("Event Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedEvent(evt){
    console.log("Event Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
      ", disabled: " + evt.disabled);
  }

  onCurrentDateChangedEvent(event: Date){
    console.log("Current Event Session Date Change: " + event);
  }

  onRangeChangedEvent(evt) {
    console.log("Event Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }



}
