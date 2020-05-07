import { Injectable } from '@angular/core';
import { note } from './notes.model';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take,map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private authServ:AuthService) { }
  private _notes= new BehaviorSubject<note[]>( [
    {
      id:'1',
      title:'title_1',
      subject:'Java',
      date:new Date('2019-01-01'),
      desc:"note 1",
      userId:'1'
    },
    {
      id:'12',
      title:'title_1',
      subject:'Algo',
      date:new Date('2019-01-01'),
      desc:"note 2",
      userId:'1'
    },
    {
      id:'3',
      title:'title_1',
      subject:'Iot ',
      date:new Date('2019-01-01'),
      desc:"note 3",
      userId:'3'
    }
  ])
 get AllNotes(){
   return this._notes.asObservable();
 }
 
 getNote(noteId:string){
  return this.AllNotes.pipe(take(1),map(note =>{
    return {...note.find(note =>{ return note.id === noteId;}) };
  }));
  
 }

 addNote(title:string,subject:string,date:Date,desc:string){
    const newnote = new note(Math.random().toString(),title,subject,date,desc,this.authServ.userId);
    this.AllNotes.pipe(take(1)).subscribe(notes=>{
      this._notes.next(notes.concat(newnote))
    })
    
 }
  
}
