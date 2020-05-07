import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isAuth:boolean=true;
private _userId:string ="hii";
private _isStudent:boolean=true;
  constructor() { }

  login(){
    this.isAuth =true;
  } 

  get userId(){
    return this._userId;
  }

  get isStudent(){
    return this._isStudent;
  }

  logout(){
    this.isAuth=false;
  }

  get authStatus(){
    return this.isAuth;
  }
}

