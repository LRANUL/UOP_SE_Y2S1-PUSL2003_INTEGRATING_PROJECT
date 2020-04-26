import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsLecturersPoPopoverPageRoutingModule } from './more-details-lecturers-po-popover-routing.module';

import { MoreDetailsLecturersPoPopoverPage } from './more-details-lecturers-po-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsLecturersPoPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsLecturersPoPopoverPage]
})
export class MoreDetailsLecturersPoPopoverPageModule {}
