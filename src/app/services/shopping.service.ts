import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor() { }

  ingridientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIgridients() {
    return [...this.ingredients];
  }

  addIngridient(newIngridient: Ingredient) {
    this.ingredients.push(newIngridient);
    this.ingridientsChanged.emit([...this.ingredients]);
  }
}
