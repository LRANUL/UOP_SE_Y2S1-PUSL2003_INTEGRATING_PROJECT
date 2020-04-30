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

  searchEventForm: FormGroup;

  addNewEventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private eventsService: FirestoreService
  ) { }

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
      this.eventSourceEvent = []; // Clearing the exisiting events on the calendar before syncing
      (
        eventSlots.forEach(snap => {
        let eventDoc:any = snap.payload.doc.data();
        eventDoc.id = snap.payload.doc.id;
        eventDoc.title = eventDoc.eventTitle + "  | Status:  " + eventDoc.status;
        eventDoc.startTime = eventDoc.startDateTime.toDate();
        eventDoc.endTime = eventDoc.endDateTime.toDate();

        console.log(eventDoc);

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
            console.log("Alert Box: Remove Lecture Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Lecture Session Request Accepted");
            console.log(value);
            // Calling function to remove lecture session
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

  // Confirm Box Implementation (Published Event Session)
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

          }
        }

      ]
    });
    await alert.present();
  }



  doAddNewEvent(value){
    console.log(value);
    
    console.log(new Date(value.eventDate).toISOString());
    //console.log((new Date(value.eventDate).toISOString()).split(0,10));
    console.log((new Date(value.eventStartTime).toISOString()).split('T')[1]);
    console.log((new Date(value.eventEndTime).toISOString()).split('T')[1]);

    let eventDate = (new Date(value.eventDate).toISOString()).split('T')[0];
    // 2020-04-15

    let startTime = (new Date(value.eventStartTime).toISOString()).split('T')[1];
    // 18:27:20.248Z

    let endTime = (new Date(value.eventEndTime).toISOString()).split('T')[1];
    // 18:27:20.248Z

    let eventStartDateTime = new Date(eventDate + "T" + startTime);
    // 2020-04-15T18:27:20.248Z
    let eventEndDateTime = new Date(eventDate + "T" + endTime);
    // 2020-04-15T18:27:20.248Z

    console.log(eventStartDateTime);
    console.log(eventEndDateTime);

    this.eventsService.publishNewEventSession(this.sideMenuPageUserFaculty.passUserFaculty(), value, eventStartDateTime, eventEndDateTime);

    this.alertNotice("Event Added", "New event has been published.");

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
      console.log(this.noOfEventSessions);
  }

  onCurrentDateChangedEvent(event: Date){
  //  console.log("Current Event Session Date Change: " + event);

    this.noOfEventSessions = [];
  }

  onRangeChangedEvent(evt) {
  //  console.log("Event Session (Range) Changed: Start Time: " + evt.startTime + ", End Time: " + evt.endTime);
  }



}
