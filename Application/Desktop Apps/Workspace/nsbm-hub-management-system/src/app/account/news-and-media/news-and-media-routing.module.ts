import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsAndMediaPage } from './news-and-media.page';

const routes: Routes = [
  {
    path: '',
    component: NewsAndMediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsAndMediaPageRoutingModule {}
