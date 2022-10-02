import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import {map} from "rxjs/operators";
import * as RecipeActions from '../store/recipe.actions'
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  editMode = false
  id : number
  recipeForm : FormGroup
  subscription : Subscription

  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router : Router,private store : Store<fromApp.AppState>) { }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params :Params)=>{
          this.id=+params['id']
          this.editMode= params['id']!=null
          this.initForm()
        }
      )

  }

  private initForm(){
    let recipeName = ''
    let recipeDescription = ''
    let recipeImagePath = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode){
      // const recipe = this.recipeService.findRecipeById(this.id)
      this.subscription=this.store.select('recipes').pipe(
        map((recipesState)=>{
          return recipesState.recipes.find((recipe,index)=>{
            return index===this.id
          })
        })
      ).subscribe((recipe)=>{
        recipeName=recipe.name
        recipeDescription=recipe.description
        recipeImagePath=recipe.imagePath
        if (recipe.ingredients){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name' : new FormControl(ingredient.name,Validators.required),
                'amount' : new FormControl(ingredient.amount,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      })
    }
    this.recipeForm=new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredients
    })
  }

  onSubmit() {
    if (this.editMode){
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value)
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          id : this.id,
          recipe : this.recipeForm.value
        })
      )
    }else {
      // this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(
        new RecipeActions.AddRecipe(this.recipeForm.value)
      )
    }
    this.onCancel()
  }

  exctractFormArrayControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  // onAddIngredients() {
  //   this.exctractFormArrayControls().push(new FormGroup({
  //     'name' : new FormControl(null,Validators.required),
  //     'amount' : new FormControl(null,[
  //       Validators.required,
  //       Validators.pattern(/^[1-9]+[0-9]*$/)
  //     ])
  //   }))
  // }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onCancel(){
    this.router.navigate(['recipes'])
  }
}
