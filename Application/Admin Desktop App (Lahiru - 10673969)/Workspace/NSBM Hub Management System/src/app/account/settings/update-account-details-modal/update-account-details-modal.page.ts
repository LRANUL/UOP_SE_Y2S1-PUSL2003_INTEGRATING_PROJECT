import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { SideMenuPage } from '../../side-menu/side-menu.page';

@Component({
  selector: 'app-update-account-details-modal',
  templateUrl: './update-account-details-modal.page.html',
  styleUrls: ['./update-account-details-modal.page.scss'],
})
export class UpdateAccountDetailsModalPage implements OnInit {

  passedLoggedInUserId = null;
  passedLoggedInUserFaculty = null;

  loadingSpinnerAccountDetails: Boolean = true;

  editAccountDetailsForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private updateAccountDetailsService: FirestoreService,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.passedLoggedInUserId = this.navParams.get('loggedInUserId');

    this.retrieveLoggedInUserDetailsProgramOffice();

    this.editAccountDetailsForm = this.formBuilder.group({
      prefixName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      faculty: new FormControl('', Validators.required)
    });

    
  }


  // Process of updating account details
  doEditAccountDetails(value){

    this.updateAccountDetailsService.updateProgramOfficeUser(value, this.passedLoggedInUserId)
      .then(async response => {
        this.alertNotice("Account Details Updated", "Your account details has been updated.");
      }, error => {
        this.alertNotice("Error", "An error has occurred: " + error);
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


  loggedInProgramOfficeUser;
  retrieveLoggedInUserDetailsProgramOffice = () =>
    this.updateAccountDetailsService.retrieveLoggedInUserDetailsProgramOffice(this.passedLoggedInUserId).subscribe(response => {
      this.loadingSpinnerAccountDetails = false;
      this.loggedInProgramOfficeUser = 
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();

        // Assigning the values to the formgroup
        this.editAccountDetailsForm.setValue({
          prefixName: firestoreDoc.name.prefix, 
          firstName: firestoreDoc.name.firstName,
          middleName: firestoreDoc.name.middleName,
          lastName: firestoreDoc.name.lastName,
          faculty: firestoreDoc.faculty
        });
      });
    });


  closeEditAccountDetailsModal(){
    this.modalController.dismiss();
  }

}

