import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesPageRoutingModule } from './notices-routing.module';

import { NoticesPage } from './notices.page';

import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NoticesPageRoutingModule
  ],
  declarations: [
    NoticesPage,
    FileSizeFormatPipe
  ]
})
export class NoticesPageModule {}
