import { Component, OnInit, OnDestroy } from '@angular/core';
import { note } from '../notes.model';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../note.Service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.page.html',
  styleUrls: ['./edit-notes.page.scss'],
})
export class EditNotesPage implements OnInit,OnDestroy {

  note:note;
  private notSub:Subscription
  constructor(
    private activeRoute: ActivatedRoute,
    private noteServ:NoteService,
    private navCon:NavController
    ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param =>{
    if(!param.has('noteId')){
      this.navCon.navigateBack('/tabs/t1/Dashboard/notes');
      return;
    }
   this.notSub = this.noteServ.getNote(param.get('noteId')).subscribe(notee =>{
      this.note =notee
    });
  })
}
  ngOnDestroy(){
    if(this.notSub){
       this.notSub.unsubscribe();
    }
}

}
