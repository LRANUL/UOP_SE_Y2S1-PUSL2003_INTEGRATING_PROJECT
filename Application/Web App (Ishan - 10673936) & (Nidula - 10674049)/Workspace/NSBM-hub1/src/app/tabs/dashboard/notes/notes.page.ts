import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { note } from './notes.model';
import { NoteService } from './note.Service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit ,OnDestroy{
  notes:note[];
  private noteSub:Subscription;
  constructor(
    private activeRoute: ActivatedRoute,
    private noteServ:NoteService, 
    ) { }

  ngOnInit() {
  this.noteSub =  this.noteServ.AllNotes.subscribe(notess =>{
      this.notes = notess;
    })
  }
  ngOnDestroy(){
    this.noteSub.unsubscribe();
  }
}
