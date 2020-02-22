import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentNewsPageRoutingModule } from './recent-news-routing.module';

import { RecentNewsPage } from './recent-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentNewsPageRoutingModule
  ],
  declarations: [RecentNewsPage]
})
export class RecentNewsPageModule {}
