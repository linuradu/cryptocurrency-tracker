import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './components/homepage/homepage.component';
import {FavoritesComponent} from './components/favorites/favorites.component';

import {OnboardGuard} from './guards/onboard.guard';
import {OnboardComponent} from './components/onboard/onboard.component';

const routes: Routes = [
  {
    path: 'onboard',
    component: OnboardComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [OnboardGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [OnboardGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
