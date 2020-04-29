import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authError:any;

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }
  login(frm){
    this.auth.login(frm.value.email, frm.value.password);
  }

}
