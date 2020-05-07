import { Component, OnInit } from '@angular/core';
import { notice } from '../notices.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { NoticeService } from '../notice.service';
import { EditComponent } from '../edit/edit.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {
  notices:notice;
  editNoticeform:FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private navCon:NavController,
    private noticeServ:NoticeService,
    private modalCtrl:ModalController,
    private actionSheet:ActionSheetController
    ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param =>{
       if(!param.has('noticeId')){
         this.navCon.navigateBack('/tabs/t1/Dashboard/notices');
         return;
       }
       this.notices = this.noticeServ.getNotice(param.get('noticeId'));
       this.editNoticeform =new FormGroup({
        title: new FormControl(this.notices.title,{
          updateOn:'blur',
          validators:[Validators.required]
        }),
        desc: new FormControl(this.notices.desc,{
          updateOn:'blur',
          validators:[Validators.required,Validators.maxLength(255)]
        }),
       })

    });
  }

  onEditNotice(){
    if(!this.editNoticeform.valid){
      return;
    }
    console.log(this.editNoticeform);
  }

  // onEdit(){
  //   this.actionSheet.create({
  //     header:'Choose an Option to edit',
  //     buttons:[
  //       {
  //       text:'Change the Title',
  //       handler: () =>{this.openEditModel('select');}
  //       },
  //       {
  //         text:'change Content',
  //         handler: () =>{this.openEditModel('random');}
  //       },
  //       {
  //         text:'Change Image',
  //         handler: () =>{}
  //       },
  //       {
  //         text:'Cancel',
  //         role:'cancel'
  //       }
  //   ]
  //   }).then(actionEle =>{
  //     actionEle.present();
  //   });
    
  // }

  openEditModel(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCtrl.create({component:EditComponent}).then(modEle =>{
      modEle.present();
      return modEle.onDidDismiss();
    }).then(result=>{
      console.log(result.data,result.role);
      if(result.role==='confim'){
        console.log('editted');
      }
    });
  }

}
