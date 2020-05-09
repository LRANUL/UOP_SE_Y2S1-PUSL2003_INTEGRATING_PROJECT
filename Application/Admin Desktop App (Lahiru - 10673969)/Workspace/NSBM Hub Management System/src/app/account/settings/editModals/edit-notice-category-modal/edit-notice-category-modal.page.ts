import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-notice-category-modal',
  templateUrl: './edit-notice-category-modal.page.html',
  styleUrls: ['./edit-notice-category-modal.page.scss'],
})
export class EditNoticeCategoryModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditNoticeCategory(){
    this.modalController.dismiss();
  }

}
