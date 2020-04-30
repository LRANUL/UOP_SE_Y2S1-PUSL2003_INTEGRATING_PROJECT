import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsTodaysLecturesPopoverPageRoutingModule } from './more-details-todays-lectures-popover-routing.module';

import { MoreDetailsTodaysLecturesPopoverPage } from './more-details-todays-lectures-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsTodaysLecturesPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsTodaysLecturesPopoverPage]
})
export class MoreDetailsTodaysLecturesPopoverPageModule {}
