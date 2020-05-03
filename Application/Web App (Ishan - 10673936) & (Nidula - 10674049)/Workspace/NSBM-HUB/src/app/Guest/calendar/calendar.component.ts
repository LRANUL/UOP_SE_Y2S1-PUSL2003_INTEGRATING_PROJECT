import { Component, OnInit } from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{

  calevents: any []=[];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  constructor(private cal: CalendarService) {
  }

  CalendarEvent: any []=[];

  ngOnInit(){
    this.cal.getData().subscribe(data=> this.CalendarEvent=data);
  }

  activeDayIsOpen: boolean = true;

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
