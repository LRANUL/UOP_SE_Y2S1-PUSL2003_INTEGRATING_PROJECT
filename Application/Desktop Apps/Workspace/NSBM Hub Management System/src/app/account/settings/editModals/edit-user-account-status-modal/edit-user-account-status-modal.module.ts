import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserAccountStatusModalPageRoutingModule } from './edit-user-account-status-modal-routing.module';

import { EditUserAccountStatusModalPage } from './edit-user-account-status-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUserAccountStatusModalPageRoutingModule
  ],
  declarations: [EditUserAccountStatusModalPage]
})
export class EditUserAccountStatusModalPageModule {}
