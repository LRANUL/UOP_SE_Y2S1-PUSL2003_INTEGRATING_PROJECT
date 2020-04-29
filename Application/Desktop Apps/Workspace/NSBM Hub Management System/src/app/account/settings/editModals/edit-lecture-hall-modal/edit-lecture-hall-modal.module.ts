import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLectureHallModalPageRoutingModule } from './edit-lecture-hall-modal-routing.module';

import { EditLectureHallModalPage } from './edit-lecture-hall-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditLectureHallModalPageRoutingModule
  ],
  declarations: [EditLectureHallModalPage]
})
export class EditLectureHallModalPageModule {}
