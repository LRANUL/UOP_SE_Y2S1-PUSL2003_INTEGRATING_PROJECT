import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLectureSessionModalPageRoutingModule } from './edit-lecture-session-modal-routing.module';

import { EditLectureSessionModalPage } from './edit-lecture-session-modal.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLectureSessionModalPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [EditLectureSessionModalPage]
})
export class EditLectureSessionModalPageModule {}
