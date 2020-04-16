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
  passedEventTitle = null;
  passedEventStartDateTime = null;
  passedEventEndDateTime = null;
  passedEventStatus = null;
  passedUserFaculty = null;

  editEventSessionForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editEventSessionService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    // Getting the values from the parent page (events page) and assigning them to the variables
    this.passedEventSessionDocId = this.navParams.get('eventSessionDocId');
    
    this.passedEventTitle = this.navParams.get('eventTitle');
    this.passedEventStartDateTime = this.navParams.get('eventStartDateTime');
    this.passedEventEndDateTime = this.navParams.get('eventEndDateTime');
    this.passedEventStatus = this.navParams.get('eventStatus');
    this.passedUserFaculty = this.navParams.get('userFaculty');

    this.retrievePublishedSessionStatuses();

    this.editEventSessionForm = this.formBuilder.group({
      eventTitle: new FormControl(''),
      eventDate: new FormControl(''),
      eventStartTime: new FormControl(''),
      eventEndTime: new FormControl(''),
      eventStatus: new FormControl('')
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

  doEditEventSession(value){

    let eventDate = (new Date(value.eventDate).toISOString()).split('T')[0];
  
    let startTime = (new Date(value.eventStartTime).toISOString()).split('T')[1];

    let endTime = (new Date(value.eventEndTime).toISOString()).split('T')[1];

    let eventStartDateTime = new Date(eventDate + "T" + startTime);
    let eventEndDateTime = new Date(eventDate + "T" + endTime);

    console.log(eventStartDateTime);
    console.log(eventEndDateTime);

    this.editEventSessionService.updateEventSession(this.passedUserFaculty, this.passedEventSessionDocId, value, eventStartDateTime, eventEndDateTime);

    this.alertNotice("Event Updated", "Event session details have been updated.");
  }




  // Implementation for closing the modal
  closeEditEventSessionModal(){
    this.modalController.dismiss();
  }


}
