import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDegreeProgramModalPageRoutingModule } from './edit-degree-program-modal-routing.module';

import { EditDegreeProgramModalPage } from './edit-degree-program-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditDegreeProgramModalPageRoutingModule
  ],
  declarations: [EditDegreeProgramModalPage]
})
export class EditDegreeProgramModalPageModule {}
