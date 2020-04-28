import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBatchModalPageRoutingModule } from './edit-batch-modal-routing.module';

import { EditBatchModalPage } from './edit-batch-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBatchModalPageRoutingModule
  ],
  declarations: [EditBatchModalPage]
})
export class EditBatchModalPageModule {}
