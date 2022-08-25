import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false
  id : number
  recipeForm : FormGroup

  constructor(private route : ActivatedRoute, private recipeService : RecipeService, private router : Router) { }

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
      const recipe = this.recipeService.findRecipeById(this.id)
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
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else {
      console.log(this.recipeForm.value.ingredients)
      this.recipeService.addRecipe(this.recipeForm.value)
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
