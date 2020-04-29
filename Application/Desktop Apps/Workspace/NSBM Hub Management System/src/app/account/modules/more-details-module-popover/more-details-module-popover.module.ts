import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsModulePopoverPageRoutingModule } from './more-details-module-popover-routing.module';

import { MoreDetailsModulePopoverPage } from './more-details-module-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsModulePopoverPageRoutingModule
  ],
  declarations: [MoreDetailsModulePopoverPage]
})
export class MoreDetailsModulePopoverPageModule {}
