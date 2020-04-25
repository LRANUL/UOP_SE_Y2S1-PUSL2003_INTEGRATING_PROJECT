import { Component, OnInit } from '@angular/core';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-lecture-schedule',
  templateUrl: './lecture-schedule.page.html',
  styleUrls: ['./lecture-schedule.page.scss'],
})
export class LectureSchedulePage implements OnInit {

  currentDate;
  nextDate;

  constructor(
    private lectureScheduleService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage
  ) { }

  ngOnInit() {

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

    this.retrievePublishedLectureSessionsLectureSchedule();
  }
  


  // Retreving the lecture sessions of the current date and their details from the firestore database
  publishedLectureSessionCurrentDate;
  retrievePublishedLectureSessionsLectureSchedule = () => {
    this.lectureScheduleService.retrievePublishedLectureSessionsLectureSchedule(this.sideMenuPageUserFaculty.passUserFaculty(), this.currentDate, this.nextDate).subscribe(response => (this.publishedLectureSessionCurrentDate = response));
  }




   
  

  

}
