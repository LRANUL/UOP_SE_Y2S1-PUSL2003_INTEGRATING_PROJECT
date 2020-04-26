import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsPoStudentsPopoverPageRoutingModule } from './more-details-po-students-popover-routing.module';

import { MoreDetailsPoStudentsPopoverPage } from './more-details-po-students-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsPoStudentsPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsPoStudentsPopoverPage]
})
export class MoreDetailsPoStudentsPopoverPageModule {}
