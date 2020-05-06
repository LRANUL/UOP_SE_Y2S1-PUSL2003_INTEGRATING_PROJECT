import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-edit-event-session-modal',
  templateUrl: './edit-event-session-modal.page.html',
  styleUrls: ['./edit-event-session-modal.page.scss'],
})
export class EditEventSessionModalPage implements OnInit {

  passedEventSessionDocId = null;
  passedEventStartDateTime = null;
  passedEventEndDateTime = null;
  passedUserFaculty = null;

  eventDate = null;
  eventSessionStartTime = null;
  eventSessionEndTime = null;

  editEventSessionForm: FormGroup;

  // Setting min validation for angular material calendar
  minDate: Date;

  // Setting max validation for angular material calendar
  maxDate: Date;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editEventSessionService: FirestoreService,
    private alertController: AlertController
  ) {
    
    // Retrieving current date and setting as min data
    this.minDate = new Date();

    // Retrieving the current year
    const currentYear = new Date().getFullYear();
    // Setting the max date december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);

   }

  ngOnInit() {

    // Getting the values from the parent page (events page) and assigning them to the variables
    this.passedEventSessionDocId = this.navParams.get('eventSessionDocId');
    
    
    this.passedEventStartDateTime = this.navParams.get('eventStartDateTime');
    this.passedEventEndDateTime = this.navParams.get('eventEndDateTime');
    this.passedUserFaculty = this.navParams.get('userFaculty');

    // Passing event session start datetime,
    // Converting passed value to date format from the firestore timestamp format
    this.eventDate = this.passedEventStartDateTime.toDate();

    // Setting the time section of the datetime to zero
    this.eventDate.setHours(0,0,0,0);

    // Retracting the event start time in format: Hour:Minute AM/PM, Sample: 09:00 AM
    this.eventSessionStartTime = this.passedEventStartDateTime.toDate().toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true});

    // Retracting the event end time in format: Hour:Minute AM/PM, Sample: 05:00 PM
    this.eventSessionEndTime = this.passedEventEndDateTime.toDate().toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true});

    this.retrievePublishedSessionStatuses();

    this.editEventSessionForm = this.formBuilder.group({
      eventTitle: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required),
      eventStartTime: new FormControl('', Validators.required),
      eventEndTime: new FormControl('', Validators.required),
      eventStatus: new FormControl('', Validators.required)
    });

    this.editEventSessionForm.patchValue({
      eventTitle: this.navParams.get('eventTitle'),
      eventDate: this.eventDate,
      eventStartTime: this.eventSessionStartTime,
      eventEndTime: this.eventSessionEndTime,
      eventStatus: this.navParams.get('eventStatus')
    });

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


  // Retrieving session statuses from the firestore database
  publishedSessionStatuses;
  retrievePublishedSessionStatuses = () =>
    this.editEventSessionService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));





  // Confirm Box Implementation (Edit Published Event Session)
  async editPublishedEventSession ( title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Edit Published Event Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Edit Published Event Session Request Accepted");

            // Calling function to edit published event session
            this.doEditEventSession(value);
          }
        }
      ]
    });
    await alert.present();
  }



  doEditEventSession(value){
    // Extracting month, date and year from selected event session date, sample format - 04/30/2020
    // Month has to be incremented by one because the month range is retrieve by - 0-11
    let eventSessionDate = (new Date(value.eventDate).getMonth()+1) + "/" + new Date(value.eventDate).getDate() + "/" + new Date(value.eventDate).getFullYear();

    // Merging event session date and event session start time into date format
    let eventSessionStartDateTime = new Date(eventSessionDate + " " + value.eventStartTime);

    // Merging event session date and event session end time into date format
    let eventSessionEndDateTime = new Date(eventSessionDate + " " + value.eventEndTime);

    this.editEventSessionService.updateEventSession(this.passedUserFaculty, this.passedEventSessionDocId, value, eventSessionStartDateTime, eventSessionEndDateTime)
    .then(success => {
        this.alertNotice("Event Updated", "Event session details have been updated.");
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("ERROR", "Error has occurred: " + error);
    });


  }




  // Implementation for closing the modal
  closeEditEventSessionModal(){
    this.modalController.dismiss();
  }


}
