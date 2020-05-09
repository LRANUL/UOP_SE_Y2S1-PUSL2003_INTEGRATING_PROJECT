import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemesterCalendarPageRoutingModule } from './semester-calendar-routing.module';

import { SemesterCalendarPage } from './semester-calendar.page';

import { NgCalendarModule } from 'ionic2-calendar';

import { MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from 'src/app/material.module';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemesterCalendarPageRoutingModule,
    ReactiveFormsModule,
    NgCalendarModule,
    MatTooltipModule,     
    HttpClientModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [SemesterCalendarPage]
})
export class SemesterCalendarPageModule {}
