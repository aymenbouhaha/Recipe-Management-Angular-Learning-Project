import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {Subject} from "rxjs/Subject";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from '../recipes/store/recipe.actions'
@Injectable({providedIn : 'root'})
export class DataStorageService {


  constructor(private http : HttpClient, private recipeService:RecipeService, private authService:AuthService, private store : Store<fromApp.AppState>) {
  }

  storeRecipes(){
    let recipes : Recipe[] = this.recipeService.getRecipes()
    return this.http.put(
      "https://recipe-book-2dfe5-default-rtdb.firebaseio.com/recipes.json",
      recipes
    )
  }

  fetchingData(){

    return this.http.
      get<Recipe[]>("https://recipe-book-2dfe5-default-rtdb.firebaseio.com/recipes.json",)
      .pipe(
        map(
          (recipes)=>{
            return recipes.map(
              (recipe)=>{
                return {
                  ...recipe,
                  ingredients : recipe.ingredients ? recipe.ingredients : []
                }
              }
            )
          }
        ),
        tap(
          (response)=>{
            // this.recipeService.setRecipes(response)
            this.store.dispatch(
              new RecipesActions.SetRecipes(response)
            )
          }
        )
      )

  }
}
