import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreDetailsPoLecturersPopoverPageRoutingModule } from './more-details-po-lecturers-popover-routing.module';

import { MoreDetailsPoLecturersPopoverPage } from './more-details-po-lecturers-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreDetailsPoLecturersPopoverPageRoutingModule
  ],
  declarations: [MoreDetailsPoLecturersPopoverPage]
})
export class MoreDetailsPoLecturersPopoverPageModule {}
