import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-lecture-session-modal',
  templateUrl: './edit-lecture-session-modal.page.html',
  styleUrls: ['./edit-lecture-session-modal.page.scss'],
})
export class EditLectureSessionModalPage implements OnInit {

  passedLectureSessionId = null;
  passedLecturer = null;
  passedLectureHall = null;


  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.passedLectureSessionId = this.navParams.get('lectureSessionId');

    console.log(this.passedLectureSessionId);
  }

  closeModal(){
    this.modalController.dismiss();
  }

  

}
