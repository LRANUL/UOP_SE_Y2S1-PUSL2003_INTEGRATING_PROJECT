import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditModuleModalPageRoutingModule } from './edit-module-modal-routing.module';

import { EditModuleModalPage } from './edit-module-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditModuleModalPageRoutingModule
  ],
  declarations: [EditModuleModalPage]
})
export class EditModuleModalPageModule {}
