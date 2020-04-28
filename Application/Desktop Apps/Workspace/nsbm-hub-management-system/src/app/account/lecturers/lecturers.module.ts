import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturersPageRoutingModule } from './lecturers-routing.module';

import { LecturersPage } from './lecturers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LecturersPageRoutingModule
  ],
  declarations: [LecturersPage]
})
export class LecturersPageModule {}
