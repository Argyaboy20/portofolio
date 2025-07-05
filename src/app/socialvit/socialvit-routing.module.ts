import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialvitPage } from './socialvit.page';

const routes: Routes = [
  {
    path: '',
    component: SocialvitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialvitPageRoutingModule {}
