import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-esign',
  templateUrl: './esign.page.html',
  styleUrls: ['./esign.page.scss'],
})
export class EsignPage implements OnInit {

  nosession: boolean;
  check: void[];
  signed: boolean;
  session: { id: string; SessionCode: any; Module: string; Session: any; Date: any; Hall: any; Lecturer: any; }[];
  CloudCode: any;
  SessionCode: any;
  Alert: string;
  location;
  constructor(private firestore: AngularFirestore, private router: Router, private firebase: ServicesService, public navCtrl: NavController, private toastController: ToastController) {

  }

  async ngOnInit() {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).set({
      accountActivity: 'Online',
    }, { merge: true });
    this.firestore.collection('userActivityMonitoring').add({
      loginDateTime: new Date(),
      userId: this.firebase.userDetails().email,
    })
    this.fetchdata()
  }

  fetchdata() {
    var Faculty: string
    var ModuleCode: string
    var LocationCheck: boolean

    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data().faculty);
        Faculty = doc.data().faculty
        // console.log(DegreeCode + Faculty + Batch)
        this.firebase.fetchSession(Faculty).subscribe(data => {
          console.log(doc.data())
          if (!doc.exists) {
            // console.log('NO SESSION FOR TODAY ')
            this.nosession = true;
          }
          else {
            this.nosession = false;
            this.check = data.map(e => {
              ModuleCode = e.payload.doc.data()['moduleCode'] + "-" + e.payload.doc.data()['moduleTitle']
              // console.log(ModuleCode)
              this.firestore.collection('Attendance/History/' + ModuleCode).doc(this.firebase.userDetails().email).ref.get().then((doc) => {
                if (doc.exists) {
                  // console.log(doc.data())
                  // console.log('ALREADY SIGNED')
                  this.signed = true;
                }
                else {
                  this.signed = false;
                  this.firebase.fetchSession(Faculty).subscribe(data => {
                    // console.log(Batch + '' + Faculty + '' + LectureDate)
                    this.session = data.map(e => {
                      ModuleCode = e.payload.doc.data()['moduleCode'] + "-" + e.payload.doc.data()['moduleTitle']
                      LocationCheck = e.payload.doc.data()['LocationCheck']
                      return {

                        id: e.payload.doc.id,
                        SessionCode: e.payload.doc.data()['SessionCode'],
                        Module: e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle'],
                        Session: e.payload.doc.data()['Session'],
                        Date: e.payload.doc.data()['startDateTime'].toDate(),
                        Hall: e.payload.doc.data()['lectureHall'],
                        Lecturer: e.payload.doc.data()['lecturer'],
                      };
                    })
                    // console.log(this.session);

                    // console.log(ModuleCode)
                    this.firestore.collection('/faculties/' + Faculty + '/lectureSessions/').doc(ModuleCode).ref.get().then((doc) => {
                      if (doc.exists) {
                        // console.log(doc.data());
                        this.CloudCode = doc.data().SessionCode
                        // console.log(this.CloudCode)
                      } else {
                        // console.log("There is no document!");

                      }
                    }).catch(function (error) {
                      // console.log("There was an error getting your document:", error);
                    });

                  })
                }
              })

            });
            navigator.geolocation.getCurrentPosition(function (position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              var NSBMPOS = 'lat: 6.8211, lng: 80.0409'
              if (LocationCheck = true) {
                if (pos.toString() == NSBMPOS) {
                  this.location = true;
                }
                else {
                  // this.location = false;
                }
              }
              if (LocationCheck = false) {
                this.location = true;
              }
            });

          }
        })
      } else {
        // console.log("There is no document!");

      }
    }).catch(function (error) {
      // console.log("There was an error getting your document:", error);
    });
  }

  async addAttendaceToFirebase() {
    var Faculty: string
    var ModuleCode: string
    if (this.CloudCode == this.SessionCode) {

      this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
        if (doc.exists) {
          // console.log(doc.data());
          Faculty = doc.data().faculty
          this.firebase.fetchSession(Faculty).subscribe(data => {
            // console.log(Batch + '' + Faculty + '' + LectureDate)
            this.session = data.map(e => {
              ModuleCode = e.payload.doc.data()['moduleCode'] + "-" + e.payload.doc.data()['moduleTitle']
              return {

                id: e.payload.doc.id,
                SessionCode: e.payload.doc.data()['SessionCode'],
                Module: e.payload.doc.data()['moduleCode'] + " " + e.payload.doc.data()['moduleTitle'],
                Session: e.payload.doc.data()['Session'],
                Date: e.payload.doc.data()['startDateTime'].toDate(),
                Hall: e.payload.doc.data()['lectureHall'],
                Lecturer: e.payload.doc.data()['lecturer'],
              };
            })
            // SENDING to FIRESTORE
            console.log(ModuleCode)
            this.firebase.sendAttendance(ModuleCode, this.firebase.userDetails().email).then(async resp => {
              const toast = await this.toastController.create({
                message: 'Your Attendance has been accepted',
                duration: 2000
              });
              toast.present();
              this.fetchdata();
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
        }
      })
    }

    else {
      const toast = await this.toastController.create({
        message: 'Session Code is Wrong ! | TRY AGAIN',
        duration: 2000
      });
      toast.present();
      this.Alert = "Session Code is Wrong ! | TRY AGAIN";
    }

  }

}
