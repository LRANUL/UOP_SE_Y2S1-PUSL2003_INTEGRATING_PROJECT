import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSessionStatusModalPageRoutingModule } from './edit-session-status-modal-routing.module';

import { EditSessionStatusModalPage } from './edit-session-status-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSessionStatusModalPageRoutingModule
  ],
  declarations: [EditSessionStatusModalPage]
})
export class EditSessionStatusModalPageModule {}
