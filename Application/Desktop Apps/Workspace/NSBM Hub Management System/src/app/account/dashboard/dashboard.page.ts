import { Component, OnInit, ViewChild } from '@angular/core';

import { FirestoreService } from '../../services/firebase/firestore.service';

import { SideMenuPage } from '../side-menu/side-menu.page';

import { Chart } from 'chart.js';

import { PopoverController, AlertController } from '@ionic/angular';
import { MoreDetailsTodaysLecturesPopoverPage } from './more-details-todays-lectures-popover/more-details-todays-lectures-popover.page';
import { MoreDetailsLecturesPopoverPage } from './more-details-lectures-popover/more-details-lectures-popover.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { MoreDetailsEventPopoverPage } from './more-details-event-popover/more-details-event-popover.page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  currentDate;

  nextDate;

  dateThreeDaysBeformCurrentDate;

  showLoadingDotsTodaysLectureSession: Boolean = true;

  noLectureSessionsTodayText: Boolean = false;

  noLectureSessionText: Boolean = false;

  showLoadingDotsUpcomingLectureSession: Boolean = false;



  constructor(
    private dashboardService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private popoverController: PopoverController,
    private alertController: AlertController
  ) { }

  // Calling the ngOnInit() function when page is rendered on the user's screen
  ionViewWillEnter(){
    this.ngOnInit();

    // Initiating the user activity chart
    this.userActivityAreaChart();

    // Retrieving current date and time
    // Sample: Sun Apr 19 2020 18:44:52 GMT+0530 (India Standard Time)
    this.currentDate = new Date();

    // Setting currentDate time section to zero leaving the date as it is
    // Sample: Sun Apr 19 2020 00:00:00 GMT+0530 (India Standard Time)
    this.currentDate.setHours(0,0,0,0);

    // Retrieving current date and time
    // Sample: Sun Apr 19 2020 18:44:52 GMT+0530 (India Standard Time)
    this.nextDate = new Date();

    // Setting nextDate time section to zero leaving the date as it is
    // Sample: Sun Apr 19 2020 00:00:00 GMT+0530 (India Standard Time)
    this.nextDate.setHours(0,0,0,0);

    // Setting date section to increment by one
    // Sample: Sun Apr 20 2020 00:00:00 GMT+0530 (India Standard Time)
    this.nextDate.setDate(this.nextDate.getDate()+1);



    this.dateThreeDaysBeformCurrentDate = new Date();

    this.dateThreeDaysBeformCurrentDate.setDate(this.currentDate.getDate()-3);




    // Retrieving user faculty from the sideMenu page
    console.log(this.sideMenuPageUserFaculty.passUserFaculty());

    this.retrievePublishedLecturerToPONotice();

    this.retrievePublishedLectureSessionsCurrentDate();

    this.retrievePublishedLectureSessionsDashboardUpcomingLecturers();

    this.retrievePublishedNews();

    this.retrievePublishedEventSessions();

  }

  ngOnInit() { }

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
  

  // User activity area chart (daily no of active users)
  bars: any;
  colorArray: any;
  
  @ViewChild('userActivityAreaChart', {static: true}) barChart;

  userActivityAreaChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['22-4-2020', '23-4-2020', '24-4-2020', '25-4-2020', '26-4-2020', '27-4-2020', '28-4-2020', '29-4-2020'],
        datasets: [{
          label: 'User Activity',
          data: [8, 10, 12, 5, 3, 15, 14, 16],
          backgroundColor: 'rgb(109, 156, 235)', 
          borderColor: 'rgb(109, 219, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              display: false
            },
            gridLines: {
              display: false,
            },
          }],
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
            },
          }],
        }
      }
    });
  }

  

  
  // Retrieving published lecture sessions for the current date from the firestore datbase
  publishedLectureSessionsCurrentDate;
  retrievePublishedLectureSessionsCurrentDate = () => {
      this.dashboardService.retrievePublishedLectureSessionsCurrentDate(this.sideMenuPageUserFaculty.passUserFaculty(), this.currentDate, this.nextDate).subscribe(response => {
        if (response.length > 0) {
          this.showLoadingDotsTodaysLectureSession = false;
          this.publishedLectureSessionsCurrentDate = response;
        }
        else{
          this.showLoadingDotsTodaysLectureSession = false;
          this.noLectureSessionsTodayText = true;
        }
    }, error => {
      this.showLoadingDotsTodaysLectureSession = false;
      console.log("Error: " + error);
      this.alertNotice("Error", "An error has occurred: " + error);
    });
  }

  // Retrieving published news from the firestore database
  publishedNews;
  retrievePublishedNews = () =>
    this.dashboardService.retrievePublishedNews(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => (this.publishedNews = response));

  // Retrieving published notices (Lecturers To Program Office (PO)) and assigning them
  publishedNoticesLecturerToPO;
  retrievePublishedLecturerToPONotice = () => 
    this.dashboardService.retrievePublishedLecturerToPONotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => (this.publishedNoticesLecturerToPO = response));


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
      // Setting loading spinner in upcoming lecture sessions to stop spinning
      this.showLoadingDotsUpcomingLectureSession = false;

      this.eventSourceLecture = []; // Clearing the existing lecture sessions on the calendar before syncing 
      response.forEach(snap => {
        let eventLectureSession:any = snap.payload.doc.data();
        eventLectureSession.id = snap.payload.doc.id;
        eventLectureSession.title = eventLectureSession.moduleCode + "-" + eventLectureSession.moduleTitle;
        eventLectureSession.startTime = eventLectureSession.startDateTime.toDate();
        eventLectureSession.endTime = eventLectureSession.endDateTime.toDate();

        this.eventSourceLecture.push(eventLectureSession);
      });

    }, error => {
      // Setting loading spinner in upcoming lecture sessions to stop spinning
      this.showLoadingDotsUpcomingLectureSession = false;

      console.log("Error: " + error);
      this.alertNotice("Error", "An error has occurred: " + error);
    });


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


  retrievePublishedEventSessions = () => {
    // Retrieving the event sessions from the firestore database
    this.dashboardService.retrievePublishedEventSessions(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(eventSlots => {
      this.eventSourceEvent = []; // Clearing the exisiting events on the calendar before syncing
      eventSlots.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.title = event.eventTitle + "  | Status:  " + event.status;
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
      component: MoreDetailsEventPopoverPage,
      componentProps: {
        eventSessionDocId: value.payload.doc.id,
        status: value.status
      },
      event: ev
    });

    moreDetailsEventSessionPopover.present();
  }





  

  // Declared to hold the events as array to store the sessions
  lectureSessionDocuments = [];

  // Lecture Calendar
  eventSourceLecture;
  viewingMonthLecture;

  calendarLecture = {
    mode: 'month',
    currentDate: new Date()
  }

  selectedDate = new Date();

  nextMonthLecture(){
    var frontSwipeLecture = document.getElementById('weeksLectureCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeLecture.slideNext();
  }

  previousMonthLecture(){
    var backSwipeLecture = document.getElementById('weeksLectureCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeLecture.slidePrev();
  }

  onViewTitleChangedLecture(title){
    this.viewingMonthLecture = title; 
  }

  onEventSelectedLecture(event) {
    console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedLecture(evt){
    console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
      ", disabled: " + evt.disabled);

      if((evt.events !== undefined && evt.events.length !== 0) == false){
        this.noLectureSessionText = true;
        this.lectureSessionDocuments = [];
      }
      else if ((evt.events !== undefined && evt.events.length !== 0) == true){
        this.noLectureSessionText = false;
        this.lectureSessionDocuments = evt.events;
      }
  }

  onCurrentDateChangedLecture(event: Date){
    console.log("Current Lecture Session Date Change: " + event);

    this.lectureSessionDocuments = [];
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

  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }


}
