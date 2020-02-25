import { Component, OnInit } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { EventNoticeData } from '../../types';

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
  changeUploadCoverImage(selectedValue){
    console.info("Selected: " + selectedValue);
    var withUploadEventCoverImage = document.getElementById("withEventCoverImage");
    var withoutUploadEventCoverImage = document.getElementById("withoutEventCoverImage");
    if(selectedValue == "Event"){
      withoutUploadEventCoverImage.style.display = "none";
      withUploadEventCoverImage.style.display = "inline";
    }
    else if(selectedValue != "Event"){
      withoutUploadEventCoverImage.style.display = "inline";
      withUploadEventCoverImage.style.display = "none";
    }
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
  ){
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Collection set of where the eventNoticeData will be saved 
    this.imageCollection = database.collection<EventNoticeData>('notices');
  }

  // Upload file process
  uploadNewNoticeDetails(event: FileList) {

    // Initializing previously declared variables with users entered values
    const noticeTitle = this.noticeTitle;
    const noticeDescription = this.noticeDescription;
    const noticeCategory = this.noticeCategory;
    const noticeRecipientModule = this.noticeRecipientModule;
    const noticeRecipientBatch = this.noticeRecipientBatch;
    const noticeAuthor = this.noticeAuthor;

    // File Object
    const file = event.item(0);

    // Validating selection of files for only images
    if(file.type.split('/')[0] !== 'image') {
      console.error('Unsupported File Type');
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;
    
    this.fileName = file.name;

    // Retrieving current date and time in Unix Timestamp from localhost
    var currentDateTimeUnix = new Date().getTime();
    
    // Retrieving filename of selected file
    var currentFileName = file.name;

    console.log("DateTime: " + currentDateTimeUnix + " FileName: " + currentFileName);

    // Storage path of the file in the firebase storage
    var path = 'files/images/notices/events/' + currentDateTimeUnix + '_' + currentFileName;

    // Custom metadata
    const customMetadata = { app: 'Event Notice Cover Image File' };

    // File referencing
    const fileRef = this.storage.ref(path);

    // Uploading file to firebase storage
    this.task = this.storage.upload(path, file, { customMetadata });

    // Retrieving file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {

        // Retrieving the URL of the uploaded file storage
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        // Uploading notice document to firestore
        this.UploadedFileURL.subscribe(resp => {
          this.addNewNoticeDocumentToDB({
            noticeTitle: noticeTitle,
            noticeDescription: noticeDescription,
            noticeCategory: noticeCategory,
         /*   noticeRecipient: [
              {
                noticeRecipientModule: noticeRecipientModule,
                noticeRecipientBatch: noticeRecipientBatch,
              }
            ],*/
            noticeAuthor: noticeAuthor,
            coverImageFileName: file.name,
            coverImageFilePath: resp,
            coverImageFileSize: this.fileSize
          });

          this.isFileUploading = false;
          this.isFileUploaded = true;
        
        }, error => {
          console.error('Upload Error: ' + error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })

    )

  }

  // Method for adding notice document to firestore
  addNewNoticeDocumentToDB(data: EventNoticeData){

    // Creating an ID for the document
    const id = this.database.createId();

    // Setting document ID with the value in database
    this.imageCollection.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("Error occurred: " + error);
    })
  }


}
