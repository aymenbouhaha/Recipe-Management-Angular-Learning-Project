import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs/Subject";


@Injectable()
export class RecipeService{

  // recipeSelected = new Subject<Recipe>()
  //
  recipesChanged = new Subject<Recipe[]>();


  private recipes :Recipe[] = []
  //   = [
  //   new Recipe('Recipe 1', 'This is simply a test 1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
  //     new Ingredient("Meat", 1),
  //     new Ingredient("Fries", 2)
  //   ]),
  //   new Recipe('Recipe 2', 'This is simply a test 2', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
  //     new Ingredient("Meat", 1),
  //     new Ingredient("Fries", 2)
  //   ]),
  //   new Recipe('Recipe 3', 'This is simply a test 3', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
  //     new Ingredient("Meat", 1),
  //     new Ingredient("Fries", 2)
  //   ]),
  //   new Recipe('Recipe 4', 'This is simply a test 4', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
  //     new Ingredient("Meat", 1),
  //     new Ingredient("Fries", 2)
  //   ])
  // ]

  constructor(private shoppingListService :ShoppingListService) {
  }


  setRecipes(recipes : Recipe[]){
    this.recipes=recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }

  findRecipeById(id : number) : Recipe{
    return this.recipes[id-1]
  }

  updateRecipe(id : number , newRecipe : Recipe){
    this.recipes[id-1]=newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  addRecipe(newRecipe : Recipe){
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipeById(id : number){
    this.recipes.splice(id-1,1)
    this.recipesChanged.next(this.recipes.slice())
  }

  // findRecipeByIndex(id : number) : Recipe{
  //   return this.recipes[id]
  // }
}
