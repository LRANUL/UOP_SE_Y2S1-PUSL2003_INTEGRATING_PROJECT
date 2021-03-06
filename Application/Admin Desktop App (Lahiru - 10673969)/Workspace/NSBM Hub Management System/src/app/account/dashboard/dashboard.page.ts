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

  userActivityRecordsSunday = [];
  userActivityRecordsMonday = [];
  userActivityRecordsTuesday = [];
  userActivityRecordsWednesday = [];
  userActivityRecordsThursday = [];
  userActivityRecordsFriday = [];
  userActivityRecordsSaturday = [];


  currentDate;

  nextDate;

  dateThreeDaysBeforeCurrentDate;

  showLoadingDotsTodaysLectureSession: Boolean = true;

  noLectureSessionsTodayText: Boolean = false;

  noLectureSessionText: Boolean = false;

  noLecturerPONoticeText: Boolean = false;

  showLoadingDotsUpcomingLectureSession: Boolean = false;

  activeStudentUsersLoadingSpinner: Boolean = true;

  activeLecturerUsersLoadingSpinner: Boolean = true;

  activeProgramOfficeUsersLoadingSpinner: Boolean = true;

  activeStudentUserDetailsLoadingSpinner: Boolean = true;

  activeLecturerUserDetailsLoadingSpinner: Boolean = true;

  activeProgramOfficeUserDetailsLoadingSpinner: Boolean = true;

  onlineUsersCount: number = 0;
  onlineStudentUsersCount: number = 0;
  onlineLecturerUsersCount: number = 0;
  onlineProgramOfficeUsersCount: number = 0;
  onlineStudentUserDetails;
  onlineLecturerUserDetails;
  onlineProgramOfficeUserDetails;

  constructor(
    private dashboardService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private popoverController: PopoverController,
    private alertController: AlertController
  ) { }

  // Calling the ngOnInit() function when page is rendered on the user's screen
  ionViewWillEnter(){
/*
    var userActivityRecords = this.retrieveUserActivityRecordsCount();

    console.log(userActivityRecords[0]);
*/
    // Initiating the user activity chart
    this.userActivityAreaChart();

    this.retrieveOnlineUserDetails();

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



    this.dateThreeDaysBeforeCurrentDate = new Date();

    this.dateThreeDaysBeforeCurrentDate.setDate(this.currentDate.getDate()-3);




    // Retrieving user faculty from the sideMenu page
    console.log(this.sideMenuPageUserFaculty.passUserFaculty());

    this.retrievePublishedLecturerToPONotice();

    this.retrievePublishedLectureSessionsCurrentDate();

    this.retrievePublishedLectureSessionsDashboardUpcomingLecturers();

    this.retrievePublishedNews();

    this.retrievePublishedEventSessions();

  }

  ngOnInit() { }

  retrieveOnlineUserDetails = () => {
    // Retrieving user details of student users that have an account status "Online" from the firestore database
    this.dashboardService.retrieveOnlineUserDetails("studentUsers").subscribe(response => {
      this.activeStudentUsersLoadingSpinner = false;
      this.onlineStudentUsersCount = response.length;
      this.activeStudentUserDetailsLoadingSpinner = false;
      this.onlineStudentUserDetails = response;
    });

    // Retrieving user details of lecturer users that have an account status "Online" from the firestore database
    this.dashboardService.retrieveOnlineUserDetails("lecturerUsers").subscribe(response => {
      this.activeLecturerUsersLoadingSpinner = false;
      this.onlineLecturerUsersCount = response.length;
      this.activeLecturerUserDetailsLoadingSpinner = false;
      this.onlineLecturerUserDetails = response;
    });

    // Retrieving user details of program office users that have an account status "Online" from the firestore database
    this.dashboardService.retrieveOnlineUserDetails("programOfficeUsers").subscribe(response => {
      this.activeProgramOfficeUsersLoadingSpinner = false;
      this.onlineProgramOfficeUsersCount = response.length;
      this.activeProgramOfficeUserDetailsLoadingSpinner = false;
      this.onlineProgramOfficeUserDetails = response;
    });
  }

  // Process of returning two digits if there is only one digit in a number
  // Sample: Passing - 5, Returning - 05
  convertToTwoDigit(numericValue: number){
    if(numericValue < 10){
      return "0" + numericValue;
    }
    else{
      return numericValue;
    }
  }

  // Processing of adding all the active users
  calculateTotalOnlineUsers(onlineStudentUsers: number, onlineLecturerUsers: number, onlineProgramOfficeUsers: number){
    let totalActiveUsers = onlineStudentUsers + onlineLecturerUsers + onlineProgramOfficeUsers;

    // Checking if number has one or two digits
    // Adding one more digit if number only has one digit
    // Sample: Passing - 5, Returning = 05
    // Returning total number of active users 
    return this.convertToTwoDigit(totalActiveUsers);
  }



  /*
  // Process of gathering data for the user activity graph
  retrieveUserActivityRecordsCount(){

    var userActivityRecordsSaturday = [];

    this.dashboardService.retrieveUserActivityRecords().subscribe(response => {
      response.forEach(snap => {
        let recordDocument:any = snap.payload.doc.data();
        recordDocument.id = snap.payload.doc.id;
        recordDocument.loginDateTime = recordDocument.loginDateTime.toDate();

        if((new Date(recordDocument.loginDateTime).getDay() + 1) == 1){
         // this.userActivityRecordsSunday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 2){
         // this.userActivityRecordsMonday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 3){
         // this.userActivityRecordsTuesday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 4){
         // this.userActivityRecordsWednesday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 5){
         // this.userActivityRecordsThursday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 6){
         // this.userActivityRecordsFriday.push(recordDocument);
        }
        else if((new Date(recordDocument.loginDateTime).getDay() + 1) == 7){
          userActivityRecordsSaturday.push(recordDocument);
        }
      })
   
      
    });
    return [userActivityRecordsSaturday];
  }
*/

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
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'User Activity',
          data: [314,342,330,332,333,329,295],
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

    

  // Retrieving published lecture sessions for the current date from the firestore database
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
    this.dashboardService.retrievePublishedNews(this.currentDate, this.dateThreeDaysBeforeCurrentDate).subscribe(response => (this.publishedNews = response));

  // Retrieving published notices (Lecturers To Program Office (PO)) and assigning them
  publishedNoticesLecturerToPO;
  retrievePublishedLecturerToPONotice = () => 
    this.dashboardService.retrievePublishedLecturerToPONotice(this.currentDate, this.dateThreeDaysBeforeCurrentDate).subscribe(response => {
      if(response.length > 0){
        this.publishedNoticesLecturerToPO = response;
      }
      else{
        this.noLecturerPONoticeText = true;
      }
    });


  // More details of today's lecture sessions popover
  async moreDetailsTodaysLectureSession(ev: Event, value){
    const moreDetailsTodaysLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsTodaysLecturesPopoverPage,
      componentProps: {
        lectureSessionDocId: value.payload.doc.id,
        degree: value.payload.doc.data().degree,
        awardingBodyUniversity:  value.payload.doc.data().awardingBodyUniversity,
        academicPeriodYear:  value.payload.doc.data().academicYear,
        academicPeriodSemester: value.payload.doc.data().academicSemester
      },
      event: ev
    });
    console.log(value);
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
        degree: value.degree,
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
      this.eventSourceEvent = []; // Clearing the existing events on the calendar before syncing
      eventSlots.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.title = event.eventTitle + "  | Status:  " + event.status;
        event.startTime = event.startDateTime.toDate();
        event.endTime = event.endDateTime.toDate();

      //  console.log(event);

        this.eventSourceEvent.push(event);
      })
    })
  }

  /*
   // More details of event sessions popover
   async moreDetailsEventSession(ev: Event, value){
    const moreDetailsEventSessionPopover = await this.popoverController.create({
      component: MoreDetailsEventPopoverPage,
      componentProps: {
        eventSessionDocId: value.id,
        status: value.status
      },
      event: ev
    });

    moreDetailsEventSessionPopover.present();
  }
  */


  // Opening news attachment link in a new tab over the existing tab
  openAttachmentLink(link){
    window.open(link, '_blank');
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
    var frontSwipeLecture = document.getElementById('upcomingLectureCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeLecture.slideNext();
  }

  previousMonthLecture(){
    var backSwipeLecture = document.getElementById('upcomingLectureCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeLecture.slidePrev();
  }

  onViewTitleChangedLecture(title){
    this.viewingMonthLecture = title; 
  }

  onEventSelectedLecture(event) {
  //  console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedLecture(evt){
  //  console.log("Lecture Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
  //    ", disabled: " + evt.disabled);

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
  //  console.log("Current Lecture Session Date Change: " + event);

    this.lectureSessionDocuments = [];
  }

  onRangeChangedLecture(evt) {
  //  console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
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

  moreDetailsLecturersPONotice(event, value){

  }


}
