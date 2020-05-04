import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'notices',
    loadChildren: () => import('./notices/notices.module').then( m => m.NoticesPageModule)
  },
  {
    path: 'shuttle-schedule',
    loadChildren: () => import('./shuttle-schedule/shuttle-schedule.module').then( m => m.ShuttleSchedulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
