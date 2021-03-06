import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LazyComponent } from './lazy/lazy.component';
import { SearchticketComponent } from './searchticket/searchticket.component';
const routes: Routes = [
  {path:'search',
  component:SearchticketComponent
  },
{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
    {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {path:'lazy',
  component:LazyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
