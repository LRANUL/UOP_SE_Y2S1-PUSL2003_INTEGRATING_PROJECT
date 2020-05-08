import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-esign',
  templateUrl: './esign.page.html',
  styleUrls: ['./esign.page.scss'],
})
export class EsignPage implements OnInit {

  nosession: boolean;
  signed: boolean;
  session: { id: string; SessionCode: any; Module: string; Date: any; Hall: any; Lecturer: any; }[];
  SessionCode: any;
  Alert: string;
  yeslocation: boolean;
  nolocation: boolean;
  Module: string;
  CloudCode: string;
  constructor(private firestore: AngularFirestore, private router: Router, private firebase: ServicesService, public navCtrl: NavController, private toastController: ToastController) {

  }

  async ngOnInit() {
    this.fetchdata()
  }
  getSessions(event) {
    setTimeout(() => {
      this.fetchdata();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  fetchdata() {
    var Faculty: string
    var ModuleCode: string
    var LocationCheck: boolean
    var user = firebase.auth().currentUser;

    this.firestore.collection('/users/userTypes/studentUsers').doc(user.email).ref.get().then((doc) => {
      if (doc.exists) {
        Faculty = doc.data().faculty
        this.firebase.fetchSession(Faculty).subscribe(data => {
          // console.log(doc.data())
          if (!doc.exists) {
            // console.log('NO SESSION FOR TODAY ')
            this.nosession = true;
          }
          else {
            this.nosession = false;
            this.firebase.fetchSession(Faculty).subscribe(data => {
              // console.log(Faculty )
              data.map(e => {
                LocationCheck = e.payload.doc.data()['LocationCheck']
                this.CloudCode = e.payload.doc.data()['SessionCode']
                // console.log(this.CloudCode)
                this.Module = e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle']
              })
              this.firestore.collection('Attendance/History/' + this.Module).doc(this.firebase.userDetails().email).ref.get().then((doc) => {
                if (doc.exists) {
                  // console.log(doc.data())
                  // console.log('ALREADY SIGNED')
                  this.signed = true;
                }
                else {
                  this.signed = false;
                  this.firebase.fetchSession(Faculty).subscribe(data => {
                    // console.log(Faculty )
                    this.session = data.map(e => {
                      LocationCheck = e.payload.doc.data()['LocationCheck']
                      this.CloudCode = e.payload.doc.data()['SessionCode']
                      // console.log(this.CloudCode)
                      this.Module = e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle']
                      // console.log(this.CloudCode)
                      return {
                        id: e.payload.doc.id,
                        SessionCode: e.payload.doc.data()['SessionCode'],
                        Module: e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle'],
                        Date: e.payload.doc.data()['startDateTime'].toDate(),
                        Hall: e.payload.doc.data()['lectureHall'],
                        Lecturer: e.payload.doc.data()['lecturer'],
                      };

                    })
                  })

                  var inlocation = true;
                  var outlocation = false;

                  navigator.geolocation.getCurrentPosition(function (position) {
                    var r = 50 //50 meter radius
                    var NSBMlat = 6.8211
                    var NSBMlng = 80.0409
                    var userlat = position.coords.latitude
                    var userlng = position.coords.longitude
                    var distance = (userlat - NSBMlat) * (userlat - NSBMlat) + (userlng - NSBMlng) * (userlng - NSBMlng);
                    r *= r;
                    if (distance < r) {
                      inlocation = true
                      outlocation = false

                    }
                    inlocation = false
                    inlocation = true
                  })
                  if (LocationCheck = true) {

                    this.yeslocation = inlocation
                    this.nolocation = outlocation

                  }
                  if (LocationCheck = false) {
                    this.yeslocation = true
                    this.nolocation = false
                  }
                }
              }).catch(function (error) {
                // console.log("There was an error getting your document:", error);
              });
            })
          }
        })
      }
    })
  }



  async addAttendaceToFirebase() {
    var Faculty: string
    var ModuleCode: string
    var user = firebase.auth().currentUser;
    this.firestore.collection('/users/userTypes/studentUsers').doc(user.email).ref.get().then(async (doc) => {
      if (doc.exists) {
        Faculty = doc.data().faculty
        this.firebase.fetchSession(Faculty).subscribe(async data => {
          // console.log(Faculty )
          data.map(e => {
            // console.log(this.CloudCode)
            this.Module = e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle']
          })
          console.log(this.SessionCode)
          console.log(this.CloudCode)
          console.log(this.Module)
          // SENDING to FIRESTORE
          this.firebase.sendAttendance(this.Module, this.firebase.userDetails().email).then(async resp => {
            const toast = await this.toastController.create({
              message: 'Your Attendance has been accepted',
              duration: 2000
            });
            toast.present();
            this.getSessions(event);
          })
            .catch(async error => {
              // console.log(error);
              const toast = await this.toastController.create({
                message: 'Error in Network, check back later.',
                duration: 2000
              });
              toast.present();
            });
        })
          // else {

          //   console.log(this.SessionCode)
          //   console.log(this.CloudCode)
          //   console.log(this.Module)
          //   const toast = await this.toastController.create({
          //     message: 'Session Code is Wrong ! | TRY AGAIN',
          //     duration: 2000
          //   });
          //   toast.present();
          //   this.Alert = "Session Code is Wrong ! | TRY AGAIN";
          // }
      }
    })
  }
}

