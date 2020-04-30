import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBatchModalPage } from './edit-batch-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditBatchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBatchModalPageRoutingModule {}
