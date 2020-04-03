import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPanelPageRoutingModule } from './notifications-panel-routing.module';

import { NotificationsPanelPage } from './notifications-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPanelPageRoutingModule
  ],
  declarations: [NotificationsPanelPage]
})
export class NotificationsPanelPageModule {}
