import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Ingredient } from 'src/app/models/ingredient.model';
import { DataStorageService } from '../data-storage.service';
import { ShoppingService } from '../shopping.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListResolverService implements Resolve<Ingredient[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private shoppingService: ShoppingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ingredients: Ingredient[] = this.shoppingService.getIgredients();

    return ingredients.length === 0 ? this.dataStorageService.fetchShoppingList() : ingredients;
  }
}
