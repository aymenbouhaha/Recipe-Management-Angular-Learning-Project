import {Actions, Effect, ofType} from "@ngrx/effects";
import * as  RecipesActions from './recipe.actions'
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe.model";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
@Injectable()
export class RecipeEffects {

  @Effect()
  fetchData=this.action.pipe(
    ofType(RecipesActions.FETCH_DATA),
    switchMap(()=>{
      return this.http.
      get<Recipe[]>("https://recipe-book-2dfe5-default-rtdb.firebaseio.com/recipes.json",)
    }),
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
    map((recipes)=>{
      return new RecipesActions.SetRecipes(recipes)
    })

  )

  @Effect({dispatch: false})
  saveData=this.action.pipe(
    ofType(RecipesActions.SAVE_DATA),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData , recipesState])=>{
      return this.http.put(
        "https://recipe-book-2dfe5-default-rtdb.firebaseio.com/recipes.json",
        recipesState.recipes
      )
    })
  )

  constructor(private action : Actions,
  private http : HttpClient,
              private store : Store<fromApp.AppState>) {
  }
}
