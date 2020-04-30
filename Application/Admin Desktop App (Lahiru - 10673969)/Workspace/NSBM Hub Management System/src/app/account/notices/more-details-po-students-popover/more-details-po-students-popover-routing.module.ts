import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsPoStudentsPopoverPage } from './more-details-po-students-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsPoStudentsPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsPoStudentsPopoverPageRoutingModule {}
