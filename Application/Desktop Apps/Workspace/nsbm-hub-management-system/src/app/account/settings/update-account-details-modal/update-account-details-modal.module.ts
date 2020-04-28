import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAccountDetailsModalPageRoutingModule } from './update-account-details-modal-routing.module';

import { UpdateAccountDetailsModalPage } from './update-account-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAccountDetailsModalPageRoutingModule
  ],
  declarations: [UpdateAccountDetailsModalPage]
})
export class UpdateAccountDetailsModalPageModule {}
