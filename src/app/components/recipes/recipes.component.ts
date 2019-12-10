import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      '1',
      'A test recipe',
      'This is simply a test',
      'https://www.skinnytaste.com/wp-content/uploads/2009/02/turkey-meatloaf-8.jpg'
    ),
    new Recipe(
      '2',
      'Another test recipe',
      'Another simply a test',
      'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg'
    )
  ];
  selectedRecipe = null;

  constructor() { }

  ngOnInit() {
  }

  recipesWasSelected(recipe: { id: string, name: string, description: string, imagePath: string }) {
    this.selectedRecipe = recipe;
  }

}
