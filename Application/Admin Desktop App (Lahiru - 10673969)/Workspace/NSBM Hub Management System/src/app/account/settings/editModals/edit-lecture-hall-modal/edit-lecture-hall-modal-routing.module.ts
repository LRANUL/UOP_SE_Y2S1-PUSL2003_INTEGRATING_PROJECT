import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLectureHallModalPage } from './edit-lecture-hall-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditLectureHallModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLectureHallModalPageRoutingModule {}
