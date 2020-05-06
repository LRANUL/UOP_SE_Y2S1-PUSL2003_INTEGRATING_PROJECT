import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-news-item-modal',
  templateUrl: './edit-news-item-modal.page.html',
  styleUrls: ['./edit-news-item-modal.page.scss'],
})
export class EditNewsItemModalPage implements OnInit {

  addNewsCoverImageSection: Boolean = false;

  addAttachmentLinkSection: Boolean = false;

  editNewsItemForm: FormGroup;

  passedNewsItemDocId = null;

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
    private modalController: ModalController,
    private navParams: NavParams,
    private storage: AngularFireStorage,
    private editNewItemModalService: FirestoreService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) { 
    this.isFileUploading = false;
    this.isFileUploaded = false;
  }

  ngOnInit() {

    this.retrievePublishedNewsCategories();

    this.passedNewsItemDocId = this.navParams.get('newsItemDocId');

    // Add New News Form
    this.editNewsItemForm = this.formBuilder.group({
      newsTitle: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newsDescription: new FormControl('', Validators.compose([
        Validators.required
      ])),
      newsCategory: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    // Assigning the passed values to the form inputs
    this.editNewsItemForm.patchValue({
      newsTitle: this.navParams.get('newsItemTitle'),
      newsDescription: this.navParams.get('newsItemDescription'),
      newsCategory: this.navParams.get('newsItemCategory')
    });
  }

  // Retrieving the published  news categories from the firestore database
  publishedNewsCategories;
  retrievePublishedNewsCategories = () =>
    this.editNewItemModalService.retrievePublishedNewsCategories().subscribe(response => (this.publishedNewsCategories = response));


  static coverImageToggle: number = 0;

  addNewsCoverImage(event){
    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(event.detail.value == "on"){
      EditNewsItemModalPage.coverImageToggle++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(EditNewsItemModalPage.coverImageToggle%2 == 1){
      this.addNewsCoverImageSection = true;
    }
    else if(EditNewsItemModalPage.coverImageToggle%2 == 0){
      this.addNewsCoverImageSection = false;
    }
  }



  static attachmentLinkToggle: number = 0;

  addAttachmentLink(event){
    /* Process of identifying toggle is toggled or not */
    // Incrementing static variable by one with the previous if the event value is 'on'
    if(event.detail.value == "on"){
      EditNewsItemModalPage.attachmentLinkToggle++;
    }

    // If toggling value modulus is 1, toggle result is true
    // if 0, false is assigned
    if(EditNewsItemModalPage.attachmentLinkToggle%2 == 1){
      this.addAttachmentLinkSection = true;
    }
    else if(EditNewsItemModalPage.attachmentLinkToggle%2 == 0){
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


  

  // Confirm Box Implementation (Edit news item)
  async editNewsItem(title: string, content: string, value) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Edit News Item Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Edit News Item Request Accepted");

            this.doEditNewItem(value);
          }
        }
      ]
    });
    await alert.present();
  }

  // Process of updating news item details
  doEditNewItem(value){
    this.editNewItemModalService.updateNewsItem(this.passedNewsItemDocId, value)
      .then(success => {
        this.alertNotice("News Item Updated", "News item details have been updated.");
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("News Item", "Error has occurred: " + error);
    });
  }
  


  // Process of closing the modal
  closeEditNewsItemModal(){
    this.modalController.dismiss();
  }

}
