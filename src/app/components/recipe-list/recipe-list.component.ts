import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../../services/recipes.service';

import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  constructor(
    private recipesService: RecipesService
  ) { }

  recipes: Recipe[];

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

}
