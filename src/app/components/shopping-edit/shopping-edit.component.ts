import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/models/ingredient.model';

import { ShoppingService } from '../../services/shopping.service';
import { NgForm } from '@angular/forms';

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

  onAddItem(f: NgForm) {
    console.log(f);
  }

}
