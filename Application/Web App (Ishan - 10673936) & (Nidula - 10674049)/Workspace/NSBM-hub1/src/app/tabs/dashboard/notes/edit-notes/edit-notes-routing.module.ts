import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNotesPage } from './edit-notes.page';

const routes: Routes = [
  {
    path: '',
    component: EditNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNotesPageRoutingModule {}
