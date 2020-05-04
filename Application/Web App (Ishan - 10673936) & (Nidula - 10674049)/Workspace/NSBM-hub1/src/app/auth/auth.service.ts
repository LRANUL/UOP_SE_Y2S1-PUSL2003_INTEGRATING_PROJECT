import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isAuth:boolean=true;
  constructor() { }

  login(){
    this.isAuth =true;
  } 

  logout(){
    this.isAuth=false;
  }

  get authStatus(){
    return this.isAuth;
  }
}

