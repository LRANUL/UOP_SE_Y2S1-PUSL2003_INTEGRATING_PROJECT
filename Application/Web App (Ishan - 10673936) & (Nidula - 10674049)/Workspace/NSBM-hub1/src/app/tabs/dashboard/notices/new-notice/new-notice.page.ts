import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-notice',
  templateUrl: './new-notice.page.html',
  styleUrls: ['./new-notice.page.scss'],
})
export class NewNoticePage implements OnInit {
newNoticeform:FormGroup;
  constructor() { }

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
    console.log(this.newNoticeform);
    
  }
}
