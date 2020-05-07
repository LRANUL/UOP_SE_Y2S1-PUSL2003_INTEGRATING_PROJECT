import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesPage } from './notes.page';

const routes: Routes = [
  {
    path: '',
    component: NotesPage
  },
  {
    path: 'new-note',
    loadChildren: () => import('./create-note/create-note.module').then( m => m.CreateNotePageModule)
  },
  {
    path: ':noteId',
    loadChildren: () => import('./edit-notes/edit-notes.module').then( m => m.EditNotesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
