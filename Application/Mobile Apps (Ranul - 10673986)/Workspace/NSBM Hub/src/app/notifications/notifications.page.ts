import { ServicesService } from './../services.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss']
})
export class notificationsPage {

  Notices: any;
  Heading: string;
  Image: ImageBitmap;
  Date: string;


  constructor(
    private database: AngularFirestore,
    private Service: ServicesService,
  ) { this.autorefresh(event); }


  ngOnInit() {
    this.Service.NoticesPull().subscribe(data => {
      this.Notices = data.map(e => {
        if (e.payload.doc.data()['noticeCategory'] == "Event"){
        return {
          id: e.payload.doc.id,
          isEdit: false,
          noticeTitle: e.payload.doc.data()['noticeTitle'],
          coverImageFilePath: e.payload.doc.data()['noticeCoverImage']['coverImageFilePath'],
          noticeDescription: e.payload.doc.data()['noticeDescription'],
          createdDateTime: (e.payload.doc.data()['noticeCreated']['noticeCreatedDateTime']).toDate(),
        };
        } else {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            noticeTitle: e.payload.doc.data()['noticeTitle'],
            noticeDescription: e.payload.doc.data()['noticeDescription'],
            coverImageFilePath: 'assets/noticedefault.png',
            createdDateTime: (e.payload.doc.data()['noticeCreated']['noticeCreatedDateTime']).toDate(),
          };
        }
      })
      console.log(this.Notices);
    });
  }
  getNotices(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.Service.NoticesPull().subscribe(data => {
        this.Notices = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            noticeTitle: e.payload.doc.data()['noticeTitle'],
            coverImageFilePath: e.payload.doc.data()['noticeCoverImage']['coverImageFilePath'],
            noticeDescription: e.payload.doc.data()['noticeDescription'],
            createdDateTime: (e.payload.doc.data()['noticeCreated']['noticeCreatedDateTime']).toDate(),
          };
        })
      });
      console.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
  autorefresh(event) {
    this.Service.NoticesPull().subscribe(data => {
      this.Notices = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          noticeTitle: e.payload.doc.data()['noticeTitle'],
          coverImageFilePath: e.payload.doc.data()['noticeCoverImage']['coverImageFilePath'],
          noticeDescription: e.payload.doc.data()['noticeDescription'],
          createdDateTime: (e.payload.doc.data()['noticeCreated']['noticeCreatedDateTime']).toDate(),
        };
      })
    });
  }
}

