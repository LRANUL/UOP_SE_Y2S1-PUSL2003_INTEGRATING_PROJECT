import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeEditPage } from './notice-edit.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeEditPageRoutingModule {}
