import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLectureSessionModalPageRoutingModule } from './edit-lecture-session-modal-routing.module';

import { EditLectureSessionModalPage } from './edit-lecture-session-modal.page';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from 'src/app/material.module';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLectureSessionModalPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [EditLectureSessionModalPage]
})
export class EditLectureSessionModalPageModule {}
