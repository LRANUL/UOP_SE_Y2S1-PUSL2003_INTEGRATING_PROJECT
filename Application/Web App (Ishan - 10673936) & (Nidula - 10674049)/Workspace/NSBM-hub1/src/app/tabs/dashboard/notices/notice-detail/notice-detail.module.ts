import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeDetailPageRoutingModule } from './notice-detail-routing.module';

import { NoticeDetailPage } from './notice-detail.page';
import { EditComponent } from '../edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NoticeDetailPageRoutingModule
  ],
  declarations: [NoticeDetailPage,EditComponent],
  entryComponents:[EditComponent]
})
export class NoticeDetailPageModule {}
