import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationSchedulePageRoutingModule } from './transportation-schedule-routing.module';

import { TransportationSchedulePage } from './transportation-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransportationSchedulePageRoutingModule
  ],
  declarations: [TransportationSchedulePage]
})
export class TransportationSchedulePageModule {}
