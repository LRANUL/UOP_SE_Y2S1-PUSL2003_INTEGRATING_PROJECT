import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  addNewsCoverImageSection: Boolean = false;

  addAttachmentLinkSection: Boolean = false;

  addNewNewsForm: FormGroup;
  
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
    private newsService: FirestoreService,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private sideMenuPageUserFaculty: SideMenuPage,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
  }

  ngOnInit() {

    this.retrievePublishedNewsCategories();

    // Add New News Form
    this.addNewNewsForm = this.formBuilder.group({
      newsTitle: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newsDescription: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newsCategory: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newsPublisher: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.addNewNewsForm.patchValue({
      newsPublisher: this.sideMenuPageUserFaculty.passUserFaculty()
    });

  }

  
  // Retrieving the published new categories from the firestore database
  publishedNewsCategories;
  retrievePublishedNewsCategories = () => 
    this.newsService.retrievePublishedNewsCategories().subscribe(response => (this.publishedNewsCategories = response));




  static coverImageToggle: number = 0;

  addNewsCoverImage(event){
    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(event.detail.value == "on"){
      NewsPage.coverImageToggle++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(NewsPage.coverImageToggle%2 == 1){
      this.addNewsCoverImageSection = true;
    }
    else if(NewsPage.coverImageToggle%2 == 0){
      this.addNewsCoverImageSection = false;
    }
  }



  static attachmentLinkToggle: number = 0;

  addAttachmentLink(event){
    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(event.detail.value == "on"){
      NewsPage.attachmentLinkToggle++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(NewsPage.attachmentLinkToggle%2 == 1){
      this.addAttachmentLinkSection = true;

      this.addNewNewsForm = this.formBuilder.group({
        newsAttachmentLink: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }
    else if(NewsPage.attachmentLinkToggle%2 == 0){
      this.addAttachmentLinkSection = false;
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



  doAddNewNews(value){

    if(this.addNewsCoverImageSection == true && this.addAttachmentLinkSection == true){

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
          
          // Uploading news document to firestore
          this.UploadedFileURL.subscribe(resp => {
            this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, this.file.name, resp, this.fileSize, 
              this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
              .then(success => {
                console.log("News published successfully " + success);
                // Removing the user entered values from the input fields after the notice has been created
                this.addNewNewsForm.reset();

                this.addNewNewsForm.patchValue({
                  noticeAuthor: this.sideMenuPageUserFaculty.passUserFaculty()
                });

                // Displaying new notice successfully sent
                this.alertNotice('News Published', 
                  'News has been successfully published.');
              }, error => {
                console.log("Error: " + error);
                this.alertNotice("ERROR", "Error has occurred: " + error);
            });
          }, error => {
            console.error('Upload Error: ' + error);
            this.alertNotice('ERROR! ', 'An error has occurred during the process. Error' + error + ". Please contact the system web administrator.");
          });
          this.isFileUploading = false;
          this.isFileUploaded = false;
        }),
        tap(snap => {
          this.fileSize = snap.totalBytes;
        })
      )

    }
    else if(this.addNewsCoverImageSection == true || this.addAttachmentLinkSection == true){
      if(this.addNewsCoverImageSection == true && this.addAttachmentLinkSection == false){
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
            
            // Uploading news document to firestore
            this.UploadedFileURL.subscribe(resp => {
              this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, this.file.name, resp, this.fileSize, 
                this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
                .then(success => {
                  console.log("News published successfully " + success);
                  // Removing the user entered values from the input fields after the notice has been created
                  this.addNewNewsForm.reset();

                  this.addNewNewsForm.patchValue({
                    noticeAuthor: this.sideMenuPageUserFaculty.passUserFaculty()
                  });

                  // Displaying new notice successfully sent
                  this.alertNotice('News Published', 
                    'News has been successfully published.');
                }, error => {
                  console.log("Error: " + error);
                  this.alertNotice("ERROR", "Error has occurred: " + error);
              });
            }, error => {
              console.error('Upload Error: ' + error);
              this.alertNotice('ERROR! ', 'An error has occurred during the process. Error' + error + ". Please contact the system web administrator.");
            });
            this.isFileUploading = false;
            this.isFileUploaded = false;
          }),
          tap(snap => {
            this.fileSize = snap.totalBytes;
          })
        )
      }
      else if(this.addNewsCoverImageSection == false && this.addAttachmentLinkSection == true){
        this.UploadedFileURL.subscribe(resp => {
          this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, "NULL", "NULL", "NULL", 
            this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
            .then(success => {
              console.log("News published successfully " + success);
              // Removing the user entered values from the input fields after the notice has been created
              this.addNewNewsForm.reset();

              this.addNewNewsForm.patchValue({
                noticeAuthor: this.sideMenuPageUserFaculty.passUserFaculty()
              });

              // Displaying new notice successfully sent
              this.alertNotice('News Published', 
                'News has been successfully published.');
            }, error => {
              console.log("Error: " + error);
              this.alertNotice("ERROR", "Error has occurred: " + error);
          });
        })
      }
      else if(this.addNewsCoverImageSection == false && this.addAttachmentLinkSection == false){
        this.UploadedFileURL.subscribe(resp => {
          this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, "NULL", "NULL", "NULL",
            this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
            .then(success => {
              console.log("News published successfully " + success);
              // Removing the user entered values from the input fields after the notice has been created
              this.addNewNewsForm.reset();

              this.addNewNewsForm.patchValue({
                noticeAuthor: this.sideMenuPageUserFaculty.passUserFaculty()
              });

              // Displaying new notice successfully sent
              this.alertNotice('News Published', 
                'News has been successfully published.');
            }, error => {
              console.log("Error: " + error);
              this.alertNotice("ERROR", "Error has occurred: " + error);
          });
        })
      }
    }
  }




}
