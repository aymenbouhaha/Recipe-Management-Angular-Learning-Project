import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
// import * as ShoppingListActions from "./store/shopping-list.actions";


@Injectable()
export class ShoppingListService{

  constructor(private store : Store<{shoppingList : {ingredients : Ingredient[] }}>) {
  }
  editingStarted = new Subject<number>()
  private ingredients :Ingredient[]=[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]

  addIngedient(ingredient :Ingredient){
    this.ingredients.push(ingredient)
  }

  getIngredients(){
    return this.ingredients
  }

  addIngredients(ingredients : Ingredient[]){
    this.ingredients.push(...ingredients)
  }

  getIngredientByIndex(index : number){
    return this.ingredients[index]
  }

  // deleteIngredient(index : number){
  //   this.ingredients.splice(index,1)
  // }
  //
  // updateIngredient(index : number, newIngredient : Ingredient){
  //   this.store.dispatch(new ShoppingListActions.UpdateIngredient({index, newIngredient}))
  // }
}
