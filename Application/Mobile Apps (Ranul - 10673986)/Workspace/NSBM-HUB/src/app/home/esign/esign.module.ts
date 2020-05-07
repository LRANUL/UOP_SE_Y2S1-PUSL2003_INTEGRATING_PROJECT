import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsignPageRoutingModule } from './esign-routing.module';

import { EsignPage } from './esign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsignPageRoutingModule
  ],
  declarations: [EsignPage]
})
export class EsignPageModule {}
