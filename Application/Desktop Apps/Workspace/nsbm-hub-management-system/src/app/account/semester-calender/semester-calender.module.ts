import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemesterCalenderPageRoutingModule } from './semester-calender-routing.module';

import { SemesterCalenderPage } from './semester-calender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemesterCalenderPageRoutingModule
  ],
  declarations: [SemesterCalenderPage]
})
export class SemesterCalenderPageModule {}
