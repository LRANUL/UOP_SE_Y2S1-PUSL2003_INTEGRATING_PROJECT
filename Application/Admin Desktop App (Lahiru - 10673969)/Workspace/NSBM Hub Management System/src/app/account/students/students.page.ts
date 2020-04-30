import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  searchRegisteredStudentForm: FormGroup;

  registeredStudentCard: Boolean = false;

  showLoadingDots: Boolean = false;

  pageLoadSearchStudentText: Boolean = true;

  disableButton: Boolean = false;

  enableButton: Boolean = false;

  constructor(
    private studentsService: FirestoreService,
    private formBuilder: FormBuilder,
    private sideMenuPageUserFaculty: SideMenuPage,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    this.searchRegisteredStudentForm = this.formBuilder.group({
      nsbmId: new FormControl('', Validators.required),
      nsbmEmailAddress: new FormControl('', Validators.required)
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



  registeredStudents;

  studentDocId;
  studentNamePrefix;
  studentNameFirstName;
  studentNameMiddleName;
  studentNameLastName;
  studentNsbmStudentId;
  studentNsbmEmailAddress;
  studentBatch;
  studentDegree;
  studentAwardingBodyUniversity;
  studentStatus;


  doSearchRegisteredStudent(value){

    // Response action if the user clicks the 'Search' button without entering a search value.
    if(value.nsbmId == "" && value.nsbmEmailAddress == ""){

      this.pageLoadSearchStudentText = true;

      this.showLoadingDots = false;

      this.alertNotice("Error", "A search value was not entered.");
    }
    else{
      // Setting page content load text to false
      this.pageLoadSearchStudentText = false;

      // Setting loading dots to true
      this.showLoadingDots = true;
    }

    // Searching for registered lecturer, retrieving value and showing the relevant response
    if(value.nsbmId != ""){
      this.studentsService.searchRegisteredStudentNSBMId(value.nsbmId).subscribe(response => {
        // Checking if any document values where returned
        if (response.length > 0){
          this.registeredStudentCard = true;

          // Setting loading dots to false
          this.showLoadingDots = false;

          // Disabling loading text
          this.pageLoadSearchStudentText = false;

          // Assigning retrieved values to this variables
          this.registeredStudents = response.forEach(document => {
            let firestoreDoc: any = document.payload.doc.data();
            this.studentDocId = document.payload.doc.id;
            this.studentNamePrefix = firestoreDoc.name.prefix;
            this.studentNameFirstName = firestoreDoc.name.firstName;
            this.studentNameMiddleName = firestoreDoc.name.middleName;
            this.studentNameLastName = firestoreDoc.name.lastName;
            this.studentNsbmStudentId = firestoreDoc.nsbmStudentID;
            this.studentNsbmEmailAddress = firestoreDoc.Email;
            this.studentBatch = firestoreDoc.batch;
            this.studentDegree = firestoreDoc.degree;
            this.studentAwardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
            this.studentStatus = firestoreDoc.status;
          });

          if(this.studentStatus == "Disabled"){
            this.enableButton = true;
          }
          else if(this.studentStatus == "Active"){
            this.disableButton = true;
          }

          console.log("Registered Lecturer Record Found");
        }
        else{
          this.showLoadingDots = false;
          this.alertNotice("Not Found", "Registered Student Record with NSBM ID: " + value.nsbmId + ", is not available");
          console.log("Registered Student Record Not Found");
        }
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
        this.showLoadingDots = false;
      });
    }
    else if(value.nsbmEmailAddress){
      this.studentsService.searchRegisteredStudentNSBMEmail(value.nsbmEmailAddress).subscribe(response => {
        // Checking if any document values where returned
        if (response.length > 0){
          this.registeredStudentCard = true;

          // Setting loading dots to false
          this.showLoadingDots = false;

          // Disabling loading text
          this.pageLoadSearchStudentText = false;

          // Assigning retrieved values to this variables
          this.registeredStudents = response.forEach(document => {
            let firestoreDoc: any = document.payload.doc.data();
            this.studentDocId = document.payload.doc.id;
            this.studentNamePrefix = firestoreDoc.name.prefix;
            this.studentNameFirstName = firestoreDoc.name.firstName;
            this.studentNameMiddleName = firestoreDoc.name.middleName;
            this.studentNameLastName = firestoreDoc.name.lastName;
            this.studentNsbmStudentId = firestoreDoc.nsbmStudentID;
            this.studentNsbmEmailAddress = firestoreDoc.Email;
            this.studentBatch = firestoreDoc.batch;
            this.studentDegree = firestoreDoc.degree;
            this.studentAwardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
            this.studentStatus = firestoreDoc.status;
          });

          if(this.studentStatus == "Disabled"){
            this.enableButton = true;
          }
          else if(this.studentStatus == "Active"){
            this.disableButton = true;
          }

          console.log("Registered Student Record Found");
        }
        else{
          this.alertNotice("Not Found", "Registered Student Record with NSBM Email Address: " + value.nsbmEmailAddress + ", is not available");
          console.log("Registered Student Record Not Found");
        }
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
        this.showLoadingDots = false;
      });
    }
  }

  // Confirm Box Implementation (Disabling student user account)
  async disableStudentAccount (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Disable Student User Account Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Disable Student User Account Request Accepted");

            this.disableButton = false;

            // Calling function to disable user account
            this.studentsService.disableUserAccount("studentUsers" , this.studentDocId);

            this.enableButton = true;

          }
        }
      ]
    });
    await alert.present();
  }

  // Confirm Box Implementation (Enabling student user account)
  async enableStudentAccount (title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Enable Student User Account Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Enable Student User Account Request Accepted");

            this.enableButton = false;

            // Calling function to disable user account
            this.studentsService.enableUserAccount("studentUsers" , this.studentDocId);

            this.disableButton = true;
            
          }
        }
      ]
    });
    await alert.present();
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

}

