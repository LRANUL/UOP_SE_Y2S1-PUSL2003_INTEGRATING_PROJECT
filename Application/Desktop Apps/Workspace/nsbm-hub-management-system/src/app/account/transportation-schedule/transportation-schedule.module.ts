import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationSchedulePageRoutingModule } from './transportation-schedule-routing.module';

import { TransportationSchedulePage } from './transportation-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportationSchedulePageRoutingModule
  ],
  declarations: [TransportationSchedulePage]
})
export class TransportationSchedulePageModule {}
