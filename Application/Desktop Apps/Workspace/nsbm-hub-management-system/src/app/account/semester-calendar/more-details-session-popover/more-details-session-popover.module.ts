import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsSessionPopoverPageRoutingModule } from './more-details-session-popover-routing.module';

import { MoreDetailsSessionPopoverPage } from './more-details-session-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsSessionPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsSessionPopoverPage]
})
export class MoreDetailsSessionPopoverPageModule {}
