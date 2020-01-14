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
    if (this.route.snapshot.params.name) {
      this.recipe = this.recipesService.getRecipeByLink(this.route.snapshot.params.name);
      this.route.params.subscribe(params => {
        this.recipe = this.recipesService.getRecipeByLink(params.name);
      });
    } else {
      this.recipe = this.recipesService.getRecipes()[0];
    }
  }

  onAddToShoppingList() {
    this.shoppingService.recipeToShoppingList(this.recipe);
  }

  onEditRecipe() {
    const linkName = this.recipe.name.toLowerCase().split(' ').join('-');
    this.router.navigate(['recipes', linkName, 'edit']);
  }

}
