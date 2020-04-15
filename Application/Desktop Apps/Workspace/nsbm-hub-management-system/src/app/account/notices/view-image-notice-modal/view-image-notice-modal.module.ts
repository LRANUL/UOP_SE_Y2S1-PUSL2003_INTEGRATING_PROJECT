import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewImageNoticeModalPageRoutingModule } from './view-image-notice-modal-routing.module';

import { ViewImageNoticeModalPage } from './view-image-notice-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewImageNoticeModalPageRoutingModule
  ],
  declarations: [ViewImageNoticeModalPage]
})
export class ViewImageNoticeModalPageModule {}
