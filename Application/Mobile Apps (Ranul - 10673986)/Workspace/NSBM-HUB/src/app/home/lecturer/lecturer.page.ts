import { ServicesService } from './../../services.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.page.html',
  styleUrls: ['./lecturer.page.scss'],
})
export class LecturerPage implements OnInit {

  Faculty: any;
  Name: any;
  title;
  Key: any;
  notices: any;
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  Module: string;
  check: boolean;
  value: any;
  constructor(private toastController: ToastController, private firestore: AngularFirestore, private firebase: ServicesService, public loadingController: LoadingController, public navCtrl: NavController) { }
  ngOnInit() {
    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().uid).set({
      accountActivity: 'Online',
    }, { merge: true });
    this.firestore.collection('userActivityMonitoring').add({
      loginDateTime: new Date(),
      userId: this.firebase.userDetails().uid,
    })
    var faculty;

    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().uid).ref.get().then((doc) => {
      if (doc.exists) {
        // console.log(doc.data());
        faculty = doc.data().createdDetails.createdFaculty;
        // console.log(faculty)
        this.firestore.collection('faculties').doc(faculty).collection('allLectureSessions').snapshotChanges().subscribe(keys => {
          this.eventSource = [];
          keys.forEach(key => {
            let event: any = key.payload.doc.data();
            event.id = key.payload.doc.id;
            event.title = event.moduleTitle + " | At Hall: " + event.lectureHall;
            event.startTime = event.startDateTime.toDate();
            event.endTime = event.endDateTime.toDate();
            this.Module = event.moduleTitle
            this.eventSource.push(event);
          });
        });
      }
    })
  }
  checkevt($event) {
    this.check = !this.value;
  }
  generateKey() {
    if (this.check = true) {
      var LocationCheck = true;
    }
    else {
      var LocationCheck = false;
    }
    var seconds = new Date().getTime();
    var uniquekey = 'xyxyxy'.replace(/[xy]/g, function (c) {
      var randomkey = (seconds + Math.random() * 25) % 25 | 0;
      seconds = Math.floor(seconds / 25);
      return (c == 'x' ? randomkey : (randomkey & 0x3 | 0x8)).toString(25);
    });
    this.Key = uniquekey.toUpperCase()
    var name;
    var faculty;
    var PrepKey = this.Key = uniquekey.toUpperCase()
    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().uid).ref.get().then((doc) => {
      if (doc.exists) {
        // console.log(doc.data());
        faculty = doc.data().createdDetails.createdFaculty;
        // console.log(faculty)
        this.firestore.collection('faculties').doc(faculty).collection('lectureSessions').snapshotChanges().subscribe(keys => {
          this.eventSource = [];
          keys.forEach(key => {
            let event: any = key.payload.doc.data();
            event.id = key.payload.doc.id;
            event.title = event.moduleTitle + " | At Hall: " + event.lectureHall;
            event.startTime = event.startDateTime.toDate();
            event.endTime = event.endDateTime.toDate();
            this.Module = event.moduleTitle
            if (name = event.lecturer) {
              var selectedDoc = key.payload.doc.id
              // console.log(PrepKey + " " + selectedDoc)
              this.firebase.sendKey(faculty, PrepKey, selectedDoc, LocationCheck).then(async resp => {
                const toast = await this.toastController.create({
                  message: 'Code Added to Module',
                  duration: 2000
                });
                toast.present();
              })
                .catch(async error => {
                  // console.log(error);
                  const toast = await this.toastController.create({
                    message: 'Error in Network, check back later. Or contact Programs Office',
                    duration: 2000
                  });
                  toast.present();
                });
            }
          });
        });

      }
    })
  }
}
