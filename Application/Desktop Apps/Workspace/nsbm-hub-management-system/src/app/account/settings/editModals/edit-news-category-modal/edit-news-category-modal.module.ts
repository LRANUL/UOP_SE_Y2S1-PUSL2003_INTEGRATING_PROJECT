import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNewsCategoryModalPageRoutingModule } from './edit-news-category-modal-routing.module';

import { EditNewsCategoryModalPage } from './edit-news-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNewsCategoryModalPageRoutingModule
  ],
  declarations: [EditNewsCategoryModalPage]
})
export class EditNewsCategoryModalPageModule {}
