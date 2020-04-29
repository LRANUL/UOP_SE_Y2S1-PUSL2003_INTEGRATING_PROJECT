import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsLecturesPopoverPage } from './more-details-lectures-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsLecturesPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsLecturesPopoverPageRoutingModule {}
