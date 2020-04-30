import { Component, OnInit } from '@angular/core';
import { notice } from '../notices.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { NoticeService } from '../notice.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {
  notices:notice;
  constructor(
    private activeRoute: ActivatedRoute,
    private navCon:NavController,
    private noticeServ:NoticeService,
    private modalCtrl:ModalController
    ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param =>{
       if(!param.has('noticeId')){
         this.navCon.navigateBack('/tabs/t1/Dashboard/notices');
         return;
       }
       this.notices = this.noticeServ.getNotice(param.get('noticeId'));
    });
  }

  onEdit(){
    this.modalCtrl.create({component:EditComponent}).then(modEle =>{
      modEle.present();
    });
  }

}
