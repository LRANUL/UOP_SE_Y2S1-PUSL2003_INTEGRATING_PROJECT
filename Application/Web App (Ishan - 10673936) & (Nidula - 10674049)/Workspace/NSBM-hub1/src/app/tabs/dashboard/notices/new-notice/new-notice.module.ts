import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNoticePageRoutingModule } from './new-notice-routing.module';

import { NewNoticePage } from './new-notice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNoticePageRoutingModule
  ],
  declarations: [NewNoticePage]
})
export class NewNoticePageModule {}
