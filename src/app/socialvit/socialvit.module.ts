import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialvitPageRoutingModule } from './socialvit-routing.module';

import { SocialvitPage } from './socialvit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialvitPageRoutingModule
  ],
  declarations: [SocialvitPage]
})
export class SocialvitPageModule {}
