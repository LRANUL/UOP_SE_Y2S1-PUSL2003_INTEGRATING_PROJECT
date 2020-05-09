import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-batch-modal',
  templateUrl: './edit-batch-modal.page.html',
  styleUrls: ['./edit-batch-modal.page.scss'],
})
export class EditBatchModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditBatchModal(){
    this.modalController.dismiss();
  }

}
