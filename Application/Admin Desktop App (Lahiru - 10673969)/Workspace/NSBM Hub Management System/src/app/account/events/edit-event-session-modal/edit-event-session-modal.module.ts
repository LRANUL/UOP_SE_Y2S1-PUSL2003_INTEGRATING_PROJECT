import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEventSessionModalPageRoutingModule } from './edit-event-session-modal-routing.module';

import { EditEventSessionModalPage } from './edit-event-session-modal.page';
import { MaterialModule } from 'src/app/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditEventSessionModalPageRoutingModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [EditEventSessionModalPage]
})
export class EditEventSessionModalPageModule {}
