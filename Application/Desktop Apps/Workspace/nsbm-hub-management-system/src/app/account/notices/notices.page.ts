import { Component, OnInit } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { EventNoticeData, NoticeData } from '../../types';

import { AlertController } from '@ionic/angular';

import { NoticesService } from '../../notices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firestore } from 'firebase';


@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {







  ngOnInit() {
    
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
  changeUploadCoverImage(selectedNoticeCategoryValue){
    console.info("Selected: " + selectedNoticeCategoryValue);
    var withUploadEventCoverImage = document.getElementById("withEventCoverImage");
    var withoutUploadEventCoverImage = document.getElementById("withoutEventCoverImage");
    if(selectedNoticeCategoryValue == "Event"){
      withoutUploadEventCoverImage.style.display = "none";
      withUploadEventCoverImage.style.display = "inline";
    }
    else if(selectedNoticeCategoryValue != "Event"){
      withoutUploadEventCoverImage.style.display = "inline";
      withUploadEventCoverImage.style.display = "none";
    }
    this.selectedNoticeCategoryValue = selectedNoticeCategoryValue;
  }

  // Declaring variables to store the user entered value from the new notice form
  noticeTitle: string;
  noticeDescription: string;
  noticeCategory: string;
  noticeRecipientModule: string;
  noticeRecipientBatch: string;
  noticeAuthor: string;


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

  private imageCollection: AngularFirestoreCollection<EventNoticeData>;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private alertController: AlertController
  ){
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Collection set of where the eventNoticeData will be saved 
    this.imageCollection = database.collection<EventNoticeData>('notices');
  }


  // Alert Box Implementation
  async alertnotice ( title: string, content: string ) {

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

      this.alertnotice('ERROR! ', 'Selected file type is not supported. <br> Please select an image with PNG or JPG formats.');

      return;
    }

    fileReader.onload = ($event:any) => {
      this.eventCoverImage = $event.target.result;
    }

    fileReader.readAsDataURL($event.target.files[0]);
    
  }

  // Retriving the current date and time from the localhost
  currentDT = new Date();
  currentDateTime = this.currentDT.getDate() + "/" + this.currentDT.getMonth() + "/" + this.currentDT.getFullYear() + " " + this.currentDT.getHours() + ":" + this.currentDT.getMinutes() + ":" + this.currentDT.getSeconds();


  // Upload file process
  uploadNewNoticeImage() {

    // Checking if the selected notice category is event
    if(this.selectedNoticeCategoryValue == 'Event'){

      // Validating selection of files for only images
      if(this.file.type.split('/')[0] !== 'image') {
        console.error('Unsupported File Type');

        this.alertnotice('ERROR! ', 'Selected file type is not supported. <br> Please select an image with PNG or JPG formats.');

        return;
      }
      else{
        // Initializing previously declared variables with users entered values
        const noticeTitle = this.noticeTitle;
        const noticeDescription = this.noticeDescription;
        const noticeCategory = this.noticeCategory;
        const noticeRecipientModule = this.noticeRecipientModule;
        const noticeRecipientBatch = this.noticeRecipientBatch;
        const noticeAuthor = this.noticeAuthor;

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

              if( noticeRecipientModule == "" ) {

                this.addNewEventNoticeDocumentToDB({
                  noticeTitle: noticeTitle,
                  noticeDescription: noticeDescription,
                  noticeCategory: noticeCategory,
                  noticeRecipient: {
                    noticeRecipientModule: "NULL",
                    noticeRecipientBatch: noticeRecipientBatch 
                  },
                  noticeCoverImage: {
                    coverImageFileName: this.file.name,
                    coverImageFilePath: resp,
                    cooverImageFileSize: this.fileSize
                  },
                  noticeCreated: {
                    noticeCreatedByName: "Program Office User Name",
                    noticeCreatedByFaculty: noticeAuthor,
                    noticeCreatedDateTime: this.currentDateTime
                  },
                  noticeUpdate: {
                    updatedByName: "NULL",
                    updatedByFaculty: "NULL",
                    updatedDateTime: "NULL",
                    updatedSection: "NULL",
                  }
                });

              }
              else if ( noticeRecipientBatch == "" ) {

                this.addNewEventNoticeDocumentToDB({
                  noticeTitle: noticeTitle,
                  noticeDescription: noticeDescription,
                  noticeCategory: noticeCategory,
                  noticeRecipient: {
                    noticeRecipientModule: noticeRecipientModule,
                    noticeRecipientBatch: "NULL" 
                  },
                  noticeCoverImage: {
                    coverImageFileName: this.file.name,
                    coverImageFilePath: resp,
                    cooverImageFileSize: this.fileSize
                  },
                  noticeCreated: {
                    noticeCreatedByName: "Program Office User Name",
                    noticeCreatedByFaculty: noticeAuthor,
                    noticeCreatedDateTime: this.currentDateTime
                  },
                  noticeUpdate: {
                    updatedByName: "NULL",
                    updatedByFaculty: "NULL",
                    updatedDateTime: "NULL",
                    updatedSection: "NULL",
                  }
                });

              }

              

              // Removing the user entered values from the input fields after the notice has been created
              this.noticeTitle = "";
              this.noticeDescription = "";
              this.noticeCategory = "";
              this.noticeRecipientModule = "";
              this.noticeRecipientBatch = "";
              this.noticeAuthor = "";



              this.isFileUploading = false;
              this.isFileUploaded = false;
              
              // Displaying new notice successfully created
              this.alertnotice('Notice Successfully Created', 'Notice has been added to the system.<br>Notices Can be viewed in the "Notices Sent Sections" on the right side of the panel.');



            }, error => {
              console.error('Upload Error: ' + error);
              this.alertnotice('ERROR! ', 'An error has occurred during the process. Error' + error + " <br>Please contact the system web administrator.");
            })
          }),
          tap(snap => {
            this.fileSize = snap.totalBytes;
          })

        )
      }
    }
    else{

      // Initializing previously declared variables with users entered values
      const noticeTitle = this.noticeTitle;
      const noticeDescription = this.noticeDescription;
      const noticeCategory = this.noticeCategory;
      const noticeRecipientModule = this.noticeRecipientModule;
      const noticeRecipientBatch = this.noticeRecipientBatch;
      const noticeAuthor = this.noticeAuthor;


      if( noticeRecipientModule == "" ) {

        this.addNewNoticeDcouementToDB({
          noticeTitle: noticeTitle,
          noticeDescription: noticeDescription,
          noticeCategory: noticeCategory,
          noticeRecipient: {
            noticeRecipientModule: "NULL",
            noticeRecipientBatch: noticeRecipientBatch 
          },
          noticeCreated: {
            noticeCreatedByName: "Program Office User Name",
            noticeCreatedByFaculty: noticeAuthor,
            noticeCreatedDateTime: this.currentDateTime // firebase.firestore.Timestamp.fromDate(new Date(this.currentDateTime))
          },
          noticeUpdate: {
            updatedByName: "NULL",
            updatedByFaculty: "NULL",
            updatedDateTime: "NULL",
            updatedSection: "NULL",
          }
        });

      }
      else if( noticeRecipientBatch == "" ) {

        this.addNewNoticeDcouementToDB({
          noticeTitle: noticeTitle,
          noticeDescription: noticeDescription,
          noticeCategory: noticeCategory,
          noticeRecipient: {
            noticeRecipientModule: noticeRecipientModule,
            noticeRecipientBatch: "NULL" 
          },
          noticeCreated: {
            noticeCreatedByName: "Program Office User Name",
            noticeCreatedByFaculty: noticeAuthor,
            noticeCreatedDateTime: this.currentDateTime // firebase.firestore.Timestamp.fromDate(new Date(this.currentDateTime))
          },
          noticeUpdate: {
            updatedByName: "NULL",
            updatedByFaculty: "NULL",
            updatedDateTime: "NULL",
            updatedSection: "NULL",
          }
        });


      }

      

      

      // Displaying new notice successfully created
      this.alertnotice('Notice Successfully Created', 'Notice has been added to the system.<br>Notices can be viewed in the "Notices Sent Sections" on the right side of the panel.');

      // Removing the user entered values from the input fields after the notice has been created
      this.noticeTitle = "";
      this.noticeDescription = "";
      this.noticeCategory = "";
      this.noticeRecipientModule = "";
      this.noticeRecipientBatch = "";
      this.noticeAuthor = "";


    }

  }


  

  // Method for adding notice document to firestore
  addNewEventNoticeDocumentToDB(data: EventNoticeData){

    // Creating an ID for the document
    const id = this.database.createId();

    // Setting document ID with the value in database
    this.imageCollection.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred: " + error);
    })
  }

  addNewNoticeDcouementToDB(data: NoticeData){
    
    const id = this.database.createId();

    this.imageCollection.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred:" + error);
    })
  }






}
