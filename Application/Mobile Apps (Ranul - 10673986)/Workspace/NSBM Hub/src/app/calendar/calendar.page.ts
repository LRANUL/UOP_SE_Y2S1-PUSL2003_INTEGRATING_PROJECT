import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  constructor() { }

  ngOnInit() {
  }

}
