import { Component, OnInit } from '@angular/core';

import { FirestoreService } from '../../services/firebase/firestore.service';

import { SideMenuPage } from '../side-menu/side-menu.page';

import { PopoverController } from '@ionic/angular';
import { MoreDetailsEventSessionsPopoverPage } from './more-details-event-sessions-popover/more-details-event-sessions-popover.page';
import { MoreDetailsTodaysLecturesPopoverPage } from './more-details-todays-lectures-popover/more-details-todays-lectures-popover.page';
import { MoreDetailsLecturesPopoverPage } from './more-details-lectures-popover/more-details-lectures-popover.page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(
    private dashboardService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private popoverController: PopoverController
  ) {

   }

  ngOnInit() {

    this.retrievePublishedNotices_Lecturers_To_PO();

    // Retrieving user faculty from the sideMenu page
    console.log(this.sideMenuPageUserFaculty.passUserFaculty());


    this.retrievePublishedLectureSessionsDashboardTodayLectures();

    this.retrievePublishedLectureSessionsDashboardUpcomingLecturers();

    this.retrievePublishedEventSessionsDashboard();

  }

  // Retrieving the published lecture sessions fro the current date from the firestore database
  todaysLectureSessions;

  publishedDocId;

  /*
  publishedDegree;
  publishedAwardingBodyUniversity;
  publishedAcademicPeriodYear;
  publishedAcademicPeriodSemester;
  */

  retrievePublishedLectureSessionsDashboardTodayLectures = () => {
    this.dashboardService.retrievePublishedLectureSessionsDashboardTodayLectures(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.todaysLectureSessions = 
      response/*.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.publishedDocId = document.payload.doc.id;
        this.publishedDegree = firestoreDoc.degree;
        this.publishedAwardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.publishedAcademicPeriodYear = firestoreDoc.academicYear;
        this.publishedAcademicPeriodSemester = firestoreDoc.academicSemester;
      }) */
    ));
  }

  // More details of today's lecture sessions popover
  async moreDetailsTodaysLectureSession(ev: Event, value){
    const moreDetailsTodaysLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsTodaysLecturesPopoverPage,
      componentProps: {
        lectureSessionDocId: value.payload.doc.id,
        degree: value.payload.doc.data().degreeProgram,
        awardingBodyUniversity:  value.payload.doc.data().awardingBodyUniversity,
        academicPeriodYear:  value.payload.doc.data().academicYear,
        academicPeriodSemester: value.payload.doc.data().academicSemester
      },
      event: ev
    });

    moreDetailsTodaysLectureSessionPopover.present();
  }


  lectureSlots;

  retrievePublishedLectureSessionsDashboardUpcomingLecturers = () => {
    // Retrieving the published oncoming lecture sessions from the current date from the firestore database
    this.dashboardService.retrievePublishedLectureSessionsDashboardUpcomingLectures(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => {
      this.eventSourceLecture = []; // Clearing the existing events on the calendar before syncing 
      (
        this.lectureSlots = response.forEach(snap => {
        let eventLecture:any = snap.payload.doc.data();
        eventLecture.id = snap.payload.doc.id;
        eventLecture.title = eventLecture.moduleCode + "-" + eventLecture.moduleTitle + " | Status: " + eventLecture.status;
        eventLecture.startTime = eventLecture.startDateTime.toDate();
        eventLecture.endTime = eventLecture.endDateTime.toDate();

        console.log(eventLecture)

        this.eventSourceLecture.push(eventLecture);
      })
    )}
    );
  }

  // More details of Upcoming lecture sessions popover
  async moreDetailsUpcomingLectureSession(ev: Event, value){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsLecturesPopoverPage,
      componentProps: {
        lectureSessionDocId: value.id,
        batch: value.batch,
        lecturer: value.lecturer,
        lectureHall: value.lectureHall,
        degree: value.degreeProgram,
        awardingBodyUniversity: value.awardingBodyUniversity,
        academicPeriodYear: value.academicYear,
        academicPeriodSemester: value.academicSemester
      },
      event: ev
    });

    moreDetailsLectureSessionPopover.present();
  }


  retrievePublishedEventSessionsDashboard = () => {
    // Retrieving the event sessions from the firestore database
    this.dashboardService.retrievePublishedEventSessionsDashboard(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(eventSlots => {
      this.eventSourceEvent = []; // Clearing the exisiting events on the calendar before syncing
      eventSlots.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.title = event.eventTitle + "| Status: " + event.status;
        event.startTime = event.startDateTime.toDate();
        event.endTime = event.endDateTime.toDate();

        console.log(event);

        this.eventSourceEvent.push(event);
      })
    })
  }

   // More details of event sessions popover
   async moreDetailsEventSession(ev: Event, value){
    const moreDetailsEventSessionPopover = await this.popoverController.create({
      component: MoreDetailsEventSessionsPopoverPage,
      componentProps: {
        eventSessionDocId: value.payload.doc.id,
        status: value.status
      },
      event: ev
    });

    moreDetailsEventSessionPopover.present();
  }





  // Retrieving published notices (Lecturers To Program Office (PO)) and assigning them
  publishedNotices_Lecturers_To_PO;
  retrievePublishedNotices_Lecturers_To_PO = () => 
    this.dashboardService.retrievePublishedNotices_Lecturers_To_PO().subscribe(response => (this.publishedNotices_Lecturers_To_PO = response));


  // Declared to hold the events as array to determine the no of lecture sessions
  noOfLectureSessions = [];


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

      if((evt.events !== undefined && evt.events.length !== 0) == false){
        this.noOfLectureSessions = [];
      }
      else if ((evt.events !== undefined && evt.events.length !== 0) == true){
        this.noOfLectureSessions = evt.events;
      }
      console.log(this.noOfLectureSessions);
  }

  onCurrentDateChangedLecture(event: Date){
    console.log("Current Lecture Session Date Change: " + event);

    this.noOfLectureSessions = [];
  }

  onRangeChangedLecture(evt) {
    console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }


  // Declared to hold the events as array to determine the no of event sessions
  noOfEventSessions = [];


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

      if((evt.events !== undefined && evt.events.length !== 0) == false){
        this.noOfEventSessions = [];
      }
      else if ((evt.events !== undefined && evt.events.length !== 0) == true){
        this.noOfEventSessions = evt.events;
      }
      console.log(this.noOfEventSessions);
  }

  onCurrentDateChangedEvent(event: Date){
    console.log("Current Event Session Date Change: " + event);

    this.noOfEventSessions = [];
  }

  onRangeChangedEvent(evt) {
    console.log("Event Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }



}
