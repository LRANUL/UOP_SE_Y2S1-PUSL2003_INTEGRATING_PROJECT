import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 't1',
    component: TabsPage,
    children:[
      {path:'Dashboard' ,children: [
        {path: '',loadChildren:'./dashboard/dashboard.module#DashboardPageModule'},
        {path:'news',loadChildren:'./dashboard/news/news.module#NewsPageModule'},
        {path:'notes',loadChildren:'./dashboard/notes/notes.module#NotesPageModule'},
        {path:'notices',children:[
          {path:'',loadChildren:'./dashboard/notices/notes.module#NoticesPageModule' ,pathMatch:'full'},
          {path:'new',loadChildren:'./dashboard/notices/new-notice/new-notice.module#NewNoticePageModule'},
          {path: 'edit/:noticeId', loadChildren: './dashboard/notices/notice-detail/notice-edit/notice-edit.module#NoticeEditPageModule' ,pathMatch:'full'},
          {path:':noticeId',loadChildren:'./dashboard/notices/notice-detail/notice-detail.module#NoticeDetailPageModule'}
        ]},
        {path:'shuttle-schedule',loadChildren:'./dashboard/shuttle-schedule/shuttle-schedule.module#ShuttleSchedulePageModule'},
        {path:'time-table',loadChildren:'./dashboard/time-table/time-table.module#TimeTablePageModule'}
        
       ]
      },
      {path:'Home' ,children: [
        {path: '',loadChildren:'./home/home.module#HomePageModule'},
        {path: 'events',loadChildren:'./home/events/events.module#EventPageModule'},
        {path: 'youtube',loadChildren:'./home/youtube/youtube.module#YoutubePageModule'},
        {path: 'wifi',loadChildren:'./home/wifi/wifi.module#WifiPageModule'}
      ]

      },
      {
        path:'',
      redirectTo:'/tabs/t1/Dashboard',
      pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/t1/Dashboard',
    pathMatch:'full'
  },
       
   {
     path: 'home',
     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
   },
   {
     path: 'dashboard',
     loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
   }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
