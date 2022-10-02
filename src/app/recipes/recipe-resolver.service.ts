import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable, of} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";
import * as fromApp from '../store/app.reducer'
import * as RecipeActions from './store/recipe.actions'
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";

@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService , private recipeService:RecipeService, private store : Store<fromApp.AppState>, private action : Actions) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    // const recipes = this.recipeService.getRecipes()
    // if (recipes.length ===0){
    //   return this.dataStorageService.fetchingData()
    // }else {
    //   return recipes
    // }
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState=>{
        return recipesState.recipes
      }),
      switchMap(
        recipes=>{
          if (recipes.length ===0){
            this.store.dispatch(
              new RecipeActions.FetchData()
            )
            return this.action.pipe(
              ofType(RecipeActions.SET_RECIPES), take(1)
            )
          }else {
            return of(recipes)
          }
        }
      )
    )

  }

}
