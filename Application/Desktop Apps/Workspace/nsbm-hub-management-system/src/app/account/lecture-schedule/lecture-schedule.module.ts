import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectureSchedulePageRoutingModule } from './lecture-schedule-routing.module';

import { LectureSchedulePage } from './lecture-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectureSchedulePageRoutingModule
  ],
  declarations: [LectureSchedulePage]
})
export class LectureSchedulePageModule {}
