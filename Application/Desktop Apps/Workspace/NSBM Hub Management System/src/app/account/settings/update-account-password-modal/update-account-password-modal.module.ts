import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAccountPasswordModalPageRoutingModule } from './update-account-password-modal-routing.module';

import { UpdateAccountPasswordModalPage } from './update-account-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateAccountPasswordModalPageRoutingModule
  ],
  declarations: [UpdateAccountPasswordModalPage]
})
export class UpdateAccountPasswordModalPageModule {}
