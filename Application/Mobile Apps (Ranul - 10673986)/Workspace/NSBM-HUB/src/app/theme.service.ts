import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const THEME = "selected-app-theme";
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
darkMode =false;
  statusBar: any;
  constructor(private plt: Platform, private storage: Storage) { 
    this.plt.ready().then(() => {
      this.storage.get(THEME).then(theme => {
        this.setAppTheme(theme);
      })


      const prefersDark = window.matchMedia("(prefers-color-schema: dark)");
      prefersDark.addListener(e => {
        console.log('Theme Set Check: ', e);
        this.setAppTheme(e.matches)
      });
    })
  }
  toggleAppTheme(){
    this.darkMode = !this.darkMode;
    this.setAppTheme(this.darkMode);
  }
  setAppTheme(dark){
  this.darkMode = dark;
  if(this.darkMode){
    document.body.classList.add("dark");
  }
  else{
    document.body.classList.remove("dark");
  }

  this.storage.set(THEME, this.darkMode);
  if(this.darkMode){
    this.statusBar.styleBlackOpaque();
    this.statusBar.backgroundColorByHexString("#000000");
  }
  else{
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByHexString("#ffffff");
  }
  }
}
