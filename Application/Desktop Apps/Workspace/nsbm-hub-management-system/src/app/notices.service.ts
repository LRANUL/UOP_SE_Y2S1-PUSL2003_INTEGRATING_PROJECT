import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createNewNotice(record) {
    return this.firestore.collection('Notices').add(record);
  }

  
}
