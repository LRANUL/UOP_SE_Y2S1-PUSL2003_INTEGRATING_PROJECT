import { Component, OnInit } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { AlertController, PopoverController, ModalController } from '@ionic/angular';

import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { ViewImageNoticeModalPage } from './view-image-notice-modal/view-image-notice-modal.page';
import { MoreDetailsPoStudentsPopoverPage } from './more-details-po-students-popover/more-details-po-students-popover.page';
import { MoreDetailsPoLecturersPopoverPage } from './more-details-po-lecturers-popover/more-details-po-lecturers-popover.page';
import { MoreDetailsLecturersPoPopoverPage } from './more-details-lecturers-po-popover/more-details-lecturers-po-popover.page';
import { EditPoToStudentsNoticesModalPage } from './edit-po-to-students-notices-modal/edit-po-to-students-notices-modal.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';



@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {

  loggedInUserId;

  loggedInUserFaculty;

  currentDate;

  dateThreeDaysBeformCurrentDate;

  noticePOToStudentForm: FormGroup;

  noticePOToLecturerForm: FormGroup;


  
  noNoticePOToLecturersSelectedDateText: Boolean = false;

  noNoticeLecturersToPOSelectedDateText: Boolean = false;

  noNoticePOToStudentsSelectedDateText: Boolean = false;


  noNoticePOToLecturersPastThreeDaysText: Boolean = false;

  noNoticeLecturersToPOPastThreeDaysText: Boolean = false;

  noNoticePOToStudentsPastThreeDaysText: Boolean = false;


  noticesPOToLecturersSelectPastDateText: Boolean = false;

  noticesLecturersToPOSelectPastDateText: Boolean = false;

  noticesPOToStudentsSelectPastDateText: Boolean = false;


  loadingSpinnerPOToLecturer: Boolean = true;

  loadingSpinnerLecturerToPO: Boolean = true;

  loadingSpinnerPOToStudent: Boolean = true;
  

  ngOnInit() {

    this.currentDate = new Date();

    this.dateThreeDaysBeformCurrentDate = new Date();

    this.dateThreeDaysBeformCurrentDate.setDate(this.currentDate.getDate()-3);

    this.retrieveRegisteredModules();

    this.retrievePublishedBatch();

    this.loggedInUserId = this.sideMenuPageUserFaculty.passUserId();

    this.loggedInUserFaculty = "Program Office: "+this.sideMenuPageUserFaculty.passUserFaculty();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedNoticeCategories();

    this.retrievePublishedLecturerToPONotice();

    this.retrievePublishedPOToStudentNotice();

    this.retrievePublishedPOToLecturerNotice();

    // New Student Notice Form
    this.noticePOToStudentForm = this.formBuilder.group({
      noticeTitle: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeDescription: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeCategory: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeRecipientModule: new FormControl(''),
      noticeRecipientBatch: new FormControl(''),
      noticeAuthor: new FormControl('')
    });

    this.noticePOToStudentForm.patchValue({
      noticeAuthor: this.loggedInUserFaculty
    });


    // New Lecturer Notice Form
    this.noticePOToLecturerForm = this.formBuilder.group({
      noticeTitle: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeDescription: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeCategory: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeRecipient: new FormControl('', Validators.compose([
        Validators.required
      ])),
      noticeAuthor: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.noticePOToLecturerForm.patchValue({
      noticeAuthor: this.loggedInUserFaculty
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

  

  // Retrieving published modules from the firestore database
  publishedModules;
  retrieveRegisteredModules = () => 
    this.noticesService.retrieveRegisteredModules(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedModules = response));

  // Retrieving the published batches from the firestore database
  publishedBatches;
  retrievePublishedBatch = () => 
    this.noticesService.retrievePublishedBatch(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedBatches = response));
  
  // Retrieving the registered lecture users from the firestore database
  registeredLecturerUsers;
  retrieveRegisteredLecturers = () => 
    this.noticesService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturerUsers = response));

  // Retrieving the published notice categories from the firestore database
  publishedNoticeCategories;
  retrievePublishedNoticeCategories = () => 
    this.noticesService.retrievePublishedNoticeCategories().subscribe(response => (this.publishedNoticeCategories = response));

  

    
  // Retrieving published lecturer to program office notice from the current date time to three days ago from the firestore database
  publishedNoticesLecturerTOPO;
  retrievePublishedLecturerToPONotice = () => 
    this.noticesService.retrievePublishedLecturerToPONotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => 
      {
        if(response.length > 0){
          this.loadingSpinnerLecturerToPO = false;
          this.publishedNoticesLecturerTOPO = response;
        }
        else{
          this.loadingSpinnerLecturerToPO = false;
          this.noNoticeLecturersToPOPastThreeDaysText = true;
        }
      });

  // Retrieving published program office to student notice from the current date time to three days ago from the firestore database
  publishedNoticesPOTOStudent;
  retrievePublishedPOToStudentNotice = () => 
    this.noticesService.retrievePublishedPOToStudentNotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => {
      if(response.length > 0){
        this.loadingSpinnerPOToStudent = false;
        this.publishedNoticesPOTOStudent = response;
      }
      else{
        this.loadingSpinnerPOToStudent = false;
        this.noNoticePOToStudentsPastThreeDaysText = true;
      }
    });
  
  // Retrieving published program office to lecturer notice from the current date time to three days ago from the firestore database
  publishedNoticesPOToLecturer;
  retrievePublishedPOToLecturerNotice = () => 
    this.noticesService.retrievePublishedPOToLecturerNotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => {
      if(response.length > 0){
        this.loadingSpinnerPOToLecturer = false;
        this.publishedNoticesPOToLecturer = response;
      }
      else{
        this.loadingSpinnerPOToLecturer = false;
        this.noNoticePOToLecturersPastThreeDaysText = true;
      }
    });
  



  // More details of po to students notice popover
  async moreDetailsPOStudentsNotice(ev: Event, value){
    const moreDetailsPOStudentsNoticePopover = await this.popoverController.create({
      component: MoreDetailsPoStudentsPopoverPage,
      componentProps: {
        noticeDocId: value.payload.doc.id,
        noticeCreatedFaculty: value.payload.doc.data().noticeCreated.noticeCreatedByFaculty,
        noticeCreatedDateTime: value.payload.doc.data().noticeCreated.noticeCreatedDateTime,
        noticeRecipientBatch: value.payload.doc.data().noticeRecipient.noticeRecipientBatch,
        noticeRecipientModule: value.payload.doc.data().noticeRecipient.noticeRecipientModule
      },
      event: ev
    });
    moreDetailsPOStudentsNoticePopover.present();
  }

  // More details of po to lecturers notice popover
  async moreDetailsPOLecturersNotice(ev: Event, value){
    const moreDetailsPOLecturersNoticePopover = await this.popoverController.create({
      component: MoreDetailsPoLecturersPopoverPage,
      componentProps: {
        noticeDocId: value.payload.doc.id,
        noticeCreatedFaculty: value.payload.doc.data().noticeCreated.noticeCreatedByFaculty,
        noticeCredtedDateTime: value.payload.doc.data().noticeCreated.noticeCreatedDateTime,
        noticeRecipient: value.payload.doc.data().noticeRecipient
      },
      event: ev
    });
    moreDetailsPOLecturersNoticePopover.present();
  }

  // More details of lecturers to po notice popover
  async moreDetailsLecturersPONotice(ev: Event, value){
    const moreDetailsLecturersPONoticePopover = await this.popoverController.create({
      component: MoreDetailsLecturersPoPopoverPage,
      componentProps: {
        noticeDocId: value.payload.doc.id,
        noticeCreatedLecturer: value.payload.doc.data().noticeCreated.noticeCreatedByLecturer,
        noticeCreatedDateTime: value.payload.doc.data().noticeCreated.noticeCreatedDateTime,
        noticeRecipient: value.payload.doc.data().noticeRecipient
      },
      event: ev
    });
    moreDetailsLecturersPONoticePopover.present();
  }

  // View image of event notice modal calling, opening modal
  async viewImageNotice(value){
    console.log(value);

    const viewImageNoticeModal = await this.modalController.create({
      component: ViewImageNoticeModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        noticeDocId: value.payload.doc.id,
        coverImageFileName: value.payload.doc.data().noticeCoverImage.coverImageFileName,
        coverImageFileSize: value.payload.doc.data().noticeCoverImage.coverImageFileSize,
        coverImageFilePath: value.payload.doc.data().noticeCoverImage.coverImageFilePath
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    viewImageNoticeModal.present();
  }

  // Edit PO to Students Notices Modal, opening modal
  async editPOToStudentsNotices(value){
    const editPOToStudentsNoticeModal = await this.modalController.create({
      component: EditPoToStudentsNoticesModalPage,
      // Passing value to the modal using 'componentProps'
      componentProps: {
        noticeDocId: value.payload.doc.id,
        noticeTitle: value.payload.doc.data().noticeTitle,
        noticeDescription: value.payload.doc.data().noticeDescription,
        noticeCategory: value.payload.doc.data().noticeCategory,
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editPOToStudentsNoticeModal.present();
  }
  


  

  /* Javascript Function */
  showStudentForm(){
    var userClickLecturer = document.getElementById("newNoticeSubmitLecturer");
    var userClickStudent = document.getElementById("newNoticeSubmitStudent");
    var newNoticeSectionCard = document.getElementById("newNoticeSection");
    var studentFormButton = document.getElementById("newNoticeButtonStudent");
    var lecturerFormButton = document.getElementById("newNoticeButtonLecturer");
    if(userClickLecturer.style.display === "inline"){
      userClickLecturer.style.display = "none";
      userClickStudent.style.display = "inline";
      studentFormButton.style.background = "#0B80D3";
      lecturerFormButton.style.background = "#02A5D7";
      newNoticeSectionCard.style.background = "#F3FAFC";
    }
  }

  showLecturerForm(){
    var userClickLecturer = document.getElementById("newNoticeSubmitLecturer");
    var userClickStudent = document.getElementById("newNoticeSubmitStudent");
    var newNoticeSectionCard = document.getElementById("newNoticeSection");
    var studentFormButton = document.getElementById("newNoticeButtonStudent");
    var lecturerFormButton = document.getElementById("newNoticeButtonLecturer");
    if(userClickStudent.style.display === "inline"){
      userClickStudent.style.display = "none";
      userClickLecturer.style.display = "inline";
      lecturerFormButton.style.backgroundColor = "#0B80D3";
      studentFormButton.style.backgroundColor = "#02A5D7";
      newNoticeSectionCard.style.background = "#CDE7F9";
    }
  }

  

  selectedNoticeCategoryValue: string;

  static coverImageToggleStudent: number = 0;
  toggleResultStudent: Boolean = false;

  changeUploadCoverImageStudent(toggleAction){

    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(toggleAction.detail.value == "on"){
      NoticesPage.coverImageToggleStudent++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(NoticesPage.coverImageToggleStudent%2 == 1){
      this.toggleResultStudent = true;
    }
    else if(NoticesPage.coverImageToggleStudent%2 == 0){
      this.toggleResultStudent = false;
    }

    var withUploadCoverImage = document.getElementById("withCoverImage");
    var withoutUploadCoverImage = document.getElementById("withoutCoverImage");

    if(this.toggleResultStudent == true){
      withoutUploadCoverImage.style.display = "none";
      withUploadCoverImage.style.display = "inline";
    }
    else if(this.toggleResultStudent == false){
      withoutUploadCoverImage.style.display = "inline";
      withUploadCoverImage.style.display = "none";
    }
  }


  static coverImageToggleLecturer: number = 0;
  toggleResultLecturer: Boolean = false;

  changeUploadCoverImageLecturer(toggleAction){

    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(toggleAction.detail.value == "on"){
      NoticesPage.coverImageToggleLecturer++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(NoticesPage.coverImageToggleLecturer%2 == 1){
      this.toggleResultLecturer = true;
    }
    else if(NoticesPage.coverImageToggleLecturer%2 == 0){
      this.toggleResultLecturer = false;
    }

    var withUploadCoverImageLecturer = document.getElementById("withCoverImageLecturer");
    var withoutUploadCoverImageLecturer = document.getElementById("withoutCoverImageLecturer");
    if(this.toggleResultLecturer == true){
      withoutUploadCoverImageLecturer.style.display = "none";
      withUploadCoverImageLecturer.style.display = "inline";
    }
    else if(this.toggleResultLecturer == false){
      withoutUploadCoverImageLecturer.style.display = "inline";
      withUploadCoverImageLecturer.style.display = "none";
    }
  }

  moreDetailsNotice(event, value){

  }


  // Upload Task
  task: AngularFireUploadTask;

  // Progress of upload in percentage
  percentage: Observable<any>;

  // Snapshot of the uploading file
  snapshot: Observable<any>;

  // URL of the uploaded file
  UploadedFileURL: Observable<string>;

  // Details of uploading file
  fileName: string;
  fileSize: number;
  
  // Checking upload status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  constructor(
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private noticesService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ){
    this.isFileUploading = false;
    this.isFileUploaded = false;
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

  coverImage;
  file;

  // Cover Image Viewer Process
  coverImageViewer($event): void {

    this.file = $event.target.files[0];

    let fileReader = new FileReader();

    // Validating selection of files for only images
    if(this.file.type.split('/')[0] !== 'image') {
      console.error('Unsupported File Type');

      this.alertNotice('ERROR! ', 'Selected file type is not supported. <br> Please select an image with PNG or JPG formats.');

      return;
    }

    fileReader.onload = ($event:any) => {
      this.coverImage = $event.target.result;
    }

    fileReader.readAsDataURL($event.target.files[0]);
    
  }

  // Retrieving the current date and time from the localhost
  currentDT = new Date();
  currentDateTime = this.currentDT.getDate() + "/" + (this.currentDT.getMonth()+1) + "/" + this.currentDT.getFullYear() + " " + this.currentDT.getHours() + ":" + this.currentDT.getMinutes() + ":" + this.currentDT.getSeconds();
  


  // Confirm Box Implementation (Sending Student Notice)
  async sendStudentNotice (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Send Student Notice Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Send Student Notice Request Accepted");

            this.uploadNewNoticeImageStudent(value);

          }
        }
      ]
    });
    await alert.present();
  }



  // Upload file process (Student)
  uploadNewNoticeImageStudent(value) {
    
    // If user selects values in both recipient options, batch and module
    if(value.noticeRecipientModule != "" && value.noticeRecipientBatch != ""){
      console.error('Both Recipient Options has been selected.');

      this.alertNotice('ERROR! ', 'Both recipient options has been selected, please select one option.');
    }
    else{
      
      // Checking if the cover image was toggled
      if(this.toggleResultStudent == true){
      
        // Validating selection of files for only images
        if(this.file.type.split('/')[0] !== 'image') {
          console.error('Unsupported File Type');

          this.alertNotice('ERROR! ', 'Selected file type is not supported. <br> Please select an image with PNG or JPG formats.');

          return;
        }
        else{
          // File Object
          // const file = event.item(0);
    
          this.isFileUploading = true;
          this.isFileUploaded = false;
          
          this.fileName = this.file.name;

          // Retrieving current date and time in Unix Timestamp from localhost
          var currentDateTimeUnix = new Date().getTime();
          
          // Retrieving filename of selected file
          var currentFileName = this.file.name;

          console.log("DateTime: " + currentDateTimeUnix + " FileName: " + currentFileName);

          // Storage path of the file in the firebase storage
          var path = 'files/images/noticeCoverImages/' + currentDateTimeUnix + '_' + currentFileName;

          // Custom metadata
          const customMetadata = { app: 'Notice Cover Image File' };

          // File referencing
          const fileRef = this.storage.ref(path);

          // Uploading file to firebase storage
          this.task = this.storage.upload(path, this.file, { customMetadata });
      
          // Retrieving file progress percentage
          this.percentage = this.task.percentageChanges();
          this.snapshot = this.task.snapshotChanges().pipe(
          
            finalize(() => {
            
              // Retrieving the URL of the uploaded file storage
              this.UploadedFileURL = fileRef.getDownloadURL();
     
              // Uploading notice document to firestore
              this.UploadedFileURL.subscribe(resp => {

                if(value.noticeRecipientModule != "") {
                  this.noticesService.publishNotice(this.toggleResultStudent, "notices-PO-To-Students", "Module", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                    .then(success => {
                      console.log("6");
                      console.log("Notice Sent to Students: " + success);
                      // Removing the user entered values from the input fields after the notice has been created
                      this.noticePOToStudentForm.reset();
                   
                      this.noticePOToStudentForm.patchValue({
                        noticeAuthor: this.loggedInUserFaculty
                      });
                    
                      // Displaying new notice successfully created
                      this.alertNotice('Notice Successfully Sent', 
                        'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');
                      
                      // Setting notices po to students section to null
                      this.publishedNoticesPOTOStudent = null;

                      // Retrieving PO to student notices for the past three data from the firestore database
                      this.retrievePublishedPOToStudentNotice();

                      }, error => {
                        console.log("Error: " + error);
                        this.alertNotice("ERROR", "Error has occurred: " + error);
                    });
                }
                else if (value.noticeRecipientBatch != "") {
                  this.noticesService.publishNotice(this.toggleResultStudent ,"notices-PO-To-Students", "Batch", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                    .then(success => {
                      console.log("Notice Sent to Students: " + success);
                      // Removing the user entered values from the input fields after the notice has been created
                      this.noticePOToStudentForm.reset();
                    
                      this.noticePOToStudentForm.patchValue({
                        noticeAuthor: this.loggedInUserFaculty
                      });
                      
                      // Displaying new notice successfully created
                      this.alertNotice('Notice Successfully Sent', 
                        'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');

                      // Setting notices po to students section to null
                      this.publishedNoticesPOTOStudent = null;

                      // Retrieving PO to student notices for the past three data from the firestore database
                      this.retrievePublishedPOToStudentNotice();

                    }, error => {
                      console.log("Error: " + error);
                      this.alertNotice("ERROR", "Error has occurred: " + error);
                    });
                }
              }, error => {
                console.error('Upload Error: ' + error);
                this.alertNotice('ERROR! ', 'An error has occurred during the process. Error' + error + " <br>Please contact the system web administrator.");
              })
              this.isFileUploading = false;
              this.isFileUploaded = false;
            }),
            tap(snap => {
              this.fileSize = snap.totalBytes;
            })

          )
        }
      }
      else if(this.toggleResultStudent == false){
        if( value.noticeRecipientModule != "") {
          this.noticesService.publishNotice(this.toggleResultStudent, "notices-PO-To-Students", "Module", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
            .then(success => {
              console.log("Notice Sent to Students: " + success);
              // Displaying new notice successfully created
              this.alertNotice('Notice Successfully Sent', 
                'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');
            
              // Removing the user entered values from the input fields after the notice has been created
              this.noticePOToStudentForm.reset();

              this.noticePOToStudentForm.patchValue({
                noticeAuthor: this.loggedInUserFaculty
              });

              // Setting notices po to students section to null
              this.publishedNoticesPOTOStudent = null;

              // Retrieving PO to student notices for the past three data from the firestore database
              this.retrievePublishedPOToStudentNotice();

            }, error => {
              console.log("Error: " + error);
              this.alertNotice("ERROR", "Error has occurred: " + error);
            });
        }
        else if( value.noticeRecipientBatch != "") {
          this.noticesService.publishNotice(this.toggleResultStudent, "notices-PO-To-Students", "Batch", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
            .then(success => {
              console.log("Notice Sent to Students: " + success);
              // Displaying new notice successfully created
              this.alertNotice('Notice Successfully Sent', 
                'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');

              // Removing the user entered values from the input fields after the notice has been created
              this.noticePOToStudentForm.reset();

              this.noticePOToStudentForm.patchValue({
                noticeAuthor: this.loggedInUserFaculty
              });

              // Setting notices po to students section to null
              this.publishedNoticesPOTOStudent = null;

              // Retrieving PO to student notices for the past three data from the firestore database
              this.retrievePublishedPOToStudentNotice();

            }, error => {
              console.log("Error: " + error);
              this.alertNotice("ERROR", "Error has occurred: " + error);
            });
        }    
      }
    }
  }


  

  // Confirm Box Implementation (Sending Lecturer Notice)
  async sendLecturerNotice (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Send Lecturer Notice Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Send Lecturer Notice Request Accepted");

            this.uploadNewNoticeImageLecturer(value);

          }
        }
      ]
    });
    await alert.present();
  }


  
  // Upload file process (Lecturer)
  uploadNewNoticeImageLecturer(value) {

    // Checking if the selected notice category is event
    if(this.toggleResultLecturer == true){
    
      // Validating selection of files for only images
      if(this.file.type.split('/')[0] !== 'image') {
        console.error('Unsupported File Type');

        this.alertNotice('ERROR! ', 'Selected file type is not supported. Please select an image with PNG or JPG formats.');

        return;
      }
      else{
        // File Object
        // const file = event.item(0);

        this.isFileUploading = true;
        this.isFileUploaded = false;
        
        this.fileName = this.file.name;

        // Retrieving current date and time in Unix Timestamp from localhost
        var currentDateTimeUnix = new Date().getTime();
        
        // Retrieving filename of selected file
        var currentFileName = this.file.name;

        console.log("DateTime: " + currentDateTimeUnix + " FileName: " + currentFileName);

        // Storage path of the file in the firebase storage
        var path = 'files/images/noticeCoverImages/' + currentDateTimeUnix + '_' + currentFileName;

        // Custom metadata
        const customMetadata = { app: 'Notice Cover Image File' };

        // File referencing
        const fileRef = this.storage.ref(path);

        // Uploading file to firebase storage
        this.task = this.storage.upload(path, this.file, { customMetadata });

        // Retrieving file progress percentage
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(

          finalize(() => {

            // Retrieving the URL of the uploaded file storage
            this.UploadedFileURL = fileRef.getDownloadURL();
            
            // Uploading notice document to firestore
            this.UploadedFileURL.subscribe(resp => {
              this.noticesService.publishNotice(this.toggleResultStudent, "notices-PO-To-Lecturers", "NULL", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                .then(success => {
                  console.log("Notice Sent to Lecturers: " + success);
                  // Removing the user entered values from the input fields after the notice has been created
                  this.noticePOToLecturerForm.reset();

                  this.noticePOToLecturerForm.patchValue({
                    noticeAuthor: this.loggedInUserFaculty
                  });

                  // Displaying new notice successfully sent
                  this.alertNotice('Notice Successfully Sent', 
                    'Notice has been sent. Notices can be viewed in the "Notices sent to lecturers" section below this form');

                  // Setting PO to lecturer notice section to null
                  this.publishedNoticesPOToLecturer;

                  // Retrieving PO to lecturer notices for the past three days from the firestore database
                  this.retrievePublishedPOToLecturerNotice();

                }, error => {
                  console.log("Error: " + error);
                  this.alertNotice("ERROR", "Error has occurred: " + error);
              });
            }, error => {
              console.error('Upload Error: ' + error);
              this.alertNotice('ERROR! ', 'An error has occurred during the process. Error' + error + " <br>Please contact the system web administrator.");
            });
            this.isFileUploading = false;
            this.isFileUploaded = false;
          }),
          tap(snap => {
            this.fileSize = snap.totalBytes;
          })
        )
      }
    }
    else if(this.toggleResultLecturer == false){
      this.noticesService.publishNotice(this.toggleResultStudent, "notices-PO-To-Lecturers", "NULL", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
        .then(success => {
          console.log("Notice Sent to Lecturers: " + success);
          // Removing the user entered values from the input fields after the notice has been created
          this.noticePOToLecturerForm.reset();

          this.noticePOToLecturerForm.patchValue({
            noticeAuthor: this.loggedInUserFaculty
          });

          // Displaying new notice successfully sent
          this.alertNotice('Notice Successfully Sent', 
            'Notice has been sent. Notices can be viewed in the "Notices sent to lecturers" section below this form');

          // Setting PO to lecturer notice section to null
          this.publishedNoticesPOToLecturer;

          // Retrieving PO to lecturer notices for the past three days from the firestore database
          this.retrievePublishedPOToLecturerNotice();

        }, error => {
          console.log("Error: " + error);
          this.alertNotice("ERROR", "Error has occurred: " + error);
        });
    }
  }



  // Process of retrieving notices sent to lecturers for the selected date from the firestore database
  retrieveNoticePOToLecturersSelectedDate(event){

    this.noticesPOToLecturersSelectPastDateText = false;

    this.noNoticePOToLecturersPastThreeDaysText = false;

    this.noNoticePOToLecturersSelectedDateText = false;

    // Assigning existing notices on frontend to null
    this.publishedNoticesPOToLecturer = null;

    this.loadingSpinnerPOToLecturer = true;

    let selectedDate = new Date(event.detail.value);

    selectedDate.setHours(0,0,0,0);

    let nextDate = new Date();

    nextDate.setHours(0,0,0,0);

    nextDate.setDate(selectedDate.getDate()+1);

    let currentDate = new Date();

    currentDate.setHours(0,0,0,0);
    
    if(selectedDate > currentDate){
      this.loadingSpinnerPOToLecturer = false;
      this.noticesPOToLecturersSelectPastDateText = true;
    }
    else{
      this.noticesService.retrievePublishedPOToLecturerSelectedDate(selectedDate, nextDate).subscribe(response => {
        if(response.length > 0){
          this.loadingSpinnerPOToLecturer = false;
  
          // Setting no notices text to hide
          this.noNoticePOToLecturersSelectedDateText = false;
  
          // Assigning retrieved document details
          this.publishedNoticesPOToLecturer = response;
        }
        else {
          this.loadingSpinnerPOToLecturer = false;
  
          // Setting no notices text to show
          this.noNoticePOToLecturersSelectedDateText = true;
        }
      }, error => {
        this.loadingSpinnerPOToLecturer = false;
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
      });
    }
  }



  // Process of retrieving notices sent from lectures for the selected date from the firestore database
  retrieveNoticeLecturersToPOSelectedDate(event){

    this.noNoticeLecturersToPOPastThreeDaysText = false;

    this.noNoticeLecturersToPOSelectedDateText = false;
  
    // Assigning existing notices on frontend to null
    this.publishedNoticesLecturerTOPO = null;

    this.loadingSpinnerLecturerToPO = true;

    let selectedDate = new Date(event.detail.value);

    selectedDate.setHours(0,0,0,0);

    let nextDate = new Date();

    nextDate.setHours(0,0,0,0);

    nextDate.setDate(selectedDate.getDate()+1);

    let currentDate = new Date();

    currentDate.setHours(0,0,0,0);
    
    if(selectedDate > currentDate){
      this.loadingSpinnerLecturerToPO = false;
      this.noticesLecturersToPOSelectPastDateText = true;
    }
    else{
      this.noticesService.retrievePublishedLecturerToPONoticeSelectedDate(selectedDate, nextDate).subscribe(response => {
        if(response.length > 0){
          this.loadingSpinnerLecturerToPO = false;

          // Setting no notices text to hide
          this.noNoticeLecturersToPOSelectedDateText = false;

          // Assigning retrieved document details
          this.publishedNoticesLecturerTOPO = response;
        }
        else {
          this.loadingSpinnerLecturerToPO = false;

          // Setting no notices text to show
          this.noNoticeLecturersToPOSelectedDateText = true;
        }
      }, error => {
        this.loadingSpinnerLecturerToPO = false;
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
      });
    }
  }


  
  // Process of retrieving notices sent to students for the selected date from the firestore database
  retrieveNoticePOToStudentsSelectedDate(event){

    this.noNoticePOToStudentsPastThreeDaysText = false;

    this.noNoticePOToStudentsSelectedDateText = false;

    // Assigning existing notices on frontend to null
    this.publishedNoticesPOTOStudent = null;

    this.loadingSpinnerPOToStudent = true;

    let selectedDate = new Date(event.detail.value);

    selectedDate.setHours(0,0,0,0);

    let nextDate = new Date();

    nextDate.setHours(0,0,0,0);

    nextDate.setDate(selectedDate.getDate()+1);

    let currentDate = new Date();

    currentDate.setHours(0,0,0,0);
    
    if(selectedDate > currentDate){
      this.loadingSpinnerPOToStudent = false;
      this.noticesPOToStudentsSelectPastDateText = true;
    }
    else{
      this.noticesService.retrievePublishedPOToStudentNoticeSelectedDate(selectedDate, nextDate).subscribe(response => {
        if(response.length > 0){
          this.loadingSpinnerPOToStudent = false;

          // Setting no notices text to hide
          this.noNoticePOToStudentsSelectedDateText = false;

          // Assigning retrieved document details
          this.publishedNoticesPOTOStudent = response;
        }
        else {
          this.loadingSpinnerPOToStudent = false;

          // Setting no notices text to show
          this.noNoticePOToStudentsSelectedDateText = true;
        }
      }, error => {
        this.loadingSpinnerPOToStudent = false;
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
      });
    }
  }









  // Confirm Box Implementation (Remove PO to Students Notice)
  async removePOStudentsNotice (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove PO To Students Notice Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove PO To Students Request Accepted");

            // Removing student notice cover image from the firebase storage
            if(value.payload.doc.data().noticeCoverImage != null){
              this.noticesService.removeCoverImage(value.payload.doc.data().noticeCoverImage.coverImageFilePath)
                .then(success => {
                // console.log("Notice cover image successfully removed from firebase storage.");
                // this.alertNotice("Notice Cover Image Removed", "Notice cover image successfully removed.");
                }, error => {
                  console.log("Error: " + error);
                  this.alertNotice("Error", "Notice cover image removal error: " + error);
              });
            }

            // Removing student notice document from the firestore database
            this.noticesService.removePublishedPOToStudentsNotice(value.payload.doc.id)
              .then(success => {
                console.log("Notice Removed", "Notice has been successfully removed.");
                this.alertNotice("Notice Removed", "Notice has been successfully removed.");
              }, error => {
                console.log("Error: " + error);
                this.alertNotice("Error", "Notice removal error: " + error);
            });

          }
        }
      ]
    });
    await alert.present();
  }


  // Confirm Box Implementation (Remove PO to Lecturers Notice)
  async removePOLecturersNotice (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove PO To Lecturers Notice Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove PO To Lecturers Request Accepted");

            // Removing lecturer notice cover image from the firebase storage
            if(value.payload.doc.data().noticeCoverImage != null){
              this.noticesService.removeCoverImage(value.payload.doc.data().noticeCoverImage.coverImageFilePath)
                .then(success => {
                // console.log("Lecturer Notice cover image successfully removed from firebase storage.");
                // this.alertNotice("Lecturer Notice Cover Image Removed", "Lecturer Notice cover image successfully removed.");
                }, error => {
                  console.log("Error: " + error);
                  this.alertNotice("Error", "Lecturer Notice cover image removal error: " + error);
              });
            }

            // Removing lecturer notice document from the firestore database
            this.noticesService.removePublishedPOToLecturersNotice(value.payload.doc.id)
              .then(success => {
                console.log("Lecturer Notice Removed", "Lecturer Notice has been successfully removed.");
                this.alertNotice("Lecturer Notice Removed", "Lecturer Notice has been successfully removed.");
              }, error => {
                console.log("Error: " + error);
                this.alertNotice("Error", "Lecturer Notice removal error: " + error);
            });

          }
        }
      ]
    });
    await alert.present();
  }


}
