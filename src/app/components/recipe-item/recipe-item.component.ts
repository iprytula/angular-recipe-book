import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../models/recipe.model';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  constructor(
    private recipesService: RecipesService
  ) { }
  recipeName: string;

  @Input() recipe: Recipe;

  ngOnInit() {
    this.recipeName = this.recipe.name.toLowerCase().split(' ').join('-');
  }

}
