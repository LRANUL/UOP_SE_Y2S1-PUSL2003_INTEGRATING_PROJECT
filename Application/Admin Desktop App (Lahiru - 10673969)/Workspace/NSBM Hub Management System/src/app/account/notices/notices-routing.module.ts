import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesPage } from './notices.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}
