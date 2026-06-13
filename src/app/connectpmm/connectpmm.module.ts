import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectpmmPageRoutingModule } from './connectpmm-routing.module';

import { ConnectpmmPage } from './connectpmm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectpmmPageRoutingModule
  ],
  declarations: [ConnectpmmPage]
})
export class ConnectpmmPageModule {}
