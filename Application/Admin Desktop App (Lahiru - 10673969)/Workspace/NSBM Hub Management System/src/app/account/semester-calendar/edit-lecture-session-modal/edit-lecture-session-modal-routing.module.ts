import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLectureSessionModalPage } from './edit-lecture-session-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditLectureSessionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLectureSessionModalPageRoutingModule {}
