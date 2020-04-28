import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPopoverPageRoutingModule } from './notifications-popover-routing.module';

import { NotificationsPopoverPage } from './notifications-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPopoverPageRoutingModule
  ],
  declarations: [NotificationsPopoverPage]
})
export class NotificationsPopoverPageModule {}
