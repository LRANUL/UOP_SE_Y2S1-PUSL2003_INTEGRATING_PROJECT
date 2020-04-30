import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeDetailPageRoutingModule } from './notice-detail-routing.module';

import { NoticeDetailPage } from './notice-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticeDetailPageRoutingModule
  ],
  declarations: [NoticeDetailPage]
})
export class NoticeDetailPageModule {}
