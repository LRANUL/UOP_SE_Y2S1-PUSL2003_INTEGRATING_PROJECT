import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNewsItemModalPage } from './edit-news-item-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditNewsItemModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNewsItemModalPageRoutingModule {}
