import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsTodaysLecturesPopoverPage } from './more-details-todays-lectures-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsTodaysLecturesPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsTodaysLecturesPopoverPageRoutingModule {}
