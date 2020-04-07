import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemesterCalendarPageRoutingModule } from './semester-calendar-routing.module';

import { SemesterCalendarPage } from './semester-calendar.page';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemesterCalendarPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [SemesterCalendarPage]
})
export class SemesterCalendarPageModule {}
