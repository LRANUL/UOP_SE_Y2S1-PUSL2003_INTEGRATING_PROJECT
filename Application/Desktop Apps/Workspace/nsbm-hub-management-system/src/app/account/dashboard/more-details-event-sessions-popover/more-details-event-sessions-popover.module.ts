import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsEventSessionsPopoverPageRoutingModule } from './more-details-event-sessions-popover-routing.module';

import { MoreDetailsEventSessionsPopoverPage } from './more-details-event-sessions-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsEventSessionsPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsEventSessionsPopoverPage]
})
export class MoreDetailsEventSessionsPopoverPageModule {}
