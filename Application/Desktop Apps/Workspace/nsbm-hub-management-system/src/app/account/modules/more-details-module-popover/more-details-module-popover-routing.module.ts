import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsModulePopoverPage } from './more-details-module-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsModulePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsModulePopoverPageRoutingModule {}
