import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNoticeCategoryModalPageRoutingModule } from './edit-notice-category-modal-routing.module';

import { EditNoticeCategoryModalPage } from './edit-notice-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditNoticeCategoryModalPageRoutingModule
  ],
  declarations: [EditNoticeCategoryModalPage]
})
export class EditNoticeCategoryModalPageModule {}
