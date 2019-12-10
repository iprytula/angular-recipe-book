import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes;
  @Output() whenRecipeSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  recipeWasSelected(id: string) {
    this.whenRecipeSelected.emit(id);
  }

}
