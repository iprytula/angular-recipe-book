import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/models/ingredient.model';

import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  showErrorMessage = false;

  constructor(
    private shoppingService: ShoppingService
  ) {}

  ngOnInit() {
  }

  onAddItem() {
    const ingName: string = this.nameInputRef.nativeElement.value;
    const ingAmount: number = Number(this.amountInputRef.nativeElement.value);

    if (ingName.length > 0 && ingAmount > 0) {
      this.shoppingService.addIngredient(new Ingredient(ingName, ingAmount));
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }

}
