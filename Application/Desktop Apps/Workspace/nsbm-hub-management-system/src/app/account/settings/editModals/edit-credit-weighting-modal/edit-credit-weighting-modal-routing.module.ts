import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCreditWeightingModalPage } from './edit-credit-weighting-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditCreditWeightingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCreditWeightingModalPageRoutingModule {}
