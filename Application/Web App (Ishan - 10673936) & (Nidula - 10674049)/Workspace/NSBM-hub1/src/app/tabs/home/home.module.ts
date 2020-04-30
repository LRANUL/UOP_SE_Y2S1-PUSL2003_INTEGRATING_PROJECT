import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { YoutubePageModule } from './youtube/youtube.module';
import { DashboardPageModule } from '../dashboard/dashboard.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    YoutubePageModule,
    DashboardPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
