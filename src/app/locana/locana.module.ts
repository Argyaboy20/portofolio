import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocanaPageRoutingModule } from './locana-routing.module';

import { LocanaPage } from './locana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocanaPageRoutingModule
  ],
  declarations: [LocanaPage]
})
export class LocanaPageModule {}
