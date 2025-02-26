import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriKehidupanPageRoutingModule } from './galeri-kehidupan-routing.module';

import { GaleriKehidupanPage } from './galeri-kehidupan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriKehidupanPageRoutingModule
  ],
  declarations: [GaleriKehidupanPage]
})
export class GaleriKehidupanPageModule {}
