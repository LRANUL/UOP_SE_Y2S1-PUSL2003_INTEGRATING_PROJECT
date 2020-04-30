import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPoToStudentsNoticesModalPage } from './edit-po-to-students-notices-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditPoToStudentsNoticesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPoToStudentsNoticesModalPageRoutingModule {}
