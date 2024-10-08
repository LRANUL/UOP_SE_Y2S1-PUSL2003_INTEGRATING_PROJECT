import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { ThemeService } from './../theme.service';
import { AlertController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class homePage implements OnInit {
  userEmail: string;
  student: boolean = false;
  lecturer: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    private ThemeService: ThemeService,
    private InAppBrowser: InAppBrowser,
    private firebase: ServicesService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      if (this.authService.userDetails().email.includes("students.nsbm.lk")) {
        // console.log(this.authService.userDetails().email +" Code 1")
        this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).set({
          accountActivity: 'Online',
        }, { merge: true });
        this.student = true
        this.firestore.collection('userActivityMonitoring').add({
          loginDateTime: new Date(),
          userId: this.firebase.userDetails().uid,
          userEmail: this.firebase.userDetails().email,
        })
      }
      else {
        // console.log(this.authService.userDetails().email + " Code 2")
        this.firestore.collection('/users/userTypes/lecturerUsers').doc(this.firebase.userDetails().email).set({
          accountActivity: 'Online',
        }, { merge: true });
        this.lecturer = true
        this.firestore.collection('userActivityMonitoring').add({
          loginDateTime: new Date(),
          userId: this.firebase.userDetails().uid,
          userEmail: this.firebase.userDetails().email,
        })
      }
    }
    else {
      this.navCtrl.navigateBack("");
    }
  }



  DarkMode() {
    this.ThemeService.toggleAppTheme();
  }
  openLMS() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://lmsnew.nsbm.lk/my/', '_blank', options);

  }
  openOutlook() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://outlook.office.com/mail/inbox', '_blank', options);

  }
  openOffice365() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://www.office.com/?auth=2', '_blank', options);

  }
  openCalender() {
    this.navCtrl.navigateRoot("home/calendar");
  }
  openEsign() {
    this.navCtrl.navigateRoot("home/esign");
  }
  openLecturer() {
    this.navCtrl.navigateRoot("home/lecturer");
  }
  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }

}
