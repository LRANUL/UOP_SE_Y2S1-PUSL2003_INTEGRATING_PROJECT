import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTransportSlotModalPage } from './edit-transport-slot-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditTransportSlotModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTransportSlotModalPageRoutingModule {}
