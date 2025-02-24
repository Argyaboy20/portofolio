import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriKehidupanPage } from './galeri-kehidupan.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriKehidupanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriKehidupanPageRoutingModule {}
