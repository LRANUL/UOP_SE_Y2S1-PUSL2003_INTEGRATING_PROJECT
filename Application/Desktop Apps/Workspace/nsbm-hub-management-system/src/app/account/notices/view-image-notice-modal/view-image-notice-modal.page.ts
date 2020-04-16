import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-image-notice-modal',
  templateUrl: './view-image-notice-modal.page.html',
  styleUrls: ['./view-image-notice-modal.page.scss'],
})
export class ViewImageNoticeModalPage implements OnInit {

  passedNoticeDocId = null;
  passedCoverImageFileName = null;
  passedCoverImageFileSize = null;
  passedCoverImageFilePath = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    // Getting the values from the parent page (notice page) and assigning them to the variables
    this.passedNoticeDocId = this.navParams.get('noticeDocId');

    this.passedCoverImageFileName = this.navParams.get('coverImageFileName');
    this.passedCoverImageFileSize = this.navParams.get('coverImageFileSize');
    this.passedCoverImageFilePath = this.navParams.get('coverImageFilePath');

  }


  // Implementation for closing the modal
  closeViewImageNoticeModal(){
    this.modalController.dismiss();
  }


}
