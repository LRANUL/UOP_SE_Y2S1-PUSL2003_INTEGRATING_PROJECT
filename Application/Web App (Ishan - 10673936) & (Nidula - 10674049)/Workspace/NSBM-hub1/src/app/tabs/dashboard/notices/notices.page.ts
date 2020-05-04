import { Component, OnInit } from '@angular/core';
import { notice } from './notices.model';
import { NoticeService } from './notice.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {
  lNotices :notice[];
  constructor(private noticeService:NoticeService ,private Route:Router) { }

  ngOnInit() {
   this.lNotices =this.noticeService.getAllNotices();
  }

  onEdit(itemId: string,slideItem:IonItemSliding){
    slideItem.close();
    this.Route.navigate(['/','tabs','t1','Dashboard','notices',itemId])
    console.log('editing item', itemId);

  }
}
