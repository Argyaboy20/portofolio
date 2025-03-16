import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelawanPageRoutingModule } from './relawan-routing.module';

import { RelawanPage } from './relawan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelawanPageRoutingModule
  ],
  declarations: [RelawanPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelawanPageModule {}
