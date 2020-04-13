import { Component, OnInit } from '@angular/core';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-lecture-schedule',
  templateUrl: './lecture-schedule.page.html',
  styleUrls: ['./lecture-schedule.page.scss'],
})
export class LectureSchedulePage implements OnInit {

  currentDateTimeObject;
  currentDateTimeUnix;
  currentTime;
  currentTimeMilli;

  currentDateTimeMidnightUnix;

  remainingMilliUntilMidnight;
  dateTimeAtUpcomingMidnightUnix;

  constructor(
    private lectureScheduleService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
  ) { }

  ngOnInit() {

    this.currentDateTimeObject = new Date();
    this.currentDateTimeUnix = this.currentDateTimeObject.getTime();

    // 86,400,000 milliseconds in one day
    // 3,600,000 milliseconds in one hour
    // 60,000 milliseconds in one minute
    // 1000 milliseconds in one second

    this.currentTimeMilli = (this.currentDateTimeObject.getHours() * 3600000) + (this.currentDateTimeObject.getMinutes() * 60000) + (this.currentDateTimeObject.getSeconds() * 1000) + (this.currentDateTimeObject.getMilliseconds);

    this.currentDateTimeMidnightUnix = this.currentDateTimeUnix - this.currentTimeMilli;


    this.remainingMilliUntilMidnight = (86400000 - this.currentTimeMilli);
    this.dateTimeAtUpcomingMidnightUnix = this.remainingMilliUntilMidnight + this.currentDateTimeUnix;



    console.log(this.currentDateTimeMidnightUnix);
    console.log(this.dateTimeAtUpcomingMidnightUnix);

    this.retrievePublishedLectureSessionsLectureSchedule();
  }

  lectureSessionBatch;
  lectureSessionModuleCode;
  lectureSessionModuleTitle;
  lectureSessionStartTime;
  lectureSessionEndTime;
  lectureSessionLectureHall;
  lectureSessionLecturer;
  lectureSessionStatus;

  // Retreving the lecture sessions of the current date and their details from the firestore database
  publishedCurentDateLectureSession;
  retrievePublishedLectureSessionsLectureSchedule = () => {
    this.lectureScheduleService.retrievePublishedLectureSessionsLectureSchedule(this.sideMenuPageUserFaculty.passUserFaculty(), this.currentDateTimeMidnightUnix, this.dateTimeAtUpcomingMidnightUnix).subscribe(response => 
      (this.publishedCurentDateLectureSession = response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.lectureSessionBatch = firestoreDoc.batch;
        this.lectureSessionModuleCode = firestoreDoc.moduleCode;
        this.lectureSessionModuleTitle = firestoreDoc.moduleTitle;
        this.lectureSessionStartTime = firestoreDoc.startDateTime.toDate().getHours() + "-" + firestoreDoc.startDateTime.toDate().getMinutes();
        this.lectureSessionEndTime = firestoreDoc.endDateTime.toDate().getHours() + "-" + firestoreDoc.endDateTime.toDate().getMinutes();
        this.lectureSessionLectureHall = firestoreDoc.lectureHall;
        this.lectureSessionLecturer = firestoreDoc.lecturer;
        this.lectureSessionStatus = firestoreDoc.status;
      })
    ));
  }




   
  

  

}
