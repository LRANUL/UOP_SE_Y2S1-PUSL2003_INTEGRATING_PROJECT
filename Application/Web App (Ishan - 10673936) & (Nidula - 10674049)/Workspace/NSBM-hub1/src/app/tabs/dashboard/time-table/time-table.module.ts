import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeTablePageRoutingModule } from './time-table-routing.module';

import { TimeTablePage } from './time-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeTablePageRoutingModule
  ],
  declarations: [TimeTablePage]
})
export class TimeTablePageModule {}
