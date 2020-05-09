import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-news-category-modal',
  templateUrl: './edit-news-category-modal.page.html',
  styleUrls: ['./edit-news-category-modal.page.scss'],
})
export class EditNewsCategoryModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditNewsCategory(){
    this.modalController.dismiss();
  }

}
