import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsSessionPopoverPage } from './more-details-session-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsSessionPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsSessionPopoverPageRoutingModule {}
