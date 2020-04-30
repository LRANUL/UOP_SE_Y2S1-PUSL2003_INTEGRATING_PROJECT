import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-transport-slot-modal',
  templateUrl: './edit-transport-slot-modal.page.html',
  styleUrls: ['./edit-transport-slot-modal.page.scss'],
})
export class EditTransportSlotModalPage implements OnInit {

  passedTransportSlotDocId = null;
  passedTransportSlotType = null;

  transportSlotTypeDeparture: Boolean = false;

  transportSlotTypeDestination: Boolean = false;

  editTransportSlotForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private editTransportSlot: FirestoreService,
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    // Getting the values from the parent page (semester calendar page) and assigning them to the variables
    this.passedTransportSlotDocId = this.navParams.get('transportSlotDocId');
    this.passedTransportSlotType = this.navParams.get('transportSlotType');

    this.editTransportSlotForm = this.formBuilder.group({
      departure: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      approArrivalTime: new FormControl('', Validators.required),
      availableWeekdays: new FormControl('', Validators.required),
      availableWeekends: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });


    // Assigning the values to the formgroup
    this.editTransportSlotForm.patchValue({
      departure: this.navParams.get('transportSlotDeparture'),
      destination: this.navParams.get('transportSlotDestination'),
      departureTime: this.navParams.get('transportSlotDepartureTime'),
      approArrivalTime: this.navParams.get('transportSlotApproArrivalTime'),
      availableWeekdays: this.navParams.get('transportSlotWeekdays'),
      availableWeekends: this.navParams.get('transportSlotWeekends'),
      status: this.navParams.get('transportSlotStatus')
    });


    if(this.passedTransportSlotType == "nsbmDeparture"){
      this.transportSlotTypeDestination = true;
    }
    else if(this.passedTransportSlotType == "nsbmDestination"){
      this.transportSlotTypeDeparture = true;
    }

    this.retrievePublishedSessionStatuses();
    
  }


  publishedTransportSlotStatuses;
  retrievePublishedSessionStatuses = () => 
    this.editTransportSlot.retrievePublishedSessionStatuses().subscribe(response => (this.publishedTransportSlotStatuses = response));



  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {

  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
  });

  await alert.present();

  }



  // Process of editing transport slot
  doEditTransportSlot(value) {

    this.editTransportSlot.updateTransportSlot(this.passedTransportSlotType, this.passedTransportSlotDocId, value);

    this.alertNotice("Details Updated", "Transport slot details has been updated.");

  }




  // Implementation for closing the modal
  closeEditTransportSlotModal(){
    this.modalController.dismiss();
  }

}
