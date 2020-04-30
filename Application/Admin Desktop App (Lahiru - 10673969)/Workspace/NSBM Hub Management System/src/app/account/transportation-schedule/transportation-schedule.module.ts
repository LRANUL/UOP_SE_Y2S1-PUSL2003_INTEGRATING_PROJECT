import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationSchedulePageRoutingModule } from './transportation-schedule-routing.module';

import { TransportationSchedulePage } from './transportation-schedule.page';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransportationSchedulePageRoutingModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [TransportationSchedulePage]
})
export class TransportationSchedulePageModule {}
