import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterModalPageRoutingModule } from './register-modal-routing.module';

import { RegisterModalPage } from './register-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RegisterModalPageRoutingModule
  ],
  declarations: [RegisterModalPage]
})
export class RegisterModalPageModule {}
