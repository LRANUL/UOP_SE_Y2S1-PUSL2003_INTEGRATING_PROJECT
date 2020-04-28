import { ServicesService } from './../services.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss']
})
export class notesPage {
  currentDate: string;
  Note = '';
  addNote: boolean;
  Notes = [];

  constructor(
    public database: AngularFireDatabase, private firebase: ServicesService
    ) {

    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('en-GB', options);
    this.autorefresh(event);

  }


  showForm() {
    this.addNote = !this.addNote;
    this.Note = '';
  }

  addNoteToFirebase() {
    this.database.list('/PrivateNotes/' + this.firebase.userDetails().email).push({
      text: this.Note,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }



  changeCheckState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.database.object('/PrivateNotes/' + this.firebase.userDetails().email + ev.key + '/checked/').set(ev.checked);
  }

  deleteNote(Note: any) {
    this.database.list('/PrivateNotes/' + this.firebase.userDetails().email).remove(Note.key);
  }


  getNotes(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.database.list('/PrivateNotes/' + this.firebase.userDetails().email).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
        this.Notes = [];
        actions.forEach(action => {
          this.Notes.push({
            key: action.key,
            text: action.payload.exportVal().text,
            hour: action.payload.exportVal().date.substring(11, 16),
            checked: action.payload.exportVal().checked
          });
        });
      });
      console.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
  autorefresh(event) {
    this.database.list('/PrivateNotes/' + this.firebase.userDetails().email).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.Notes = [];
      actions.forEach(action => {
        this.Notes.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }
}
