import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShuttleSchedulePageRoutingModule } from './shuttle-schedule-routing.module';

import { ShuttleSchedulePage } from './shuttle-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShuttleSchedulePageRoutingModule
  ],
  declarations: [ShuttleSchedulePage]
})
export class ShuttleSchedulePageModule {}
