import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.page.html',
  styleUrls: ['./lecturers.page.scss'],
})
export class LecturersPage implements OnInit {

  searchRegisteredLecturerForm: FormGroup;

  lecturerRegistrationForm: FormGroup;

  showLoadingDots: Boolean = false;

  pageLoadSearchLecturerText: Boolean = true;

  registerLecturerLoadingSpinner: Boolean = false;

  loggedInUserFaculty;

  disableButton: Boolean = false;

  enableButton: Boolean = true;


  constructor(
    private lecturersService: FirestoreService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router,
  ) { }

  ngOnInit() {

    



    this.loggedInUserFaculty = this.sideMenuPageUserFaculty.passUserFaculty();

    this.retrievePublishedUserStatuses();

    // Setting loading dots to false after the contents has loaded.
    this.lecturersService.retrieveRegisteredLecturers().subscribe(() => this.showLoadingDots = false)

    this.searchRegisteredLecturerForm = this.formBuilder.group({
      nsbmId: new FormControl('', Validators.required),
      nsbmEmailAddress: new FormControl('', Validators.required)
    });

    this.lecturerRegistrationForm = this.formBuilder.group({
      nsbmLecturerId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      nameTitle: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
      specializedFaculty: new FormControl('', Validators.required),
      nsbmEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25)
      ])),
      lecturerStatus: new FormControl('', Validators.required),
      termsAndConditionsAgreement: new FormControl('', Validators.required)
    });

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

  

  

  // Retrieving user statuses from the firestore database
  publishedUserStatuses;
  retrievePublishedUserStatuses = () => 
    this.lecturersService.retrievePublishedUserStatuses().subscribe(response => (this.publishedUserStatuses = response));


  registeredLecturers;

  lecturerDocId;
  lecturerNamePrefix;
  lecturerNameFirstName;
  lecturerNameMiddleName;
  lecturerNameLastName;
  lecturerNsbmLecturerId;
  lecturerNsbmEmailAddress;
  lecturerStatus;
  lecturerSpecializedFaculty;
  lecturerSpecialization;

  registeredLecturerCard: Boolean = false;

  doSearchRegisteredLecturer(value){

    // Response action if the user clicks the 'Search' button without entering a search value.
    if(value.nsbmId == "" && value.nsbmEmailAddress == ""){
      this.pageLoadSearchLecturerText = true;

      this.showLoadingDots = false;

      this.alertNotice("Error", "A search value was not entered.");
    }
    else{
      // Setting page content load text to false
      this.pageLoadSearchLecturerText = false;

      // Setting loading dots to true
      this.showLoadingDots = true;
    }

    // Searching for registered lecturer, retrieving value and showing the relevant response
    if(value.nsbmId != ""){
      this.lecturersService.searchRegisteredLecturerNSBMId(value.nsbmId).subscribe(response => {
        // Checking if any document values where returned
        if (response.length > 0){
          this.registeredLecturerCard = true;

          // Setting loading dots to false
          this.showLoadingDots = false;

          // Disabling loading text
          this.pageLoadSearchLecturerText = false;

          // Assigning retrieved values to this variables
          this.registeredLecturers = response.forEach(document => {
            let firestoreDoc: any = document.payload.doc.data();
            this.lecturerDocId = document.payload.doc.id;
            this.lecturerNamePrefix = firestoreDoc.name.prefix;
            this.lecturerNameFirstName = firestoreDoc.name.firstName;
            this.lecturerNameMiddleName = firestoreDoc.name.middleName;
            this.lecturerNameLastName = firestoreDoc.name.lastName;
            this.lecturerNsbmLecturerId = firestoreDoc.nsbmLecturerId;
            this.lecturerNsbmEmailAddress = firestoreDoc.nsbmEmailAddress;
            this.lecturerStatus = firestoreDoc.status;
            this.lecturerSpecializedFaculty = firestoreDoc.specializedFaculty;
            this.lecturerSpecialization = firestoreDoc.specialization;
          });

          if(this.lecturerStatus == "Disabled"){
            this.enableButton = true;
          }
          else if(this.lecturerStatus == "Active"){
            this.disableButton = true;
          }

          console.log("Registered Lecturer Record Found");
        }
        else{
          this.showLoadingDots = false;
          this.alertNotice("Not Found", "Registered Lecturer Record with NSBM ID: " + value.nsbmId + ", is not available");
          console.log("Registered Lecturer Record Not Found");
        }
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
        this.showLoadingDots = false;
      });
    }
    else if(value.nsbmEmailAddress){
      this.lecturersService.searchRegisteredLecturerNSBMEmail(value.nsbmEmailAddress).subscribe(response => {
        // Checking if any document values where returned
        if (response.length > 0){
          this.registeredLecturerCard = true;

          // Setting loading dots to false
          this.showLoadingDots = false;

          // Disabling loading text
          this.pageLoadSearchLecturerText = false;

          // Assigning retrieved values to this variables
          this.registeredLecturers = response.forEach(document => {
            let firestoreDoc: any = document.payload.doc.data();
            this.lecturerDocId = document.payload.doc.id;
            this.lecturerNamePrefix = firestoreDoc.name.prefix;
            this.lecturerNameFirstName = firestoreDoc.name.firstName;
            this.lecturerNameMiddleName = firestoreDoc.name.middleName;
            this.lecturerNameLastName = firestoreDoc.name.lastName;
            this.lecturerNsbmLecturerId = firestoreDoc.nsbmLecturerId;
            this.lecturerNsbmEmailAddress = firestoreDoc.nsbmEmailAddress;
            this.lecturerStatus = firestoreDoc.status;
            this.lecturerSpecializedFaculty = firestoreDoc.specializedFaculty;
            this.lecturerSpecialization = firestoreDoc.specialization;
          });

          if(this.lecturerStatus == "Disabled"){
            this.enableButton = true;
          }
          else if(this.lecturerStatus == "Active"){
            this.disableButton = true;
          }

          console.log("Registered Lecturer Record Found");
        }
        else{
          this.alertNotice("Not Found", "Registered Lecturer Record with NSBM Email Address: " + value.nsbmEmailAddress + ", is not available");
          console.log("Registered Lecturer Record Not Found");
        }
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
        this.showLoadingDots = false;
      });
    }
  }


  // Confirm Box Implementation (Disabling lecturer user account)
  async disableLecturerAccount (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Disable Lecturer User Account Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Disable Lecturer User Account Request Accepted");

            this.disableButton = false;

            // Calling function to disable user account
            this.lecturersService.disableUserAccount("lecturerUsers" , this.lecturerDocId);
            
            this.enableButton = true;

          }
        }
      ]
    });
    await alert.present();
  }

  // Confirm Box Implementation (Enabling lecturer user account)
  async enableLecturerAccount (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Enable Lecturer User Account Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Enable Lecturer User Account Request Accepted");

            this.enableButton = false;

            // Calling function to disable user account
            this.lecturersService.enableUserAccount("lecturerUsers" , this.lecturerDocId);

            this.disableButton = true;
            
          }
        }
      ]
    });
    await alert.present();
  }


  /*
  // Opening more details module popover
  async moreDetailsRegisteredModule(ev: Event, value){
    const moreDetailsModulePopover = await this.popoverController.create({
      component: MoreDetailsLecturerPopoverPage,
      componentProps: {
        lecturerDocId: this.lecturerDocId,
        lecturerNsbmId: 
      },
      event: ev
    });

    moreDetailsModulePopover.present();
  }
  */



/*
  // Opening edit registered lecturer modal 
  async editRegisteredModule(value){
    const editModuleModal = await this.modalController.create({
      component: EditModuleModalPage,
      // Passing values to the modal using 'componentProps'
      componentProps: {
        moduleDocId: value.payload.doc.id,
        moduleCode: value.payload.doc.data().moduleCode,
        moduleTitle: value.payload.doc.data().moduleTitle,
        moduleCreditsWeighting: value.payload.doc.data().creditsWeighting,
        moduleDegree: value.payload.doc.data().degree,
        moduleAwardingBodyUniversity: value.payload.doc.data().awardingBodyUniversity,
        moduleAcademicPeriodYear: value.payload.doc.data().academicPeriod.academicYear,
        moduleAcademicPeriodSemester: value.payload.doc.data().academicPeriod.academicSemester,
        moduleModuleLeader: value.payload.doc.data().moduleLeader,
        moduleAssignedLecturer: value.payload.doc.data().assignedLecturer,
        moduleAssignedLectureHall: value.payload.doc.data().assignedLectureHall,
        userFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editModuleModal.present();
  }
*/


  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();

  }


  // Process of opening show terms and conditions modal
  showTermsAndConditions() {
    console.log("New Lecturer User Registration Terms & Conditions Agreement");
  }


  doLecturerRegistration(value) {


    /*-- Lecturer User Registration Process Phase --*/
    if(value.password == value.confirmPassword){

      // Setting loading spinner to spin
      this.registerLecturerLoadingSpinner = true;

      // Firebase auth
      this.lecturersService.lecturerRegistrationDetails(value, this.sideMenuPageUserFaculty.passUserId(), this.loggedInUserFaculty)
        .then(success => {

          // Setting loading spinner to stop spinning
          this.registerLecturerLoadingSpinner = false;

          console.log(" (Firebase Auth) Lecturer Credentials Registration Successful, " + success);

          // Displaying new leaturer user created confirmation in alert message 
          this.alertNotice('Lecturer Registration Successful', 'New lecturer has been registered. New record can be viewed from the "Registered Lecturers" section.');
          this.alertNotice('Alert', 'Program Office User logged out');

         // this.router.navigate(["/login"]);
          
        }, 
        error => {
          // Setting loading spinner to stop spinning
          this.registerLecturerLoadingSpinner = false;

          console.log(" (Firebase Auth) Lecturer Credentials Registration Failed, " + error);

          if(error == "Error: The email address is already in use by another account."){
            console.log(" NSBM email already inuse by another registered user(lecturer account) ");

            // Displaying entered email already exists error in alert message 
            this.alertNotice('NSBM Email Already Exists', 'Another user with the same NSBM email address already exists.');
          }
          else{
            // Displaying new leaturer user created failure in alert message 
            this.alertNotice('Lecturer Registration Failed', 'Error has occured, please contact web administrator');
          }
          
        });
    }
    else{
      this.lecturerRegistrationForm.invalid;

      console.log(" Entered passwords do not match ");

      // Displaying entered passwords not similar error in alert message 
      this.alertNotice('Passwords Mismatch', 'Entered passwords do not match, please re-check.');
    }
    /*-- Lecturer User Registration Process Phase --*/

  }

}
