import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RecipesService } from './recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from './auth.service';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private dbUrl: string = 'https://ng-course-recipe-book-c75de.firebaseio.com'
  inUseSubj = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService,
    private shoppingService: ShoppingService
  ) { }

  storeRecipes() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    this.inUseSubj.next(true);
    const recipes = this.recipesService.getRecipes();
    return this.http.put<Recipe[]>(`${this.dbUrl}/recipes.json`, recipes)
    .pipe(tap(ingredients => {
      this.inUseSubj.next(false);
    }));
  }

  fetchRecipes() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    this.inUseSubj.next(true);
    return this.http.get<Recipe[]>(`${this.dbUrl}/recipes.json`)
    .pipe(tap(recipes => {
      this.recipesService.setRecipes(recipes);
      this.inUseSubj.next(false);
    }));
  }

  storeShoppingList() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    const shoppingList: Ingredient[] = this.shoppingService.getIgredients();
    this.inUseSubj.next(true);
    return this.http.put(`${this.dbUrl}/shopping-list.json`,
      {
        [this.authService.user.id]: shoppingList
      }
    )
    .pipe(tap(ingredients => {
      this.inUseSubj.next(false);
    }));
  }

  fetchShoppingList() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    this.inUseSubj.next(true);
    return this.http.get<Ingredient[]>(`${this.dbUrl}/shopping-list.json`)
    .pipe(tap(ingredients => {
      if (ingredients) {
        this.shoppingService.setIngredients([...ingredients[this.authService.user.id]]);
      }
      this.inUseSubj.next(false);
    }));
  }

}
