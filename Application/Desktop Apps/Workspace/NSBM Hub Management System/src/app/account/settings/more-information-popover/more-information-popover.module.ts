import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInformationPopoverPageRoutingModule } from './more-information-popover-routing.module';

import { MoreInformationPopoverPage } from './more-information-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreInformationPopoverPageRoutingModule
  ],
  declarations: [MoreInformationPopoverPage]
})
export class MoreInformationPopoverPageModule {}
