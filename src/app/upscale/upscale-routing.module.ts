import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpscalePage } from './upscale.page';

const routes: Routes = [
  {
    path: '',
    component: UpscalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpscalePageRoutingModule {}
