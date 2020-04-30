import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLectureSeriesModalPage } from './edit-lecture-series-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditLectureSeriesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLectureSeriesModalPageRoutingModule {}
