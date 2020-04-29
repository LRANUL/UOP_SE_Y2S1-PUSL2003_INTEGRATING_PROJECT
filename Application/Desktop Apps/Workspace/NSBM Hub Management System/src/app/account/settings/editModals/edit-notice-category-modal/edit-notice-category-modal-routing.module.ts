import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoticeCategoryModalPage } from './edit-notice-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditNoticeCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNoticeCategoryModalPageRoutingModule {}
