import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-session-status-modal',
  templateUrl: './edit-session-status-modal.page.html',
  styleUrls: ['./edit-session-status-modal.page.scss'],
})
export class EditSessionStatusModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditSessionStatus(){
    this.modalController.dismiss();
  }

}
