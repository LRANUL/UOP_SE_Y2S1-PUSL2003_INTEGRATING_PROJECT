import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsLecturesPopoverPageRoutingModule } from './more-details-lectures-popover-routing.module';

import { MoreDetailsLecturesPopoverPage } from './more-details-lectures-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsLecturesPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsLecturesPopoverPage]
})
export class MoreDetailsLecturesPopoverPageModule {}
