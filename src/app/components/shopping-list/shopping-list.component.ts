import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../../models/ingredient.model';

import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;
  private dbInUseSubscription: Subscription;
  showSpinner = false;

  constructor(
    private shoppingService: ShoppingService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIgredients();

    this.ingredientsSubscription = this.shoppingService.ingredientsChanged.subscribe(changedIngridients => {
      this.ingredients = changedIngridients;
    });

    this.dbInUseSubscription = this.dataStorageService.inUseSubj.subscribe(dbInUse => {
      this.showSpinner = dbInUse;
    });

  }

  onEditItem(index: number): void {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
    this.dbInUseSubscription.unsubscribe();
  }

}
