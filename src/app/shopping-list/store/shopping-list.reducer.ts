import {Ingredient} from "../../shared/ingredient.model";
// import {Action} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

const intialState : State = {
  ingredients :[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient : null,
  editedIngredientIndex : -1
}

export interface State {
  ingredients : Ingredient[],
  editedIngredient : Ingredient,
  editedIngredientIndex : number
}



export function shoppingListReducer(state = intialState , action : ShoppingListActions.ShoppingListActions){
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT :
      return {
        ...state,
        ingredients: [
          ...state.ingredients ,
          action.payload
        ]
      }
    case ShoppingListActions.ADD_INGREDIENTS :
      return {
        ...state,
        ingredients: [
          ...state.ingredients ,
          ...<Ingredient[]>action.payload
        ]
      }
    case ShoppingListActions.UPDATE_INGREDIENT :
      // const payload= <{index : number, newIngredient : Ingredient}>action.payload
      // const ingredient = state.ingredients[payload.index]
      // const updatedIngredient = {
      //   ...ingredient,
      //   ...payload.newIngredient
      // }
      // const updatedIngredients = [...state.ingredients]
      // updatedIngredients[payload.index]=updatedIngredient
      const ingredient = state.ingredients[state.editedIngredientIndex]
      const updatedIngredient= {
        ...ingredient,
        ...<Ingredient>action.payload
      }
      const updatedIngredients = [
        ...state.ingredients,
      ]
      updatedIngredients[state.editedIngredientIndex]=updatedIngredient
    return {
      ...state ,
      ingredients: updatedIngredients ,
      editedIngredientIndex : -1 ,
      editedIngredient : null
    }
    case ShoppingListActions.DELETE_INGREDIENT :
      // const ingredients = [
      //   ...state.ingredients
      // ]
      // ingredients.splice(<number>action.payload,1)
      // return {
      //   ...state ,
      //   ingredients: ingredients
      // }
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index)=>{
            return  index != state.editedIngredientIndex
          }
        ),
        editedIngredient : null,
        editedIngredientIndex : -1
      }
    case ShoppingListActions.START_EDIT :
      return {
        ...state,
        editedIngredientIndex : <number>action.payload,
        editedIngredient : {...state.ingredients[<number>action.payload]}
      }
    case ShoppingListActions.STOP_EDIT :
      return {
        ...state,
        editedIngredient : null,
        editedIngredientIndex : -1
      }
    default :
      return state
  }
}

