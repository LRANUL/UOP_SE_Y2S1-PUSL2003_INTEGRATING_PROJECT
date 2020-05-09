import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators'
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class TimetabeService {

  constructor(private db: AngularFirestore) { }

  getData(): Observable<any[]>{
    return this.db.collection('faculties/School of Computing/lectureSessions').valueChanges().pipe(
      map(events=> events.map(event =>{
        let data:any=event;
        data.start = data.startDateTime.toDate();
        data.end= data.endDateTime.toDate();
        data.title=data.moduleTitle;
        return data;
      }))
    );
  }
}
