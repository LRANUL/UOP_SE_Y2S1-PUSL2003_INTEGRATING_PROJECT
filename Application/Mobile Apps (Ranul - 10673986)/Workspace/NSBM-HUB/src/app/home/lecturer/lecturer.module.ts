import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturerPageRoutingModule } from './lecturer-routing.module';

import { LecturerPage } from './lecturer.page';
import { NgCalendarModule } from 'ionic2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [LecturerPage]
})
export class LecturerPageModule {}
