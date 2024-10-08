import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
islogingin = false; 
islogin=true;
  constructor(private authService:AuthService,private router:Router,private Load:LoadingController) { }

  ngOnInit() {
  }

  onLoggingIn(authForm:NgForm){
    this.Load.create({keyboardClose:true,message:'Loggin in...'}).then(loadEle=>{
      loadEle.present();
      this.authService.login(); 
    this.islogingin =true
    setTimeout(() =>{
      this.islogingin = false;
      loadEle.dismiss();
      this.router.navigateByUrl('/tabs/t1/Dashboard');
    },1800);
    });
    
    
   
  }

  onSubmit(authForm:NgForm){
    console.log(authForm);
  }
  onSwitchMode(){
      this.islogin=!this.islogin;
  }
}
