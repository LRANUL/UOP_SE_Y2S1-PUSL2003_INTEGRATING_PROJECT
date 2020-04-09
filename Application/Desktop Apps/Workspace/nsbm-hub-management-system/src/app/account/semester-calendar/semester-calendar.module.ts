import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    NgCalendarModule
  ],
  declarations: [SemesterCalendarPage]
})
export class SemesterCalendarPageModule {}
