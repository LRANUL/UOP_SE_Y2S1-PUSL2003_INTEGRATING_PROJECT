import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPoToLecturersNoticesModalPageRoutingModule } from './edit-po-to-lecturers-notices-modal-routing.module';

import { EditPoToLecturersNoticesModalPage } from './edit-po-to-lecturers-notices-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPoToLecturersNoticesModalPageRoutingModule
  ],
  declarations: [EditPoToLecturersNoticesModalPage]
})
export class EditPoToLecturersNoticesModalPageModule {}
