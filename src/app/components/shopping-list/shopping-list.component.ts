import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../../models/ingredient.model';

import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private shoppingService: ShoppingService
  ) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIgredients();

    this.subscription = this.shoppingService.ingridientsChanged.subscribe(changedIngridients => {
      this.ingredients = changedIngridients;
    });
  }

  onEditItem(index: number): void {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
