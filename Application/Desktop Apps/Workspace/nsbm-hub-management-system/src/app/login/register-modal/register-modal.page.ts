import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
})
export class RegisterModalPage implements OnInit {

  constructor(
    private modalController:ModalController
  ) { }

  CloseRegisterModal(){ // Implementation for closing the 'register' modal
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
