import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreInformationPopoverPage } from './more-information-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreInformationPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreInformationPopoverPageRoutingModule {}
