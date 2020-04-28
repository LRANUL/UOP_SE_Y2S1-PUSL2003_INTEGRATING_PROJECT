import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, NgCalendarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
