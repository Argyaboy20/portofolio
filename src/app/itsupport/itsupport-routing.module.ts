import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItsupportPage } from './itsupport.page';

const routes: Routes = [
  {
    path: '',
    component: ItsupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItsupportPageRoutingModule {}
