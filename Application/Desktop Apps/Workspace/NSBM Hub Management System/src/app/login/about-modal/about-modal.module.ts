import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutModalPageRoutingModule } from './about-modal-routing.module';

import { AboutModalPage } from './about-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutModalPageRoutingModule
  ],
  declarations: [AboutModalPage]
})
export class AboutModalPageModule {}
