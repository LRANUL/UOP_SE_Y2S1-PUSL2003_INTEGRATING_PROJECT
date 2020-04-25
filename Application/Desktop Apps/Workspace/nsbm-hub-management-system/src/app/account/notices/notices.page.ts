import { Component, OnInit } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { EventNoticeData, NoticeData } from '../../types';

import { AlertController, PopoverController, ModalController } from '@ionic/angular';

import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { MoreDetailsNoticePopoverPage } from './more-details-notice-popover/more-details-notice-popover.page';
import { ViewImageNoticeModalPage } from './view-image-notice-modal/view-image-notice-modal.page';



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

  // Retrieve notices current datetime
  currentDateTimeRNObject;

  // Retrieve notices current datetime
  currentDateTimeRN;

  noticePOToStudentForm: FormGroup;
  noticePOToLecturerForm: FormGroup;

  ngOnInit() {

    this.currentDate = new Date();

    this.dateThreeDaysBeformCurrentDate = new Date();

    this.dateThreeDaysBeformCurrentDate.setDate(this.currentDate.getDate()-3);

    this.retrieveRegisteredModules();

    this.retrievePublishedBatch();

    this.loggedInUserId = this.sideMenuPageUserFaculty.passUserId();

    this.loggedInUserFaculty = this.sideMenuPageUserFaculty.passUserFaculty();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedSessionStatuses();

    this.currentDateTimeRNObject = new Date();

    this.currentDateTimeRN = new Date().toISOString();//this.currentDateTimeRNObject.getFullYear() + "-" + (this.currentDateTimeRNObject.getMonth() + 1) + "-" + this.currentDateTimeRNObject.getDate();

    console.log(this.currentDateTimeRN);

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
      noticeAuthor: new FormControl('', Validators.compose([
        Validators.required
      ]))
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
    
  }

  // Retrieving published modules from the firestore database
  publishedModules;
  retrieveRegisteredModules = () => 
    this.noticesService.retrieveRegisteredModules(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedModules = response));

  // Retrieving the published batches from the firesore database
  publishedBatches;
  retrievePublishedBatch = () => 
    this.noticesService.retrievePublishedBatch(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedBatches = response));
  
  // Retrieving the registered lecture users from the firestore database
  registeredLecturerUsers;
  retrieveRegisteredLecturers = () => 
    this.noticesService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturerUsers = response));

  // Retrieving the published session status from the firestore
  publishedSessionStatuses;
  retrievePublishedSessionStatuses = () => 
    this.noticesService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));



    
  // Retrieving published lecturer to program office notice from the current date time to three days ago from the firestore database
  publishedNoticesLecturerTOPO;
  retrievePublishedLecturerToPONotice = () => 
    this.noticesService.retrievePublishedLecturerToPONotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => (this.publishedNoticesLecturerTOPO = response));

  // Retrieving published  program office to student notice from the current date time to three days ago from the firestore database
  publishedNoticesPOTOStudent;
  retrievePublishedPOToStudentNotice = () => 
    this.noticesService.retrievePublishedPOToStudentNotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => (this.publishedNoticesPOTOStudent = response));
  
  // Retrieving published program office to lecturer notice from the current date time to three days ago from the firestore database
  publishedNoticesPOToLecturer;
  retrievePublishedPOToLecturerNotice = () => 
    this.noticesService.retrievePublishedPOToLecturerNotice(this.currentDate, this.dateThreeDaysBeformCurrentDate).subscribe(response => (this.publishedNoticesPOToLecturer = response));
  



  // More details of notice popover
  async moreDetailsNotice(ev: Event, value){
    console.log(value);
    const moreDetailsNoticePopover = await this.popoverController.create({
      component: MoreDetailsNoticePopoverPage,
      componentProps: {
        noticeDocId: value.payload.doc.id,
        noticeCreatedFaculty: value.payload.doc.data().noticeCreated.noticeCreatedByFaculty,
        noticeCredtedDateTime: value.payload.doc.data().noticeCreated.noticeCreatedDateTime,
        noticeRecipientBatch: value.payload.doc.data().noticeRecipient.noticeRecipientBatch,
        noticeRecipientModule: value.payload.doc.data().noticeRecipient.noticeRecipientModule
      },
      event: ev
    });
    console.log(value.payload.doc.data().noticeRecipient.noticeRecipientBatch);
    console.log(value.payload.doc.data().noticeRecipient.noticeRecipientModule);
    moreDetailsNoticePopover.present();
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
  


  

  /* Javascript Function */
  showLecturerForm(){
    var userClickLecture = document.getElementById("newNoticeSubmitLecturer");
    var userClickStudent = document.getElementById("newNoticeSubmitStudent");
    var newNoticeSectionCard = document.getElementById("newNoticeSection");
    if(userClickStudent.style.display === "inline"){
      userClickStudent.style.display = "none";
      userClickLecture.style.display = "inline";
      newNoticeSectionCard.style.background = "#CDE7F9";
    }
  }

  showStudentForm(){
    var userClickLecture = document.getElementById("newNoticeSubmitLecturer");
    var userClickStudent = document.getElementById("newNoticeSubmitStudent");
    var newNoticeSectionCard = document.getElementById("newNoticeSection");
    if(userClickLecture.style.display === "inline"){
      userClickLecture.style.display = "none";
      userClickStudent.style.display = "inline";
      newNoticeSectionCard.style.background = "#F3FAFC";
    }
  }

  selectedNoticeCategoryValue: string;

  static coverImageToggle: number = 0;
  toggleResult: Boolean = false;

  changeUploadCoverImage(toggleAction, formType){

    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(toggleAction.detail.value == "on"){
      NoticesPage.coverImageToggle++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(NoticesPage.coverImageToggle%2 == 1){
      this.toggleResult = true;
    }
    else if(NoticesPage.coverImageToggle%2 == 0){
      this.toggleResult = false;
    }
    console.log(this.toggleResult);

    if(formType == "StudentForm"){
      var withUploadEventCoverImage = document.getElementById("withEventCoverImage");
      var withoutUploadEventCoverImage = document.getElementById("withoutEventCoverImage");

      if(this.toggleResult == true){
        withoutUploadEventCoverImage.style.display = "none";
        withUploadEventCoverImage.style.display = "inline";
      }
      else if(this.toggleResult == false){
        withoutUploadEventCoverImage.style.display = "inline";
        withUploadEventCoverImage.style.display = "none";
      }
    }
    else if(formType == "LecturerForm"){
      var withUploadEventCoverImageLecturer = document.getElementById("withEventCoverImageLecturer");
      var withoutUploadEventCoverImageLecturer = document.getElementById("withoutEventCoverImageLecturer");
      if(this.toggleResult == true){
        withoutUploadEventCoverImageLecturer.style.display = "none";
        withUploadEventCoverImageLecturer.style.display = "inline";
      }
      else if(this.toggleResult == false){
        withoutUploadEventCoverImageLecturer.style.display = "inline";
        withUploadEventCoverImageLecturer.style.display = "none";
      }
    }
  }



  // Upload Task
  task: AngularFireUploadTask;

  // Progress of upload in percentage
  percentage: Observable<any>;

  // Snapshot of the uploading file
  snapshot: Observable<any>;

  // URL of the uploaded file
  UploadedFileURL: Observable<string>;

  // Uploaded images list
  images: Observable<EventNoticeData[]>;

  // Details of uploading file
  fileName: string;
  fileSize: number;
  
  // Checking upload status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private imageCollectionStudent: AngularFirestoreCollection<EventNoticeData>;

  private imageCollectionLecturer: AngularFirestoreCollection<EventNoticeData>;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private alertController: AlertController,
    private noticesService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ){
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Collection set of where the eventNoticeData will be saved 
    this.imageCollectionStudent = database.collection<EventNoticeData>('notices/noticeTypes/notices-PO-To-Students');

    this.imageCollectionLecturer = database.collection<EventNoticeData>('notices/noticeTypes/notices-PO-To-Lecturers');
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

  eventCoverImage;
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
      this.eventCoverImage = $event.target.result;
    }

    fileReader.readAsDataURL($event.target.files[0]);
    
  }

  // Retriving the current date and time from the localhost
  currentDT = new Date();
  currentDateTime = this.currentDT.getDate() + "/" + (this.currentDT.getMonth()+1) + "/" + this.currentDT.getFullYear() + " " + this.currentDT.getHours() + ":" + this.currentDT.getMinutes() + ":" + this.currentDT.getSeconds();
  

  // Upload file process (Student)
  uploadNewNoticeImageStudent(value) {

    // Checking if the cover image was toggled
    if(this.toggleResult == true){
    
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
        var path = 'files/images/notices/events/' + currentDateTimeUnix + '_' + currentFileName;

        // Custom metadata
        const customMetadata = { app: 'Event Notice Cover Image File' };

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

              if(value.noticeRecipientModule == "" ) {
                this.noticesService.publishNotice(this.toggleResult, "notices-PO-To-Students", "Module", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                  .then(success => {
                    console.log("Notice Sent to Students: " + success);
                    // Removing the user entered values from the input fields after the notice has been created
                    this.noticePOToStudentForm.reset();
                    
                    // Displaying new notice successfully created
                    this.alertNotice('Notice Successfully Sent', 
                      'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');
                  }, error => {
                    console.log("Error: " + error);
                    this.alertNotice("ERROR", "Error has occurred: " + error);
                  });
              }
              else if (value.noticeRecipientBatch == "" ) {
                this.noticesService.publishNotice(this.toggleResult ,"notices-PO-To-Students", "Batch", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                  .then(success => {
                    console.log("Notice Sent to Students: " + success);
                    // Removing the user entered values from the input fields after the notice has been created
                    this.noticePOToStudentForm.reset();
                    
                    // Displaying new notice successfully created
                    this.alertNotice('Notice Successfully Sent', 
                      'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');
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
    else if(this.toggleResult == false){
      if( value.noticeRecipientModule == "" ) {
        this.noticesService.publishNotice(this.toggleResult, "notices-PO-To-Students", "Module", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
          .then(success => {
            console.log("Notice Sent to Students: " + success);
            // Displaying new notice successfully created
            this.alertNotice('Notice Successfully Sent', 
              'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');

            // Removing the user entered values from the input fields after the notice has been created
            this.noticePOToStudentForm.reset();
          }, error => {
            console.log("Error: " + error);
            this.alertNotice("ERROR", "Error has occurred: " + error);
          });
      }
      else if( value.noticeRecipientBatch == "" ) {
        this.noticesService.publishNotice(this.toggleResult, "notices-PO-To-Students", "Batch", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
          .then(success => {
            console.log("Notice Sent to Students: " + success);
            // Displaying new notice successfully created
            this.alertNotice('Notice Successfully Sent', 
              'Notice has been sent. Notices can be viewed in the "Notices sent to students" section on the right side of the screen.');

            // Removing the user entered values from the input fields after the notice has been created
            this.noticePOToStudentForm.reset();
          }, error => {
            console.log("Error: " + error);
            this.alertNotice("ERROR", "Error has occurred: " + error);
          });
      }    
    }
  }


  

  // Method for adding notice document to firestore (Student Event Notice)
  addNewEventNoticeDocumentToDB_Student(data: EventNoticeData){

    // Creating an ID for the document
    const id = this.database.createId();

    // Setting document ID with the value in database
    this.imageCollectionStudent.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred: " + error);
    })
  }

  // (Student Module or Lecture Notice)
  addNewNoticeDcouementToDB_Student(data: NoticeData){
    
    const id = this.database.createId();

    this.imageCollectionStudent.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred:" + error);
    })
  }




  
  // Upload file process (Lecturer)
  uploadNewNoticeImageLecturer(value) {

    // Checking if the selected notice category is event
    if(this.toggleResult == true){
    
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
        var path = 'files/images/notices/events/' + currentDateTimeUnix + '_' + currentFileName;

        // Custom metadata
        const customMetadata = { app: 'Event Notice Cover Image File' };

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
              this.noticesService.publishNotice(this.toggleResult, "notices-PO-To-Lecturers", "NULL", this.file.name, resp, this.fileSize, this.sideMenuPageUserFaculty.passUserId(), value)
                .then(success => {
                  console.log("Notice Sent to Lecturers: " + success);
                  // Removing the user entered values from the input fields after the notice has been created
                  this.noticePOToLecturerForm.reset();

                  // Displaying new notice successfully sent
                  this.alertNotice('Notice Successfully Sent', 
                    'Notice has been sent. Notices can be viewed in the "Notices sent to lecturers" section below this form');
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
    else if(this.toggleResult == false){
      this.noticesService.publishNotice(this.toggleResult, "notices-PO-To-Lecturers", "NULL", "NULL", "NULL", "NULL", this.sideMenuPageUserFaculty.passUserId(), value)
        .then(success => {
          console.log("Notice Sent to Lecturers: " + success);
          // Removing the user entered values from the input fields after the notice has been created
          this.noticePOToLecturerForm.reset();

          // Displaying new notice successfully sent
          this.alertNotice('Notice Successfully Sent', 
            'Notice has been sent. Notices can be viewed in the "Notices sent to lecturers" section below this form');
        }, error => {
          console.log("Error: " + error);
          this.alertNotice("ERROR", "Error has occurred: " + error);
        });
    }
  }


  // Method for adding notice document to firestore (Lecturer Event Notice)
  addNewEventNoticeDocumentToDB_Lecturer(data: EventNoticeData){

    // Creating an ID for the document
    const id = this.database.createId();

    // Setting document ID with the value in database
    this.imageCollectionLecturer.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred: " + error);
    })
  }

  // (Lecturer Module or Lecture Notice)
  addNewNoticeDcouementToDB_Lecturer(data: NoticeData){
    
    const id = this.database.createId();

    this.imageCollectionLecturer.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred:" + error);
    })
  }






}
