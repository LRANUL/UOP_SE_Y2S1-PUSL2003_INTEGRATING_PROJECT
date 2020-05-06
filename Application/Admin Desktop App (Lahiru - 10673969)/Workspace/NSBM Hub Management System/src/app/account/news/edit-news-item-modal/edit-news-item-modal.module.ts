import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNewsItemModalPageRoutingModule } from './edit-news-item-modal-routing.module';

import { EditNewsItemModalPage } from './edit-news-item-modal.page';

import { FileSizeFormatPipe } from './file-size-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditNewsItemModalPageRoutingModule
  ],
  declarations: [
    EditNewsItemModalPage,
    FileSizeFormatPipe
  ]
})
export class EditNewsItemModalPageModule {}
