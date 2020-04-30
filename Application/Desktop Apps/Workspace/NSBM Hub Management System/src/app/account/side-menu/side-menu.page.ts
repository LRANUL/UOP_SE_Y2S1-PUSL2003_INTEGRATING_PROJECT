import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { AlertController, LoadingController, NavParams, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  pagesTop = [
    {
      title: 'Dashboard',
      url: '/side-menu/dashboard',
      icon: 'assets/images/account/side-menu_icons/dashboard.png'
    },
    {
      title: 'Notices',
      url: '/side-menu/notices',
      icon: 'assets/images/account/side-menu_icons/notices.png'
    },
    {
      title: 'Lecture Schedule',
      url: '/side-menu/lecture-schedule',
      icon: 'assets/images/account/side-menu_icons/lecture_schedule.png'
    },
    {
      title: 'Semester Calendar',
      url: '/side-menu/semester-calendar',
      icon: 'assets/images/account/side-menu_icons/semester_calendar.png'
    },
    {
      title: 'Modules',
      url: '/side-menu/modules',
      icon: 'assets/images/account/side-menu_icons/modules.png'
    },
    {
      title: 'Events',
      url: '/side-menu/events',
      icon: 'assets/images/account/side-menu_icons/events.png'
    },
    {
      title: 'News',
      url: '/side-menu/news',
      icon: 'assets/images/account/side-menu_icons/news.png'
    },
    {
      title: 'Transportation Schedule',
      url: '/side-menu/transportation-schedule',
      icon: 'assets/images/account/side-menu_icons/transportation_schedule.png'
    },
    {
      title: 'Students',
      url: '/side-menu/students',
      icon: 'assets/images/account/side-menu_icons/students.png'
    },
    {
      title: 'Lecturers',
      url: '/side-menu/lecturers',
      icon: 'assets/images/account/side-menu_icons/lecturers.png'
    }
  ];

  selectedPath = '';

  

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private angularFireAuth: AngularFireAuth,
    private sideMenuService: FirestoreService
  ) {
    
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    })
  }

  // Declaring variable to store the faculty of the logged in user
  userFacultyFirestore;

  userEmailAddress;

  userDetailsAuth: any;

  ngOnInit() {

    // Retrieving the auth details of the logged in user
    this.userDetailsAuth = this.sideMenuService.retrieveLoggedInUserDetailsAuth();

    console.log(this.userDetailsAuth);
    console.log(this.userDetailsAuth.uid);
    console.log(this.userDetailsAuth.email);

    this.retrieveLoggedInUserDetailsFirestore();

    // Updating the program office user account activity to ONLINE
    this.sideMenuService.updateProgramOfficeUserActivity("Online", this.userDetailsAuth.email)
    .then(
        async response => {
            console.log("Program Office Account Activity Updated - ONLINE");
        }, 
        error => {
            this.alertNotice("Error", "An error has occurred: " + error);
        }
    );

  }


  // Retrieving the faculty of the logged in user and assign it the 'userFacultyFirestore' variable
  retrieveLoggedInUserDetailsFirestore = () =>
    this.sideMenuService.retrieveLoggedInUserDetailsProgramOffice(this.userDetailsAuth.uid).subscribe(userFacultyFirestore => (
      userFacultyFirestore.forEach(document => {
        let firestoreDoc:any = document.payload.doc.data();
        firestoreDoc = firestoreDoc.faculty;

        this.userFacultyFirestore = firestoreDoc;
      })
    ));

  // Passing user faculty
  passUserFaculty() {
    return this.userFacultyFirestore;
  }

  // Passing user id
  passUserId() {
    return this.userDetailsAuth.uid;
  }

  passUserEmailAddress() {
    return this.userDetailsAuth.email;
  }



  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
 
  }





  // Logout Process
  logout(){

    this.sideMenuService.logout();

    this.logoutAlert('Confirmation ', 'Are you sure you want to logout?');

  }


  // Alert Box Implementation (Logout)
  async logoutAlert ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Logout request canceled");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            
            this.logoutProcessApproved();

            // Updating the program office user account activity to OFFLINE
            this.sideMenuService.updateProgramOfficeUserActivity("Offline", this.userDetailsAuth.email)
            .then(
                async response => {
                    console.log("Program Office Account Activity Updated - OFFLINE");
                }, 
                error => {
                    this.alertNotice("Error", "An error has occurred: " + error);
                }
            );

          }
        }
      ]
    });

    await alert.present();
  }


  // Implementation after logout confirmation is approved
  async logoutProcessApproved() {
    const loading = await this.loadingController.create({
      message: 'Logging Out..',
      duration: 2000
    });

    await loading.present();

    this.router.navigate(["/login"]);

    if(firebase.auth().currentUser){
      firebase.auth().signOut()
        .then(() => {
          console.log("Logout Successful");
        }).catch((error) => {
          console.log("Logout Process Failed, " + error);
          this.alertNotice("Error", "Logout Process Failed, " + error);
        });
    }
  }


}
