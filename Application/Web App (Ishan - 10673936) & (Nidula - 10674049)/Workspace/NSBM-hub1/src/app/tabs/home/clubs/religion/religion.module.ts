import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReligionPageRoutingModule } from './religion-routing.module';

import { ReligionPage } from './religion.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReligionPageRoutingModule
  ],
  declarations: [ReligionPage]
})
export class ReligionPageModule {}
