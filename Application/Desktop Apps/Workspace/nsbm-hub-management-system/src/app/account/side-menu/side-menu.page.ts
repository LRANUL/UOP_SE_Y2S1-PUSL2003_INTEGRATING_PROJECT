import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: '/side-menu/dashboard',
      icon: 'grid-outline'
    },
    {
      title: 'Notices',
      url: '/side-menu/notices',
      icon: 'create-outline'
    },
    {
      title: 'Lecture Scedule',
      url: '/side-menu/lecture-schedule',
      icon: ''
    },
    {
      title: 'Semester Calendar',
      url: '/side-menu/semester-calendar',
      icon: ''
    },
    {
      title: 'Modules',
      url: '/side-menu/modules',
      icon: ''
    },
    {
      title: 'Events',
      url: '/side-menu/events',
      icon: ''
    },
    {
      title: 'Recent News',
      url: '/side-menu/recent-news',
      icon: ''
    },
    {
      title: 'News and Media',
      url: '/side-menu/news-and-media',
      icon: ''
    },
    {
      title: 'Lecturer Registration',
      url: '/side-menu/lecturer-registration',
      icon: ''
    },
    {
      title: 'Transportation Schedule',
      url: '/side-menu/transportation-schedule',
      icon: ''
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
