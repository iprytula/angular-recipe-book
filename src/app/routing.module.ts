import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesResolverService } from './components/recipes/recipes-resolver.service';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { ShoppingListResolverService } from './components/shopping-list/shopping-list-resolver.service';
import { AuthGuard } from './components/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [ AuthGuard ],
    resolve: [ RecipesResolverService ],
    loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    resolve: [ ShoppingListResolverService ],
    loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
