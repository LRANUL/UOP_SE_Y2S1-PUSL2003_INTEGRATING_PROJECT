import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { EditTransportSlotModalPage } from './edit-transport-slot-modal/edit-transport-slot-modal.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';

@Component({
  selector: 'app-transportation-schedule',
  templateUrl: './transportation-schedule.page.html',
  styleUrls: ['./transportation-schedule.page.scss'],
})
export class TransportationSchedulePage implements OnInit {

  addNewTransportationSlotForm: FormGroup;

  defaultFormContent: Boolean = true;

  userSelectedFormOptionDeparture: Boolean = false;

  userSelectedFormOptionDestination: Boolean = false;

  userSelectedOption;

  userSelectedOptionValue;

  loadingSpinnerTransportSlotsDestination: Boolean = true;

  loadingSpinnerTransportSlotsDeparture: Boolean = true;
  

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private transportationScheduleService: FirestoreService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    this.addNewTransportationSlotForm = this.formBuilder.group({
      formContent: new FormControl('', Validators.required),
      departure: new FormControl(''),
      destination: new FormControl(''),
      departureTime: new FormControl('', Validators.required),
      approArrivalTime: new FormControl('', Validators.required),
      availableWeekdays: new FormControl(''),
      availableWeekends: new FormControl(''),
      status: new FormControl('', Validators.required)
    });


    this.retrievePublishedTransportationSchedules();

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

  

  publishedTransportationSlotsDestination;
  publishedTransportationSlotsDeparture;
  retrievePublishedTransportationSchedules = () => {
    // Loading spinner active until content is loaded
    this.transportationScheduleService.retrievePublishedTransportationSchedules("nsbmDestination").subscribe(() => this.loadingSpinnerTransportSlotsDestination = false);
    this.transportationScheduleService.retrievePublishedTransportationSchedules("nsbmDeparture").subscribe(() => this.loadingSpinnerTransportSlotsDeparture = false);

    // Retrieving the relavant content from the firestore database
    this.transportationScheduleService.retrievePublishedTransportationSchedules("nsbmDestination").subscribe(response => (this.publishedTransportationSlotsDestination = response));
    this.transportationScheduleService.retrievePublishedTransportationSchedules("nsbmDeparture").subscribe(response => (this.publishedTransportationSlotsDeparture = response));
  }

  publishedTransportSlotStatuses;
  retrievePublishedSessionStatuses = () =>
    this.transportationScheduleService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedTransportSlotStatuses = response)); 

  
  // Load form content depending on departure and destination selection
  async loadFormContent(event){

    this.userSelectedOption = event.detail.value;

    this.defaultFormContent = false;

    this.userSelectedFormOptionDeparture = false;
    this.userSelectedFormOptionDestination = false;
    
    console.log("Reponse: " + event.detail.value);

    if(this.userSelectedOption == "nsbmDeparture"){
      this.userSelectedFormOptionDestination = true;
    }
    else if(this.userSelectedOption == "nsbmDestination"){
      this.userSelectedFormOptionDeparture = true;
    }

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


  // Editing transport slot modal calling, opening modal
  async editTransportSlot(transportSlotType, value){
    console.log(value);

    const editTransportSlotModal = await this.modalController.create({
      component: EditTransportSlotModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        transportSlotType: transportSlotType,
        transportSlotDocId: value.payload.doc.id,
        transportSlotDeparture: value.payload.doc.data().departure,
        transportSlotDestination: value.payload.doc.data().destination,
        transportSlotDepartureTime: value.payload.doc.data().departureTime,
        transportSlotApproArrivalTime: value.payload.doc.data().approximatedArrivalTime,
        transportSlotWeekdays: value.payload.doc.data().availableWeekdays,
        transportSlotWeekends: value.payload.doc.data().availableWeekends,
        transportSlotStatus: value.payload.doc.data().status
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editTransportSlotModal.present();
  }




  doAddNewTransportationSlot(value){

    console.log(value);

    // Publishing new transportation slot and add the details to the firestore database
    this.transportationScheduleService.publishNewTransportSlot(this.userSelectedOption, value, this.sideMenuPageUserFaculty.passUserId());

    this.alertNotice("Slot Added", "New transportation slot has been published.");

  }



  // Confirm Box Implementation (Remove transport slot)
  async removeTransportSlot ( title: string, content: string, transportSlotType, value) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Transportation Slot Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Transportation Slot Request Accepted");

            // Calling function to remove transport slot
            this.transportationScheduleService.removePublishedTransportSlot(transportSlotType, value.payload.doc.id);
            
            this.alertNotice("Slot Removed", "Transportation slot has been removed.");

          }
        }

      ]
    });

    await alert.present();
  }



}
