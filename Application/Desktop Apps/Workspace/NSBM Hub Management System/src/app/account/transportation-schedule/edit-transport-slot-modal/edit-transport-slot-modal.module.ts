import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTransportSlotModalPageRoutingModule } from './edit-transport-slot-modal-routing.module';

import { EditTransportSlotModalPage } from './edit-transport-slot-modal.page';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditTransportSlotModalPageRoutingModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [EditTransportSlotModalPage]
})
export class EditTransportSlotModalPageModule {}
