import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { EditEventSessionModalPage } from './edit-event-session-modal/edit-event-session-modal.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {


  // Setting min validation for angular material calendar
  minDate: Date;

  // Setting max validation for angular material calendar
  maxDate: Date;


  searchEventForm: FormGroup;

  addNewEventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private eventsService: FirestoreService
  ) { 

    // Retrieving current date and setting as min data
    this.minDate = new Date();

    // Retrieving the current year
    const currentYear = new Date().getFullYear();
    // Setting the max date december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);

  }

  ngOnInit() {

    this.searchEventForm = this.formBuilder.group({
      eventTitle: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required)
    });

    this.addNewEventForm = this.formBuilder.group({
      eventTitle: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required),
      eventStartTime: new FormControl('', Validators.required),
      eventEndTime: new FormControl('', Validators.required),
      eventStatus: new FormControl('', Validators.required)
    });

    this.retrievePublishedEventSessions();

    this.retrievePublishedSessionStatuses();

  }

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


  retrievePublishedEventSessions = () => {
    // Retrieving the event sessions from the firestore database
    this.eventsService.retrievePublishedEventSessions(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(eventSlots => {
      this.eventSourceEvent = []; // Clearing the existing events on the calendar before syncing
      (
        eventSlots.forEach(snap => {
        let eventDoc:any = snap.payload.doc.data();
        eventDoc.id = snap.payload.doc.id;
        eventDoc.title = eventDoc.eventTitle + "  | Status:  " + eventDoc.status;
        eventDoc.startTime = eventDoc.startDateTime.toDate();
        eventDoc.endTime = eventDoc.endDateTime.toDate();

      //  console.log(eventDoc);

        this.eventSourceEvent.push(eventDoc);
      })
    )}
    );
  }


  // Editing event sessions modal calling, opening modal
  async editEventSession(value){
    console.log(value);

    const editEventSessionModal = await this.modalController.create({
      component: EditEventSessionModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        eventSessionDocId: value.id,
        eventTitle: value.eventTitle,
        eventStartDateTime: value.startDateTime,
        eventEndDateTime: value.endDateTime,
        eventStatus: value.status,
        userFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editEventSessionModal.present();
  }

  // Confirm Box Implementation (Remove existing event session)
  async removeEventSession ( title: string, content: string, value) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Event Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Event Session Request Accepted");
            // Calling function to remove event session
            this.eventsService.removeEventSession(this.sideMenuPageUserFaculty.passUserFaculty(), value);
          }
        }
      ]
    });
    await alert.present();
  }


  // Retrieving the session statuses from the firestore database
  publishedSessionStatuses;
  retrievePublishedSessionStatuses = () =>
    this.eventsService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));


  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }



  // Confirm Box Implementation (Publish Event Session)
  async publishedEventSession ( title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Publish Event Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Publish Event Session Request Accepted");

            // Calling function to publish event session
            this.doAddNewEvent(value);
          }
        }
      ]
    });
    await alert.present();
  }


  doAddNewEvent(value){
    // Extracting month, date and year from selected event session date, sample format - 04/30/2020
    // Month has to be incremented by one because the month range is retrieve by - 0-11
    let eventSessionDate = (new Date(value.eventDate).getMonth()+1) + "/" + new Date(value.eventDate).getDate() + "/" + new Date(value.eventDate).getFullYear();

    // Merging event session date and event session start time into date format
    let eventSessionStartDateTime = new Date(eventSessionDate + " " + value.eventStartTime);

    // Merging event session date and event session end time into date format
    let eventSessionEndDateTime = new Date(eventSessionDate + " " + value.eventEndTime);

    this.eventsService.publishNewEventSession(this.sideMenuPageUserFaculty.passUserFaculty(), value, eventSessionStartDateTime, eventSessionEndDateTime)
    .then(success => {
        this.alertNotice("Event Added", "New event session has been published.");
        this.addNewEventForm.reset();
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("ERROR", "Error has occurred: " + error);
    });
  }


  // Process of search for event session with the 
  doSearchEvent(value){
    if(value.eventTitle != ""){
      this.eventsService.retrievePublishedEventSessionTitleSearch(this.sideMenuPageUserFaculty.passUserFaculty(), value.eventTitle).subscribe(response =>
        {// Checking a document was found and returned
          if(response.length > 0){

            // Assigning returned event session to the event calendar
            response.forEach(snap => {
              let eventDoc:any = snap.payload.doc.data();
              eventDoc.id = snap.payload.doc.id;
              eventDoc.title = eventDoc.eventTitle + "  | Status:  " + eventDoc.status;
              eventDoc.startTime = eventDoc.startDateTime.toDate();
              eventDoc.endTime = eventDoc.endDateTime.toDate();
              
              // Setting currentDate variable to returned event session
              // This will allow to redirect the user to the returned event session in the events calendar
              this.calendarEvent.currentDate = eventDoc.startDateTime.toDate();
              
              // Running a for loop until initially loaded (ngOnInit) event session of the same returned event session is found
              // For loop will running iterations of the number of initially loaded (ngOnInit) event sessions
              for (let index = 0; index < this.eventSourceEvent.length; index++) {

                // Checking if the initially loaded (ngOnInit) event session id is equal to the returned event session id
                if(this.eventSourceEvent[index].id == eventDoc.id){

                  // Initially loaded (ngOnInit) event session will be removed from the array
                  this.eventSourceEvent.splice(index, 1);

                  // Exiting the for loop
                  break;
                }
              }
              
              // Adding the returned event session to the event calendar array
              this.eventSourceEvent.push(eventDoc);
            })
          }
          else{
            // Showing alert box
            this.alertNotice("Event Not Available", "Event title: " + value.eventTitle + " was not found.");
          }
        });
    }
    else if(value.eventDate != ""){

      // Assigning the user selected event date
      let eventDate = new Date(value.eventDate);
      
      // Assigning the user selected event date
      let nextDate = new Date(eventDate);

      // Increment the user selected event date by one
      nextDate.setDate(nextDate.getDate() + 1);

      // Checking if a event document is available, if there is it will be returned
      this.eventsService.retrievePublishedEventSessionDateSearch(this.sideMenuPageUserFaculty.passUserFaculty(), eventDate, nextDate).subscribe(response => 
        {
          if(response.length > 0){

            // Assigning returned event session to the event calendar
            response.forEach(snap => {
              let eventDoc:any = snap.payload.doc.data();
              eventDoc.id = snap.payload.doc.id;
              eventDoc.title = eventDoc.eventTitle + "  | Status:  " + eventDoc.status;
              eventDoc.startTime = eventDoc.startDateTime.toDate();
              eventDoc.endTime = eventDoc.endDateTime.toDate();
              
              // Setting currentDate variable to returned event session
              // This will allow to redirect the user to the returned event session in the events calendar
              this.calendarEvent.currentDate = eventDoc.startDateTime.toDate();

              // Running a for loop until initially loaded (ngOnInit) event session of the same returned event session is found
              // For loop will running iterations of the number of initially loaded (ngOnInit) event sessions
              for (let index = 0; index < this.eventSourceEvent.length; index++) {

                // Checking if the initially loaded (ngOnInit) event session id is equal to the returned event session id
                if(this.eventSourceEvent[index].id == eventDoc.id){

                  // Initially loaded (ngOnInit) event session will be removed from the array
                  this.eventSourceEvent.splice(index, 1);

                  // Exiting the for loop
                  break;
                }
              }
      
              // Adding the returned event session to the event calendar array
              this.eventSourceEvent.push(eventDoc);
            })
          }
          else{
            let eventDate = new Date(value.eventDate).getMonth()+ "/" +new Date(value.eventDate).getDate()+ "/" +new Date(value.eventDate).getFullYear()

            // Showing alert box
            this.alertNotice("Event Not Available", "Event on: " + eventDate + " was not found.");
          }
        });
    }
  }


  resetSearchEventSection(){
    // Clearing user entered values in search event form
    this.searchEventForm.reset();

    // Clearing the events session in the event calendar
    this.eventSourceEvent = [];

    // Retrieving the published event sessions after the events calendar has been cleared
    this.retrievePublishedEventSessions();

    // Retrieving the current date and assigning it to the event calendar current date 
    this.calendarEvent.currentDate = new Date();
  }


  // Declared to hold the events as array to determine the no of event sessions
  noOfEventSessions = [];

  // Event Calendar
  eventSourceEvent = [];
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
  //  console.log(title);
    this.viewingMonthEvent = title;
  }

  onEventSelectedEvent(event) {
  //  console.log("Event Session Selected: " + event.startTime + " - " + event.endTime + ", " + event.title);
  }

  onTimeSelectedEvent(evt){
  //  console.log("Event Session Selected Time: " + evt.selectedTime + ", has sessions: " + (evt.events !== undefined && evt.events.length !== 0) +
  //    ", disabled: " + evt.disabled);

      if((evt.events !== undefined && evt.events.length !== 0) == false){
        this.noOfEventSessions = [];
      }
      else if ((evt.events !== undefined && evt.events.length !== 0) == true){
        this.noOfEventSessions = evt.events;
      }
    //  console.log(this.noOfEventSessions);
  }

  onCurrentDateChangedEvent(event: Date){
  //  console.log("Current Event Session Date Change: " + event);

    this.noOfEventSessions = [];
  }

  onRangeChangedEvent(evt) {
  //  console.log("Event Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }



}
