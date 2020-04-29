import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEventSessionModalPage } from './edit-event-session-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditEventSessionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEventSessionModalPageRoutingModule {}
