import { Component, OnInit, OnDestroy } from '@angular/core';
import { notice } from '../notices.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { NoticeService } from '../notice.service';
import { EditComponent } from '../edit/edit.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit  {
  notices:notice;
  editNoticeform:FormGroup;
 

  constructor(
    private activeRoute: ActivatedRoute,
    private navCon:NavController,
    private noticeServ:NoticeService,
    private modalCtrl:ModalController,
    private actionSheet:ActionSheetController,
    private router:Router,
    private loaderCon:LoadingController
    ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param =>{
       if(!param.has('noticeId')){
         this.navCon.navigateBack('/tabs/t1/Dashboard/notices');
         return;
       }
        this.noticeServ.getNotice(param.get('noticeId')).subscribe(noticee =>{
          this.notices = noticee
        });


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
    this.loaderCon.create({
      message:'Editing Notice!'
    }).then(loadEle =>{
      loadEle.present();
      this.noticeServ.editNotice(
        this.notices.id,
        this.editNoticeform.value.title,
        this.editNoticeform.value.desc
        ).subscribe(()=>{
          loadEle.dismiss();
          this.editNoticeform.reset();
          this.router.navigate(['/tabs/t1/Dashboard/notices'])
        });
    });
    
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

  // openEditModel(mode: 'select' | 'random'){
  //   console.log(mode);
  //   this.modalCtrl.create({component:EditComponent}).then(modEle =>{
  //     modEle.present();
  //     return modEle.onDidDismiss();
  //   }).then(result=>{
  //     console.log(result.data,result.role);
  //     if(result.role==='confim'){
  //       console.log('editted');
  //     }
  //   });
  // }


 
}
