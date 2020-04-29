import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPoToStudentsNoticesModalPageRoutingModule } from './edit-po-to-students-notices-modal-routing.module';

import { EditPoToStudentsNoticesModalPage } from './edit-po-to-students-notices-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPoToStudentsNoticesModalPageRoutingModule
  ],
  declarations: [EditPoToStudentsNoticesModalPage]
})
export class EditPoToStudentsNoticesModalPageModule {}
