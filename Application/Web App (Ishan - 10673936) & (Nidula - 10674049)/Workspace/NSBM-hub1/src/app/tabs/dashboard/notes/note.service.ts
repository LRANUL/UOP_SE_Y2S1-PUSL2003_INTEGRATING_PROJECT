import { Injectable } from '@angular/core';
import { note } from './notes.model';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take,map, tap, delay } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private authServ:AuthService) { }
  private _notes= new BehaviorSubject<note[]>( [
    {
      id:'1',
      title:'Java pRoject -info',
      subject:'Java',
      date:new Date('2019-01-01'),
      desc:"Description ",
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

    return this.AllNotes.pipe(
      take(1),
      delay(1500),
      tap(notee=>{
        this._notes.next(notee.concat(newnote));
    }));
    
 }
  
}
