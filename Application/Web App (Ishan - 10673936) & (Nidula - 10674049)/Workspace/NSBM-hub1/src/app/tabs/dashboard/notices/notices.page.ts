import { Component, OnInit, OnDestroy } from '@angular/core';
import { notice } from './notices.model';
import { NoticeService } from './notice.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { SegmentChangeEventDetail }  from '@ionic/core'
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit, OnDestroy {
  isStudent:boolean=false;
  relaventNotices:notice[] =[];
  

  userNotices:notice[];
  private userNoticeSub:Subscription;s

  lNotices :notice[];
  private noticeSub:Subscription;
  
  constructor(private noticeService:NoticeService ,private Route:Router,private authServ:AuthService ,private loadCon:LoadingController,private db:AngularFirestore) { }

  ngOnInit() {
    this.db.collection('notices').snapshotChanges().subscribe(result =>console.log(result));
    this.noticeSub = this.noticeService.AllNotices.subscribe(noticee =>{

      this.lNotices = noticee;
      this.relaventNotices =this.lNotices;

      this.userNoticeSub = this.noticeService.userBookings.subscribe(uNotices =>{
        this.userNotices = uNotices;
      })
      
    })
  }

   onEdit(itemId: string,slideItem:IonItemSliding){
     slideItem.close();
     this.Route.navigate(['/','tabs','t1','Dashboard','notices',itemId])
     console.log('editing item', itemId);

   }

  onDelete(itemId: string,slideItem:IonItemSliding){
    slideItem.close();
    this.loadCon.create({message:'Deleting..'}).then(loadEle =>{
      loadEle.present();
      this.noticeService.deleteUserNotices(itemId).subscribe(()=>{
        loadEle.dismiss();
      });
    })
    

  }
  ngOnDestroy (){
    this.noticeSub.unsubscribe();
    this.userNoticeSub.unsubscribe();
  }

   onFilter(event:CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail.value);
    if(event.detail.value==='all'){
       this.relaventNotices = this.lNotices;
    }
    //  }else{
    //    this.relaventNotices = this.lNotices.filter(notice =>notice.userId === this.authServ.userId);
    //  }
    else{
      this.relaventNotices =this.userNotices;
    }

  }
}
