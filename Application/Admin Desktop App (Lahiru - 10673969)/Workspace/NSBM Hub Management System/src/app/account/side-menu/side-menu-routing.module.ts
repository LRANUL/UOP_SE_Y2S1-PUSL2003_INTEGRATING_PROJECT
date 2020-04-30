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
        path: 'students',
        loadChildren: '../students/students.module#StudentsPageModule'
      },
      {
        path: 'lecturers',
        loadChildren: '../lecturers/lecturers.module#LecturersPageModule'
      },
      {
        path: 'transportation-schedule',
        loadChildren: '../transportation-schedule/transportation-schedule.module#TransportationSchedulePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
