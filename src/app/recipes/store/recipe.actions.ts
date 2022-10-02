import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const ADD_RECIPE = 'ADD_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const SET_RECIPES= 'SET_RECIPES'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const SAVE_DATA = 'SAVE_DATA'
export const FETCH_DATA = 'FETCH_DATA'

export class SetRecipes implements Action{
  readonly type: string= SET_RECIPES;
  constructor(public payload: Recipe[]) {
  }
}

export class AddRecipe implements Action{
  readonly type: string= ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type: string= UPDATE_RECIPE;
  constructor(public payload : {id : number, recipe : Recipe}) {
  }
}

export class DeleteRecipe implements Action{
  readonly type: string=DELETE_RECIPE;

  constructor(public payload : number) {
  }

}

export class FetchData implements Action{
  readonly type = FETCH_DATA

  constructor(public payload?) {
  }
}

export class SaveData implements Action{
  readonly type = SAVE_DATA

  constructor(public payload?) {
  }
}

export type RecipeActions =
  SetRecipes
  | UpdateRecipe
  | AddRecipe
  | DeleteRecipe
  | FetchData
  | SaveData
