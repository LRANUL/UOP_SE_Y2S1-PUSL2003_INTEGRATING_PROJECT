import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNewsCategoryModalPage } from './edit-news-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditNewsCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNewsCategoryModalPageRoutingModule {}
