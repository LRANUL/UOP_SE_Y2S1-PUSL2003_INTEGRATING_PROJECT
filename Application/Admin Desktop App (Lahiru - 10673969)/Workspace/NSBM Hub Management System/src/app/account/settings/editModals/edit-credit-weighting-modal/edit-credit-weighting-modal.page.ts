import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-credit-weighting-modal',
  templateUrl: './edit-credit-weighting-modal.page.html',
  styleUrls: ['./edit-credit-weighting-modal.page.scss'],
})
export class EditCreditWeightingModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditCreditWeightingModal(){
    this.modalController.dismiss();
  }

}
