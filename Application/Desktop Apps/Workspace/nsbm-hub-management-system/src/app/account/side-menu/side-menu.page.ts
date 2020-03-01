import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

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
      title: 'Lecturer Registration',
      url: '/side-menu/lecturer-registration',
      icon: '../../../assets/images/account/side-menu_icons/lecturer_registration.png'
    },
    {
      title: 'Transportation Schedule',
      url: '/side-menu/transportation-schedule',
      icon: '../../../assets/images/account/side-menu_icons/transportation_schedule.png'
    }
  ];

  selectedPath = '';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    })
  }

  ngOnInit() {
  }

}
