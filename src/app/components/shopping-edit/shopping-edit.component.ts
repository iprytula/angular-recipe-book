import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

import { Ingredient } from "src/app/models/ingredient.model";

import { ShoppingService } from "../../services/shopping.service";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;

  showErrorMessage = false;
  subscription: Subscription;
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
  editMode = false;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIngredient = this.shoppingService.getIngredient(index);
        this.editedIngredientIndex = index;
        this.slForm.setValue({
          'name': this.editedIngredient.name,
          'amount': this.editedIngredient.amount
        });
      }
    )
  }

  onAddItem(f: NgForm): void {
    if (this.editMode) {
      this.shoppingService.editIngredient(
        this.editedIngredientIndex,
        new Ingredient(f.controls.name.value, f.controls.amount.value)
      )
      this.editMode = false;
    } else {
      this.shoppingService.addIngredient(
        new Ingredient(f.controls.name.value, f.controls.amount.value)
      );
    }
    f.reset();
  }

  onClear(): void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
