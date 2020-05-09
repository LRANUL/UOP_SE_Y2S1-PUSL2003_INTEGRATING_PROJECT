import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubsPage } from './clubs.page';

const routes: Routes = [
  {
    path: '',
    component: ClubsPage
  },
  {
    path: 'international',
    loadChildren: () => import('./international/international.module').then( m => m.InternationalPageModule)
  },
  {
    path: 'sports',
    loadChildren: () => import('./sports/sports.module').then( m => m.SportsPageModule)
  },
  {
    path: 'academic',
    loadChildren: () => import('./academic/academic.module').then( m => m.AcademicPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'religion',
    loadChildren: () => import('./religion/religion.module').then( m => m.ReligionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubsPageRoutingModule {}
