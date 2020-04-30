import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNoticePage } from './new-notice.page';

const routes: Routes = [
  {
    path: '',
    component: NewNoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNoticePageRoutingModule {}
