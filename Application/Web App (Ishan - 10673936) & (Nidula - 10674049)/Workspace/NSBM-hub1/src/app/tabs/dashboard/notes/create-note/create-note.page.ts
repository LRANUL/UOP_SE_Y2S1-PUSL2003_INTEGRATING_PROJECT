import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { NoteService } from '../note.Service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {
@ViewChild('newNote',{static:false}) form:NgForm;
  constructor(private noteServ:NoteService,private router:Router,private LoaderCon:LoadingController) { }

  ngOnInit() {
    
  }
  onCreateNote(){
    if(!this.form.valid){
      return;
    }
    this.LoaderCon.create({
      message:'creating Note!'
    }).then(loadEl =>{
      loadEl.present();
      this.noteServ.addNote(
        this.form.value.title,
        this.form.value.subject,
        new Date(),
        this.form.value.desc
        ).subscribe(()=>{
          loadEl.dismiss();
          this.form.reset();
          this,this.router.navigate(['/tabs/t1/Dashboard/notes'])
      });
    });


    
    
  }
  
}
