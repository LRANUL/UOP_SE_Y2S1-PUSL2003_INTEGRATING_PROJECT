import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsAndMediaPageRoutingModule } from './news-and-media-routing.module';

import { NewsAndMediaPage } from './news-and-media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsAndMediaPageRoutingModule
  ],
  declarations: [NewsAndMediaPage]
})
export class NewsAndMediaPageModule {}
