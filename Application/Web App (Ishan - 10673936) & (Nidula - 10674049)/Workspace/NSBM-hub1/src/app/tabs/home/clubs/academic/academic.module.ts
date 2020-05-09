import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicPageRoutingModule } from './academic-routing.module';

import { AcademicPage } from './academic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicPageRoutingModule
  ],
  declarations: [AcademicPage]
})
export class AcademicPageModule {}
