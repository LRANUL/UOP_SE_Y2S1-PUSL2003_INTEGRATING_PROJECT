import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators'
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private db: AngularFirestore) { }

}
