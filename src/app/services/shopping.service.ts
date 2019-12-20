import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor() { }

  ingridientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [];

  getIgredients() {
    return [...this.ingredients];
  }

  addIngredient(newIngridient: Ingredient) {
    this.ingredients.push(newIngridient);
    this.ingridientsChanged.emit([...this.ingredients]);
  }

  recipeToShoppingList(recipe: Recipe) {

    if (this.ingredients.length) {
      this.ingredients.forEach((ing, i) => {
        recipe.ingredients.forEach(nIng => {
          if (ing.name.toLowerCase() === nIng.name.toLowerCase()) {
            this.ingredients[i].amount = this.ingredients[i].amount + nIng.amount;
          }

          const existing = this.ingredients.find(cIng => {
            return cIng.name.toLowerCase() === nIng.name.toLowerCase();
          });

          if (!existing) {
            this.ingredients.push(nIng);
          }
        });
      });
    } else {
      this.ingredients.push(...recipe.ingredients);
    }
  }

}
