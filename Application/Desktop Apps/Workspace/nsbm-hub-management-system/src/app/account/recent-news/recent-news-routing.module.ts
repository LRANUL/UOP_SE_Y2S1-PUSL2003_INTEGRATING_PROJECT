import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentNewsPage } from './recent-news.page';

const routes: Routes = [
  {
    path: '',
    component: RecentNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentNewsPageRoutingModule {}
