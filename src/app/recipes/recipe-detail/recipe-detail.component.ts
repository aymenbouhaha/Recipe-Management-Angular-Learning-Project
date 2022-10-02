import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../store/recipe.actions'
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input()
  // recipe : Recipe

  recipe : Recipe
  id : number

  constructor(private recipeService :RecipeService ,private route : ActivatedRoute , private router : Router, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.route.params.pipe(
      map(
        (params)=>{
          return +params['id']
        }
      ),
      switchMap(
        (id)=>{
          this.id=id
          return this.store.select('recipes')
        }
      ),
      map((recipesState )=>{
        return recipesState.recipes.find(
          (recipe,index)=>{
            return index===this.id
          }
        )
        }
      )
    ).subscribe(
      (recipe)=>{
        this.recipe=recipe
      }
    )

    // this.route.params
    //   .subscribe(
    //     (params : Params)=>{
    //       this.id=+params['id']
    //       this.recipe=this.recipeService.findRecipeById(this.id)
    //     }
    //   )
  }

  addIngredientsToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  // navigateToRecipeEdit(){
  //   this.router.navigate(['/recipes', 'edit' , this.id], )
  // }

  deleteRecipe(){
    // this.recipeService.deleteRecipeById(this.id)
    this.store.dispatch(
      new RecipeActions.DeleteRecipe(this.id)
    )
    this.router.navigate(['/recipes'])
  }




}
