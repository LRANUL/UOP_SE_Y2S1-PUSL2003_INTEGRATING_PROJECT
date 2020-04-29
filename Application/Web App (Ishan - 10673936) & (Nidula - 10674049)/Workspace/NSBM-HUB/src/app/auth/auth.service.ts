import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,private route: Router) { }

  isfound;

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          if(this.isfound= email.includes("@student"))
          {
            this.route.navigate(['about us']);
          }else
          {
            this.route.navigate(['home']);
          }
        }
      })
  }
}
