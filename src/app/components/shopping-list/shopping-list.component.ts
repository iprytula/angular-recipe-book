import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../models/ingredient.model';

import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  constructor(
    private shoppingService: ShoppingService
  ) { }

  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shoppingService.getIgridients();

    this.shoppingService.ingridientsChanged.subscribe(changedIngridients => {
      this.ingredients = changedIngridients;
    });
  }

}
