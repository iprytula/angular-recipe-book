import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../../services/recipes.service';
import { ShoppingService } from '../../services/shopping.service';

import { Recipe } from '../../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  recipe: Recipe;

  ngOnInit() {
    if (this.route.snapshot.params['index']) {
      const index = this.route.snapshot.params['index'];
      this.recipe = this.recipesService.getRecipe(index)
      this.route.params.subscribe(params => {
        this.recipe = this.recipesService.getRecipe(params['index']);
      });
    } else {
      this.recipe = this.recipesService.getRecipe(0);
    }
  }

  onAddToShoppingList() {
    this.shoppingService.recipeToShoppingList(this.recipe);
  }

  onEditRecipe() {
    const index = this.route.snapshot.params['index'];
    this.router.navigate(['recipes', index, 'edit']);
  }

}
