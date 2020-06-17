import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private dbUrl: string = 'https://ng-course-recipe-book-c75de.firebaseio.com'

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    const recipes = this.recipesService.getRecipes();
    this.http.put(`${this.dbUrl}/recipes.json?auth=${this.authService.user.token}`, recipes).subscribe();
  }

  fetchRecipes() {
    if (!this.authService.user || !this.authService.user.token)
      return;

    return this.http.get<Recipe[]>(`${this.dbUrl}/recipes.json?auth=${this.authService.user.token}`)
    .pipe(tap(recipes => {
      this.recipesService.setRecipes(recipes);
    }))
  }

}
