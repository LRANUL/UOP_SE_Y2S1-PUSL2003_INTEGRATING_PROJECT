import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsLecturersPoPopoverPage } from './more-details-lecturers-po-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsLecturersPoPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsLecturersPoPopoverPageRoutingModule {}
