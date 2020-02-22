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
