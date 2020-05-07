import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { NoteService } from '../note.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {
@ViewChild('newNote',{static:false}) form:NgForm;
  constructor(private noteServ:NoteService,private router:Router) { }

  ngOnInit() {
    
  }
  onCreateNote(){
    if(!this.form.valid){
      return;
    }
    this.noteServ.addNote(this.form.value.title,this.form.value.subject,new Date('2019-01-01'),this.form.value.desc);
    this.form.reset();
    this,this.router.navigate(['/tabs/t1/Dashboard/notes'])
  }
  
}
