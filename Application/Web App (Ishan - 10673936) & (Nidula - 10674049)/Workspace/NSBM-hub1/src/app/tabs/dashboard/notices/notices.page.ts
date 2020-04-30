import { Component, OnInit } from '@angular/core';
import { notice } from './notices.model';
import { NoticeService } from './notice.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {
  lNotices :notice[];
  constructor(private noticeService:NoticeService) { }

  ngOnInit() {
   this.lNotices =this.noticeService.getAllNotices();
  }

}
