import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Subject";

export class ShoppingListService{
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

  deleteIngredient(index : number){
    this.ingredients.splice(index,1)
  }
}
