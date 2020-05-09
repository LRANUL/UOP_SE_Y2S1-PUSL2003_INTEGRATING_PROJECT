import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-lecture-hall-modal',
  templateUrl: './edit-lecture-hall-modal.page.html',
  styleUrls: ['./edit-lecture-hall-modal.page.scss'],
})
export class EditLectureHallModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeEditLectureHallModal(){
    this.modalController.dismiss();
  }

}
