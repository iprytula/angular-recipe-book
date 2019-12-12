import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingredient>();

  showErrorMessage = false;

  constructor() {}

  ngOnInit() {
  }

  onAddItem() {
    const ingName: string = this.nameInputRef.nativeElement.value;
    const ingAmount: number = Number(this.amountInputRef.nativeElement.value);

    if (ingName.length > 0 && ingAmount > 0) {
      this.ingridientAdded.emit(new Ingredient(ingName, ingAmount));
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }

}
