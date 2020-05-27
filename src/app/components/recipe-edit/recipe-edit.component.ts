import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
  recipeIndex: number;

  ngOnInit() {
    if (this.route.snapshot.params['index']) {
      this.editMode = true;
      this.recipeIndex = this.route.snapshot.params['index'];

      this.recipe = this.recipesService.getRecipe(this.recipeIndex);
      this.route.params.subscribe(params => {
        this.recipe = this.recipesService.getRecipe(params['index']);
      });
    } else {
      this.recipeIndex = this.recipesService.getRecipes().length;
    }
    this.initForm();
  }

  private initForm() {
    let recipeName = null;
    let recipeImg = null;
    let recipeDesc = null;
    let ingredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImg = this.recipe.imagePath;
      recipeDesc = this.recipe.description;
    }

    if (this.editMode) {
      if (this.recipe.ingredients) {
        for (let ingredient of this.recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
          }));
        }
      }
    } else {
      ingredients.push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
      }));
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': ingredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
    }));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['decription'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode) {
      this.recipesService.updateRecipe(this.recipeIndex, this.recipeForm.value);
      this.editMode = false;
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['/recipes', this.recipeIndex]);
  }

  onCancel() {
    this.editMode = this.editMode ? false : this.editMode;
    this.router.navigate(['/recipes', this.recipeIndex]);
  }

}
