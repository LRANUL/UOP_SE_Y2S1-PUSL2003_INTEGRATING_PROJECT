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
  EventID: any;
  Lecturer: any;
  constructor(private toastController: ToastController, private firestore: AngularFirestore, private firebase: ServicesService, public loadingController: LoadingController, public navCtrl: NavController) { }
  ngOnInit() {
    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().email).set({
      accountActivity: 'Online',
    }, { merge: true });
    this.firestore.collection('userActivityMonitoring').add({
      loginDateTime: new Date(),
      userId: this.firebase.userDetails().uid,
      userEmail: this.firebase.userDetails().email,
    })
    var faculty;

    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      if (doc.exists) {
        // console.log(doc.data());
        faculty = doc.data().createdDetails.createdFaculty;
        // console.log(faculty)
        this.firestore.collection('faculties').doc(faculty).collection('lectureSessions').snapshotChanges().subscribe(keys => {
          this.eventSource = [];
          keys.forEach(key => {
            let event: any = key.payload.doc.data();
            event.id = key.payload.doc.id;
            event.lecturer = event.lecturer;
            event.title = event.moduleCode + " | At Hall: " + event.lectureHall;
            event.startTime = event.startDateTime.toDate();
            event.endTime = event.endDateTime.toDate();
            this.eventSource.push(event);
          });
        });
      }
    })
  }
  onEventSelected = (event) => {
    console.log(event.title);
    this.Module = event.moduleTitle
    this.EventID = event.id
    this.Lecturer = event.lecturer
  };
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
    var name ="";
    var faculty;
    var PrepKey = this.Key = uniquekey.toUpperCase()
    this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().email).ref.get().then(async (doc) => {
      if (doc.exists) {
        console.log(doc.data());
        faculty = doc.data().createdDetails.createdFaculty;
        name = doc.data().name.prefix + " " + doc.data().name.firstName + " " + doc.data().name.lastName;
        // console.log(faculty)
        // this.firestore.collection('faculties').doc(faculty).collection('lectureSessions').snapshotChanges().subscribe(async keys => {
        //   this.eventSource = [];
        //   keys.forEach(async key => {
        //     let event: any = key.payload.doc.data();
        //     event.id = key.payload.doc.id;
        //     event.lecturer = event.lecturer;
        //     event.title = event.moduleTitle + " | At Hall: " + event.lectureHall;
        //     event.startTime = event.startDateTime.toDate();
        //     event.endTime = event.endDateTime.toDate();

        //   });
        // console.log(PrepKey)
        // console.log(this.EventID)
        // console.log(name)
        // console.log(this.Lecturer.toString())

        if (name == this.Lecturer.toString()) {
          var selectedDoc = this.EventID
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
            }
            );
        }
        else {
          const toast = await this.toastController.create({
            message: 'You are not Teaching this module',
            duration: 2000
          });
          toast.present();
        }
      };
    this.ngOnInit();
    })
  }

}
