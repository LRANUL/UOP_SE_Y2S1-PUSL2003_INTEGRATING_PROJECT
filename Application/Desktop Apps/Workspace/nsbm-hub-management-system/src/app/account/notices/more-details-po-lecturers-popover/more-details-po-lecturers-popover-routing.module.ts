import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsPoLecturersPopoverPage } from './more-details-po-lecturers-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsPoLecturersPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsPoLecturersPopoverPageRoutingModule {}
