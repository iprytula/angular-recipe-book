import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) { }

  recipe: Recipe;
  recipeForm: FormGroup;
  editMode = false;

  ngOnInit() {
    if (this.route.snapshot.params['index']) {
      this.editMode = true;
      const index = this.route.snapshot.params['index'];

      this.recipe = this.recipesService.getRecipe(index);
      this.route.params.subscribe(params => {
        this.recipe = this.recipesService.getRecipe(params['index']);
        this.initForm();
      });
    }
  }

  private initForm() {
    let recipeName = null;
    let recipeImg = null;
    let recipeDesc = null;

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImg = this.recipe.imagePath;
      recipeDesc = this.recipe.description;
    }
    const ingredients = new FormArray([]);

    if (this.editMode) {
      if (this.recipe.ingredients) {
        for (let ingredient of this.recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    } else {
      ingredients.push(new FormGroup({
        'name': new FormControl(null),
        'amount': new FormControl(null)
      }));
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImg),
      'description': new FormControl(recipeDesc),
      'ingredients': ingredients
    });
  }

  recipeWasEdit() {

  }

  onDeleteIngredient(index: number) {
    console.log(this.recipe.ingredients[index]);
  }

  onSubmit() {
    console.log(this.recipeForm);
    this.editMode = false;
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
