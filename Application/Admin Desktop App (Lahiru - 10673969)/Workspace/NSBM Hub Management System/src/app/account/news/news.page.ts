import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { EditNewsItemModalPage } from './edit-news-item-modal/edit-news-item-modal.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  addNewsCoverImageSection: Boolean = false;

  addAttachmentLinkSection: Boolean = false;

  addNewNewsForm: FormGroup;
  


  currentDate;

  dateThreeDaysBeforeCurrentDate;


  noNewsText: Boolean = false;

  pastDateText: Boolean = false;

  loadingSpinnerNews: Boolean = true;

  
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


    this.currentDate = new Date();

    this.dateThreeDaysBeforeCurrentDate = new Date();

    this.dateThreeDaysBeforeCurrentDate.setDate(this.currentDate.getDate()-3);


    this.retrievePublishedNews();


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
      ])),
      newsAttachmentLink: new FormControl('')
    });

    this.addNewNewsForm.patchValue({
      newsPublisher: "Program Office: "+ this.sideMenuPageUserFaculty.passUserFaculty()
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


  // Retrieving the published news from the current date to three days before from the firestore database
  publishedNews;
  retrievePublishedNews = () =>
    this.newsService.retrievePublishedNews(this.currentDate, this.dateThreeDaysBeforeCurrentDate).subscribe(response => {
      this.loadingSpinnerNews = false;
      this.publishedNews = response;
    });
  
  // Retrieving the published news categories from the firestore database
  publishedNewsCategories;
  retrievePublishedNewsCategories = () => 
    this.newsService.retrievePublishedNewsCategories().subscribe(response => (this.publishedNewsCategories = response));



  retrieveNewsSelectedDate(event){

    // Setting loaded news to null
    this.publishedNews = null;

    this.loadingSpinnerNews = true;

    this.noNewsText = false;

    this.pastDateText = false;

    let selectedDate = new Date(event.detail.value);

    selectedDate.setHours(0,0,0,0);

    let nextDate = new Date();

    nextDate.setHours(0,0,0,0);

    nextDate.setDate(selectedDate.getDate()+1);

    let currentDate = new Date();

    currentDate.setHours(0,0,0,0);

    if(selectedDate > currentDate){
      this.pastDateText = true;
      this.loadingSpinnerNews = false;
    }
    else{
      this.newsService.retrievePublishedNewsSelectedDate(selectedDate, nextDate).subscribe(response => {
        if(response.length > 0){
          this.loadingSpinnerNews = false;
          this.publishedNews = response;
        }
        else{
          this.loadingSpinnerNews = false;
          this.noNewsText = true;
        }
        
      }, error => {
        this.loadingSpinnerNews = false;
        console.log("Error: " + error);
        this.alertNotice("Error", "An error has occurred: " + error);
      });
    }
  }

  // Opening edit news item modal 
  async editNewsItem(value){
    const editModuleModal = await this.modalController.create({
      component: EditNewsItemModalPage,
      // Passing values to the modal using 'componentProps'
      componentProps: {
        newsItemDocId: value.payload.doc.id,
        newsItemTitle: value.payload.doc.data().title,
        newsItemDescription: value.payload.doc.data().description,
        newsItemCategory: value.payload.doc.data().category
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editModuleModal.present();
  }


  openAttachmentLink(link){
    window.open(link, '_blank');
  }





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


  // Confirm Box Implementation (Publish new news)
  async publishedNewNews(title: string, content: string, value) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Published New News Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Published New News Request Accepted");

            this.doAddNewNews(value);
          }
        }
      ]
    });
    await alert.present();
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
      var path = 'files/images/newsCoverImages/' + currentDateTimeUnix + '_' + currentFileName;

      // Custom metadata
      const customMetadata = { app: 'News Cover Image File' };

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

                console.log("News published successfully");
                // Removing the user entered values from the input fields after the notice has been created
                this.addNewNewsForm.reset();

                // Assigning default form value
                this.addNewNewsForm.patchValue({
                  newsPublisher: "Program Office: "+ this.sideMenuPageUserFaculty.passUserFaculty()
                });

                // Setting cover image toggle to the initial state after form reset
                NewsPage.coverImageToggle = 1;

                // Setting attachment toggle to the initial state after form reset
                NewsPage.attachmentLinkToggle = 1;

                // Displaying new notice successfully sent
                this.alertNotice('News Published', 
                  'News has been successfully published.');

                // Removing all the items in the published news section
                this.publishedNews = null;

                // Setting coverImage view section to initial state after form reset
                this.coverImage = null;

                // Retrieving all published news items for the past three days
                this.retrievePublishedNews();

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
    else if(this.addNewsCoverImageSection == true && this.addAttachmentLinkSection == false){
      this.isFileUploading = true;
      this.isFileUploaded = false;
      
      this.fileName = this.file.name;

      // Retrieving current date and time in Unix Timestamp from localhost
      var currentDateTimeUnix = new Date().getTime();
      
      // Retrieving filename of selected file
      var currentFileName = this.file.name;

      console.log("DateTime: " + currentDateTimeUnix + " FileName: " + currentFileName);

      // Storage path of the file in the firebase storage
      var path = 'files/images/newsCoverImages/' + currentDateTimeUnix + '_' + currentFileName;

      // Custom metadata
      const customMetadata = { app: 'News Cover Image File' };

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

                console.log("News published successfully");
                // Removing the user entered values from the input fields after the notice has been created
                this.addNewNewsForm.reset();

                // Assigning default form value
                this.addNewNewsForm.patchValue({
                  newsPublisher: "Program Office: "+ this.sideMenuPageUserFaculty.passUserFaculty()
                });

                // Setting cover image toggle to the initial state after form reset
                NewsPage.coverImageToggle = 1;

                // Setting coverImage view section to initial state after form reset
                this.coverImage = null;

                // Displaying new notice successfully sent
                this.alertNotice('News Published', 
                  'News has been successfully published.');

                // Removing all the items in the published news section
                this.publishedNews = null;

                // Retrieving all published news items for the past three days
                this.retrievePublishedNews();

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
      this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, "NULL", "NULL", "NULL", 
        this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
        .then(success => {

          console.log("News published successfully");
          // Removing the user entered values from the input fields after the notice has been created
          this.addNewNewsForm.reset();

          // Assigning default form value
          this.addNewNewsForm.patchValue({
            newsPublisher: "Program Office: "+ this.sideMenuPageUserFaculty.passUserFaculty()
          });

          // Setting cover image toggle to the initial state after form reset
          NewsPage.attachmentLinkToggle = 1;

          // Displaying new notice successfully sent
          this.alertNotice('News Published', 'News has been successfully published.');

          // Removing all the items in the published news section
          this.publishedNews = null;

          // Retrieving all published news items for the past three days
          this.retrievePublishedNews();

        }, error => {
          console.log("Error: " + error);
          this.alertNotice("ERROR", "Error has occurred: " + error);
      });
    }
    else if(this.addNewsCoverImageSection == false && this.addAttachmentLinkSection == false){
      this.newsService.publishNews(this.addNewsCoverImageSection, this.addAttachmentLinkSection, "NULL", "NULL", "NULL",
        this.sideMenuPageUserFaculty.passUserFaculty(), this.sideMenuPageUserFaculty.passUserId(), value)
        .then(success => {

          console.log("News published successfully");
          // Removing the user entered values from the input fields after the notice has been created
          this.addNewNewsForm.reset();

          // Assigning default form value
          this.addNewNewsForm.patchValue({
            newsPublisher: "Program Office: "+ this.sideMenuPageUserFaculty.passUserFaculty()
          });

          // Displaying new notice successfully sent
          this.alertNotice('News Published', 
            'News has been successfully published.');

          // Removing all the items in the published news section
          this.publishedNews = null;

          // Retrieving all published news items for the past three days
          this.retrievePublishedNews();


        }, error => {
          console.log("Error: " + error);
          this.alertNotice("ERROR", "Error has occurred: " + error);
      });
    }
  }



  
  // Confirm Box Implementation (Remove published news)
  async removePublishedNews(title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Published News Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Published News Request Accepted");

            // Removing news item cover image from firebase storage
            if(value.payload.doc.data().coverImage != null){
              console.log("ffdd");
              this.newsService.removeCoverImage(value.payload.doc.data().coverImage.coverImageFilePath)
                .then(success => {
                // console.log("News item cover image successfully removed from firebase storage.");
                // this.alertNotice("News Item Cover Image Removed", "News item cover image successfully removed.");
                }, error => {
                  console.log("Error: " + error);
                  this.alertNotice("Error", "News item cover image removal error: " + error);
              });
            }

            let docId = value.payload.doc.id;

            // Removing published news item from the firestore database
            this.newsService.removePublishedNews(docId)
              .then(success => {
                console.log("News item has been successfully removed.");
                this.alertNotice("News Item Removed", "News item has been successfully removed.");
              }, error => {
                console.log("Error: " + error);
                this.alertNotice("Error", "News item removal error: " + error);
            });

            // Removing all the items in the published news section
            this.publishedNews = null;

            // Retrieving all published news items for the past three days
            this.retrievePublishedNews();

          }
        }
      ]
    });
    await alert.present();
  }


}
