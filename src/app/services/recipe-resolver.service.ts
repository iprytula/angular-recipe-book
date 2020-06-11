import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    return recipes.length === 0 ? this.dataStorageService.fetchRecipes() : recipes;
  }
}
