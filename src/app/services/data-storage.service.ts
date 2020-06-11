import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private dbUrl: string = 'https://ng-course-recipe-book-c75de.firebaseio.com'

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) { }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(`${this.dbUrl}/recipes.json`, recipes).subscribe(response => {});
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.dbUrl}/recipes.json`)
    .pipe(tap(recipes => {
      this.recipesService.setRecipes(recipes)
    }))
  }

}
