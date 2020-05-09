import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail }  from '@ionic/core'
import { ModalController } from '@ionic/angular';
import {WifiPage} from './../home/wifi/wifi.page'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
tab:boolean=false;
  constructor(private modal: ModalController) { }

  async openModal(){
    const modal = await this.modal.create({
      component: WifiPage
    });
    return await modal.present();
  }

  ngOnInit() { 
  }
  onFilter(event:CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value==="all"){
      this.tab=true;
    }
    if(event.detail.value==="dash"){
      this.tab=false;
    }

  }

}
