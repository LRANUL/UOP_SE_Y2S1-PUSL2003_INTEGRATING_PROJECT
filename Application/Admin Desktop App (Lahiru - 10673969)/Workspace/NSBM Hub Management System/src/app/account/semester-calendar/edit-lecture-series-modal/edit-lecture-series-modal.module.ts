import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLectureSeriesModalPageRoutingModule } from './edit-lecture-series-modal-routing.module';

import { EditLectureSeriesModalPage } from './edit-lecture-series-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLectureSeriesModalPageRoutingModule
  ],
  declarations: [EditLectureSeriesModalPage]
})
export class EditLectureSeriesModalPageModule {}
