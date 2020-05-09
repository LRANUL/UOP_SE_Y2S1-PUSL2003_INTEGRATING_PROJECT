import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-degree-program-modal',
  templateUrl: './edit-degree-program-modal.page.html',
  styleUrls: ['./edit-degree-program-modal.page.scss'],
})
export class EditDegreeProgramModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  
  closeEditDegreeProgramModal(){
    this.modalController.dismiss();
  }
  
}
