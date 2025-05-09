import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocanaPage } from './locana.page';

const routes: Routes = [
  {
    path: '',
    component: LocanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocanaPageRoutingModule {}
