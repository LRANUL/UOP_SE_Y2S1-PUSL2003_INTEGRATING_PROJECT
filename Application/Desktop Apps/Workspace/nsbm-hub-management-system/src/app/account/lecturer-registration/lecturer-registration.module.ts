import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturerRegistrationPageRoutingModule } from './lecturer-registration-routing.module';

import { LecturerRegistrationPage } from './lecturer-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturerRegistrationPageRoutingModule
  ],
  declarations: [LecturerRegistrationPage]
})
export class LecturerRegistrationPageModule {}
