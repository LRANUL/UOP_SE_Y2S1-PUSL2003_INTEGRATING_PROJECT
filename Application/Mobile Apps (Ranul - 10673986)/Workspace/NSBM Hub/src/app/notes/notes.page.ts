import { ServicesService } from './../services.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

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
  StudentID = '';
  constructor(
    public database: AngularFireDatabase, private firebase: ServicesService, private firestore: AngularFirestore
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
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      this.StudentID = doc.data().nsbmStudentID
    
    this.database.list('/PrivateNotes/' + this.StudentID).push({
      text: this.Note,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
    })
  }



  changeCheckState(ev: any) {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      this.StudentID = doc.data().nsbmStudentID
    console.log('checked: ' + ev.checked);
    this.database.object('/PrivateNotes/' + this.StudentID + ev.key + '/checked/').set(ev.checked);
    })

  }

  deleteNote(Note: any) {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      this.StudentID = doc.data().nsbmStudentID
    this.database.list('/PrivateNotes/' + this.StudentID).remove(Note.key);
    })

  }


  getNotes(event) {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      this.StudentID = doc.data().nsbmStudentID
    console.log('Begin async operation');
    setTimeout(() => {
      this.database.list('/PrivateNotes/' + this.StudentID).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
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
    })
  }
  autorefresh(event) {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.firebase.userDetails().email).ref.get().then((doc) => {
      this.StudentID = doc.data().nsbmStudentID
    this.database.list('/PrivateNotes/' + this.StudentID).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
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
    })
  }
}
