import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipesService } from './recipes.service';

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
    this.http.put(`${this.dbUrl}/recipes.json`, recipes).subscribe(response => console.log(response));
  }

}
