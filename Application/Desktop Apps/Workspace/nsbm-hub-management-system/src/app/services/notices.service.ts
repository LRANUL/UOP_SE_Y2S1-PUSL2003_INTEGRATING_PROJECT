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

  // Retrieving the published notices (Lecturers to Program Office (PO)) from the firestore database
  retrievePublishedNotices_Lecturers_To_PO(){
    return this.firestore.collection("notices-Lecturers-To-PO").snapshotChanges();
  }

  // Retrieving the published notices (Program Office (PO) to Students) from the firestore database
  retrievePublishedNotices_PO_To_Students(){
    return this.firestore.collection("notices-PO-To-Students").snapshotChanges();
  }

  // Retrieving the published notices (Program Office (PO) to Lecturers) from the firestore database
  retrievePublishedNotices_PO_To_Lecturers(){
    return this.firestore.collection("notices-PO-To-Lecturers").snapshotChanges();
  }

  
}
