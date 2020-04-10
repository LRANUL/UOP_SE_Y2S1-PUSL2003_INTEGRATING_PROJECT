import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemesterCalendarPage } from './semester-calendar.page';

import { EditLectureSessionModalPageModule } from './edit-lecture-session-modal/edit-lecture-session-modal.module';

const routes: Routes = [
  {
    path: '',
    component: SemesterCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemesterCalendarPageRoutingModule {}
