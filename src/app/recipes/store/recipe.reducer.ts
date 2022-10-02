import * as RecipeActions from './recipe.actions'
import {Recipe} from "../recipe.model";


export interface State {
  recipes : Recipe[]
}

const initialState : State = {
  recipes: []
}



export function recipeReducer(state : State = initialState , action : RecipeActions.RecipeActions){

  switch (action.type) {
    case RecipeActions.SET_RECIPES :
      return {
        ...state,
        recipes : [
          ...<Recipe[]>action.payload
        ]
      }
    case RecipeActions.ADD_RECIPE :
      return {
        ...state,
        recipes: [
          ...state.recipes,
          <Recipe>action.payload
        ]
      }
    case RecipeActions.UPDATE_RECIPE :
      const payload=<{id : number, recipe : Recipe}>action.payload
      const updatedRecipe={
        ...state.recipes[payload.id],
        ...payload.recipe
      }
      const updatedRecipes = [...state.recipes]
      updatedRecipes[payload.id]=updatedRecipe
      return {
        ...state,
        recipes: updatedRecipes
      }
    case RecipeActions.DELETE_RECIPE :
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index)=>{
            return index!==<number>action.payload
          }
        )
      }
    default :
      return state
  }

}
