import { Injectable } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor() { }

  ingridientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [];

  getIgredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredient(newIngridient: Ingredient): void {
    this.ingredients.push(newIngridient);
    this.ingridientsChanged.next([...this.ingredients]);
  }

  recipeToShoppingList(recipe: Recipe): void {

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
      this.ingridientsChanged.next([...this.ingredients]);
    }
  }

}
