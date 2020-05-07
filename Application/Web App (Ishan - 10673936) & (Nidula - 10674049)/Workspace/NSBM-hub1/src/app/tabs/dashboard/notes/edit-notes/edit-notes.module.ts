import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNotesPageRoutingModule } from './edit-notes-routing.module';

import { EditNotesPage } from './edit-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNotesPageRoutingModule
  ],
  declarations: [EditNotesPage]
})
export class EditNotesPageModule {}
