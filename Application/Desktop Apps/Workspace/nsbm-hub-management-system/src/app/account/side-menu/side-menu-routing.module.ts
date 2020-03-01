import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuPage } from './side-menu.page';


const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'notices',
        loadChildren: '../notices/notices.module#NoticesPageModule'
      },
      {
        path: 'lecture-schedule',
        loadChildren: '../lecture-schedule/lecture-schedule.module#LectureSchedulePageModule'
      },
      {
        path: 'semester-calendar',
        loadChildren: '../semester-calendar/semester-calendar.module#SemesterCalendarPageModule'
      },
      {
        path: 'modules',
        loadChildren: '../modules/modules.module#ModulesPageModule'
      },
      {
        path: 'events',
        loadChildren: '../events/events.module#EventsPageModule'
      },
      {
        path: 'news',
        loadChildren: '../news/news.module#NewsPageModule'
      },
      {
        path: 'lecturer-registration',
        loadChildren: '../lecturer-registration/lecturer-registration.module#LecturerRegistrationPageModule'
      },
      {
        path: 'transportation-schedule',
        loadChildren: '../transportation-schedule/transportation-schedule.module#TransportationSchedulePageModule'
      },
      {
        path: 'account',
        loadChildren: '../account/account.module#AccountPageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
