import { Component, OnInit } from '@angular/core';

import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.page.html',
  styleUrls: ['./about-modal.page.scss'],
})
export class AboutModalPage implements OnInit {

  constructor(private modalController:ModalController) { }

  CloseModal(){ // Implementation for closing the 'about' modal
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
