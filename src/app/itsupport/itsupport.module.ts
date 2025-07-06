import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItsupportPageRoutingModule } from './itsupport-routing.module';

import { ItsupportPage } from './itsupport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItsupportPageRoutingModule
  ],
  declarations: [ItsupportPage]
})
export class ItsupportPageModule {}
