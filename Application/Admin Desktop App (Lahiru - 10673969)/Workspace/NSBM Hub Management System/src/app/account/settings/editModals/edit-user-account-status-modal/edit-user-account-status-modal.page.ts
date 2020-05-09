import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user-account-status-modal',
  templateUrl: './edit-user-account-status-modal.page.html',
  styleUrls: ['./edit-user-account-status-modal.page.scss'],
})
export class EditUserAccountStatusModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditUserAccountStatus(){
    this.modalController.dismiss();
  }

}
