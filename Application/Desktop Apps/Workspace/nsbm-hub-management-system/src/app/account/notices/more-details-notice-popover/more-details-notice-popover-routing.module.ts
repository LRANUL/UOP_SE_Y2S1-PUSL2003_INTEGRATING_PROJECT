import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsNoticePopoverPage } from './more-details-notice-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsNoticePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsNoticePopoverPageRoutingModule {}
