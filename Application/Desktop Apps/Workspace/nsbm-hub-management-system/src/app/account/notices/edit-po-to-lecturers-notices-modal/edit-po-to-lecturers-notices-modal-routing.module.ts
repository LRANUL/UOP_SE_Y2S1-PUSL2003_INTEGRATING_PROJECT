import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPoToLecturersNoticesModalPage } from './edit-po-to-lecturers-notices-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditPoToLecturersNoticesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPoToLecturersNoticesModalPageRoutingModule {}
