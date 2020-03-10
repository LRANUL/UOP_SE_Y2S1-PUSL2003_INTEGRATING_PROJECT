import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { AlertController } from '@ionic/angular';

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
      icon: '../../../assets/images/account/side-menu_icons/dashboard.png'
    },
    {
      title: 'Notices',
      url: '/side-menu/notices',
      icon: '../../../assets/images/account/side-menu_icons/notices.png'
    },
    {
      title: 'Lecture Scedule',
      url: '/side-menu/lecture-schedule',
      icon: '../../../assets/images/account/side-menu_icons/lecture_schedule.png'
    },
    {
      title: 'Semester Calendar',
      url: '/side-menu/semester-calendar',
      icon: '../../../assets/images/account/side-menu_icons/semester_calendar.png'
    },
    {
      title: 'Modules',
      url: '/side-menu/modules',
      icon: '../../../assets/images/account/side-menu_icons/modules.png'
    },
    {
      title: 'Events',
      url: '/side-menu/events',
      icon: '../../../assets/images/account/side-menu_icons/events.png'
    },
    {
      title: 'News',
      url: '/side-menu/news',
      icon: '../../../assets/images/account/side-menu_icons/news.png'
    },
    {
      title: 'Transportation Schedule',
      url: '/side-menu/transportation-schedule',
      icon: '../../../assets/images/account/side-menu_icons/transportation_schedule.png'
    },
    {
      title: 'Students',
      url: '/side-menu/students',
      icon: '../../../assets/images/account/side-menu_icons/students.png'
    },
    {
      title: 'Lecturers',
      url: '/side-menu/lecturers',
      icon: '../../../assets/images/account/side-menu_icons/lecturers.png'
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    })

  }

  ngOnInit() {
  }


  // Logout Process
  logout(){

    this.alertnotice('Confirmation ', 'Are you sure you want to logout?');
    
  }


  // Alert Box Implementation (Logout)
  async alertnotice ( title: string, content: string ) {

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
            this.router.navigate(["/login"]);
            console.log("User Logged Out");
          }
        }

      ]
    });

    await alert.present();

  }


}
