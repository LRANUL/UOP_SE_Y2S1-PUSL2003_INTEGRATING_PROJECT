import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectureSchedulePageRoutingModule } from './lecture-schedule-routing.module';

import { LectureSchedulePage } from './lecture-schedule.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgCalendarModule,
    IonicModule,
    LectureSchedulePageRoutingModule
  ],
  declarations: [LectureSchedulePage]
})
export class LectureSchedulePageModule {}
