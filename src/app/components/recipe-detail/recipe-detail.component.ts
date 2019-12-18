import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../../services/recipes.service';

import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipesService: RecipesService
  ) { }

  recipe: Recipe;

  ngOnInit() {
    this.recipesService.onRecipeSelect.subscribe(recipe => {
      this.recipe = recipe;
    });
  }

}
