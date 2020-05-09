import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}
    async closeModal(){
      await this.modal.dismiss();
    }
}
