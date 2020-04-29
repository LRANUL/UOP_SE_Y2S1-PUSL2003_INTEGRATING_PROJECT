import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCreditWeightingModalPageRoutingModule } from './edit-credit-weighting-modal-routing.module';

import { EditCreditWeightingModalPage } from './edit-credit-weighting-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditCreditWeightingModalPageRoutingModule
  ],
  declarations: [EditCreditWeightingModalPage]
})
export class EditCreditWeightingModalPageModule {}
