import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
 
  title;
  notices: any;
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();

  ngOnInit() {
    var Batch: string
    var Faculty: string
    var DegreeCode: string
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().uid).ref.get().then((doc) => {
      if (doc.exists) {
        // console.log(doc.data());
        Batch = doc.data().batch.toString()
        Faculty = doc.data().faculty
        DegreeCode = doc.data().DegreeCode
        this.firestore.collection('faculties').doc(Faculty).collection('lectureSessions').snapshotChanges().subscribe(keys => {
          this.eventSource = [];
          keys.forEach(key => {
            let event: any = key.payload.doc.data();
            event.id = key.payload.doc.id;
            event.title = event.moduleTitle + " | At Hall: " + event.lectureHall;
            event.startTime = event.startDateTime.toDate();
            event.endTime = event.endDateTime.toDate();
            this.eventSource.push(event);
          });
        });

      }
    })
  
  }

  constructor(private firestore: AngularFirestore, private firebase: ServicesService, private router: Router, private route: ActivatedRoute, private menu: MenuController, public navCtrl: NavController) {
   
  }
}
