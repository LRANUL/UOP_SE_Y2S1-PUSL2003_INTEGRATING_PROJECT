import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-new-notice',
  templateUrl: './new-notice.page.html',
  styleUrls: ['./new-notice.page.scss'],
})
export class NewNoticePage implements OnInit {
newNoticeform:FormGroup;
  constructor(private noticeServ:NoticeService,private router:Router,private loaderCon:LoadingController) { }

  ngOnInit() {
    this.newNoticeform= new FormGroup({
      title: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      desc: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.maxLength(255)]
      }),
      dateSub:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateEvent:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),

    });
  }

  

  onCreateNotice(){
    if(!this.newNoticeform.valid){
      return;
       }
    this.loaderCon.create({
         message:'creating Notice!'
       }).then(loadEle =>{
         loadEle.present();
         this.noticeServ.addUserNotices(
          this.newNoticeform.value.title,
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg",
          this.newNoticeform.value.desc,
          
         ).subscribe(()=>{
           loadEle.dismiss();
          this.newNoticeform.reset(); 
          this.router.navigate(['/tabs/t1/Dashboard']);
         }); 
       })
      
    
  }
}
