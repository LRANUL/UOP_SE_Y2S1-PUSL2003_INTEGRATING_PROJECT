import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsEventPopoverPageRoutingModule } from './more-details-event-popover-routing.module';

import { MoreDetailsEventPopoverPage } from './more-details-event-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsEventPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsEventPopoverPage]
})
export class MoreDetailsEventPopoverPageModule {}
