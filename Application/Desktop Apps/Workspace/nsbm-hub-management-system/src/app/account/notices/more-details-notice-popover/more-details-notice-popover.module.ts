import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsNoticePopoverPageRoutingModule } from './more-details-notice-popover-routing.module';

import { MoreDetailsNoticePopoverPage } from './more-details-notice-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsNoticePopoverPageRoutingModule
  ],
  declarations: [MoreDetailsNoticePopoverPage]
})
export class MoreDetailsNoticePopoverPageModule {}
