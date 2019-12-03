import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://www.skinnytaste.com/wp-content/uploads/2009/02/turkey-meatloaf-8.jpg'
    ),
    new Recipe(
      'Another test recipe',
      'This is simply a test',
      'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

}
