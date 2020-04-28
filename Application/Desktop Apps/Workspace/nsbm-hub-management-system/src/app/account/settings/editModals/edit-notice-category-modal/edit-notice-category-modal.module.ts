import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNoticeCategoryModalPageRoutingModule } from './edit-notice-category-modal-routing.module';

import { EditNoticeCategoryModalPage } from './edit-notice-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNoticeCategoryModalPageRoutingModule
  ],
  declarations: [EditNoticeCategoryModalPage]
})
export class EditNoticeCategoryModalPageModule {}
