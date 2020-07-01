import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipesService } from '../../../services/recipes.service';

import { Recipe } from '../../../models/recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

import { listItemAnimation } from 'src/app/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [ listItemAnimation ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  recipes: Recipe[];
  subscription: Subscription;

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe(changedRecipes => {
      this.recipes = changedRecipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
