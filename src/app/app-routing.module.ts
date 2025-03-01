import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'biodata',
    loadChildren: () => import('./biodata/biodata.module').then( m => m.BiodataPageModule)
  },
  {
    path: 'galeri-kehidupan',
    loadChildren: () => import('./galeri-kehidupan/galeri-kehidupan.module').then( m => m.GaleriKehidupanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}