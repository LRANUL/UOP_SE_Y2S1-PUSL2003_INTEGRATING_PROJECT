import { Component, OnInit } from '@angular/core';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { EditLectureSessionModalPage } from '../semester-calendar/edit-lecture-session-modal/edit-lecture-session-modal.page';
import { MoreDetailsSessionPopoverPage } from '../semester-calendar/more-details-session-popover/more-details-session-popover.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lecture-schedule',
  templateUrl: './lecture-schedule.page.html',
  styleUrls: ['./lecture-schedule.page.scss'],
})
export class LectureSchedulePage implements OnInit {

  currentDate;
  nextDate;

  showLoadingDotsCurrentDateLectureSession: Boolean = true;

  showLoadingDotsAllLectureSession: Boolean = true;

  noLectureSessionTodayText: Boolean = false;

  noLectureSessionAllText: Boolean = false;

  constructor(
    private lecturesService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private alertController: AlertController
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

    this.retrievePublishedLectureSessionsCurrentDate();


    // Calling function to retrieving the all lecture sessions from the firestore database
    this.lecturesService.retrieveAllPublishedLectureSessions(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(allLectureSessionSlots => {
      // Setting loading spinner in all lecture sessions to stop spinning
      this.showLoadingDotsAllLectureSession = false;

      this.eventSourceLectureSession = []; // Clearing the existing lecture sessions on the calendar before syncing 
      allLectureSessionSlots.forEach(snap => {
        let eventLectureSession:any = snap.payload.doc.data();
        eventLectureSession.id = snap.payload.doc.id;
        eventLectureSession.title = eventLectureSession.moduleCode + "-" + eventLectureSession.moduleTitle + "\n | Status: " + eventLectureSession.status;
        eventLectureSession.startTime = eventLectureSession.startDateTime.toDate();
        eventLectureSession.endTime = eventLectureSession.endDateTime.toDate();

        console.log(eventLectureSession);

        this.eventSourceLectureSession.push(eventLectureSession);
      });
    }, error => {
      // Setting loading spinner in all lecture sessions to stop spinning
      this.showLoadingDotsAllLectureSession = false;

      console.log("Error: " + error);
      this.alertNotice("Error", "An error has occurred: " + error);
    });

  }

  // Opening notifications popover
  async openNotificationPopover(ev: Event){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: NotificationsPopoverPage,
      componentProps: {
        loggedInUserId: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
  }




  // Retrieving the lecture sessions of the current date and their details from the firestore database
  publishedLectureSessionCurrentDate;
  retrievePublishedLectureSessionsCurrentDate = () => {
    this.lecturesService.retrievePublishedLectureSessionsCurrentDate(this.sideMenuPageUserFaculty.passUserFaculty(), this.currentDate, this.nextDate).subscribe(response => {
      if (response.length > 0) {
        
        // Setting loading spinner in todays lecture session to stop spinning
        this.showLoadingDotsCurrentDateLectureSession = false;

        this.publishedLectureSessionCurrentDate = response;

      }
      else {
        // Setting loading spinner in todays lecture session to stop spinning
        this.showLoadingDotsCurrentDateLectureSession = false;

        this.noLectureSessionTodayText = true;
      }
    }, error => {
      // Setting loading spinner in todays lecture session to stop spinning
      this.showLoadingDotsCurrentDateLectureSession = false;

      console.log("Error: " + error);
      this.alertNotice("Error", "An error has occurred: " + error);
    });
  }



  // Editing lecture sessions modal calling (lecture schedule), opening modal
  async editLectureSessionSchedule(value){
    const editLectureSessionModal = await this.modalController.create({
      component: EditLectureSessionModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        lectureSessionId: value.payload.doc.id,
        lectureSessionBatch: value.payload.doc.data().batch,
        lectureSessionDegreeProgram: value.payload.doc.data().degree,
        lectureSessionAcademicYear: value.payload.doc.data().academicYear, 
        lectureSessionAcademicSemester: value.payload.doc.data().academicSemester,
        lectureSessionModuleCode: value.payload.doc.data().moduleCode,
        lectureSessionModuleTitle: value.payload.doc.data().moduleTitle,
        lectureSessionStartDateTime: value.payload.doc.data().startDateTime,
        lectureSessionEndDateTime: value.payload.doc.data().endDateTime,
        lectureSessionLecturer: value.payload.doc.data().lecturer,
        lectureSessionLectureHall: value.payload.doc.data().lectureHall,
        lectureSessionStatus: value.payload.doc.data().status,
        userFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editLectureSessionModal.present();
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




  lectureSessionsDocuments = [];

  // All Available Lecture Sessions Calendar
  eventSourceLectureSession;
  viewingMonthLectureSession;

  calendarLectureSession = {
    mode: 'month',
    currentDate: new Date()
  }

  selectedDate = new Date();

  nextMonthLectureSession(){
    var frontSwipeLectureSession = document.getElementById('lectureSessionSemesterCalendar').querySelector('.swiper-container')['swiper'];
    frontSwipeLectureSession.slideNext();
  }

  previousMonthLectureSession(){
    var backSwipeLectureSession = document.getElementById('lectureSessionSemesterCalendar').querySelector('.swiper-container')['swiper'];
    backSwipeLectureSession.slidePrev();
  }

  onViewTitleChangedLectureSession(title){
  //  console.log(title);
    this.viewingMonthLectureSession = title; 
  }

  onEventSelectedLectureSession(event) {
  //  console.log("Lecture Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title); 
  }

  onTimeSelectedLectureSession(event){
  //  console.log("Lecture Session Selected Time: " + event.selectedTime + ", has sessions: " + (event.events !== undefined && event.events.length !== 0) +
  //    ", disabled: " + event.disabled);

      if((event.events !== undefined && event.events.length !== 0) == false){
        this.lectureSessionsDocuments = [];
        this.noLectureSessionAllText = true;
      }
      else if ((event.events !== undefined && event.events.length !== 0) == true){
        this.lectureSessionsDocuments = event.events;
        this.noLectureSessionAllText = false;
      }
  //    console.log(this.lectureSessionsDocuments);
  }

  onCurrentDateChangedLectureSession(event: Date){
  //  console.log("Current Lecture Session Date Change: " + event);

    this.lectureSessionsDocuments = [];
  }

  onRangeChangedLectureSession(evt) {
  //  console.log("Lecture Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }



  // More details of lecture sessions popover
  async moreDetailsLectureSession(ev: Event, value){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: MoreDetailsSessionPopoverPage,
      componentProps: {
        lectureSessionId: value.id,
        batch: value.batch,
        lecturer: value.lecturer,
        lectureHall: value.lectureHall,
        degree: value.degree,
        degreeCode: value.degreeCode,
        awardingBodyUniversity: value.awardingBodyUniversity,
        academicPeriodYear: value.academicYear,
        academicPeriodSemester: value.academicSemester
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
  }

  // Editing lecture sessions modal calling, opening modal
  async editLectureSession(value){
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
            this.lecturesService.removeLectureSession(this.sideMenuPageUserFaculty.passUserFaculty(), value);
          }
        }
      ]
    });
    await alert.present();
  }




}
