import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpscalePageRoutingModule } from './upscale-routing.module';

import { UpscalePage } from './upscale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpscalePageRoutingModule
  ],
  declarations: [UpscalePage]
})
export class UpscalePageModule {}
