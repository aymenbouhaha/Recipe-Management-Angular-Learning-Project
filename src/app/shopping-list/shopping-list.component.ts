import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Observable<{ingredients: Ingredient[]}>
  // ingredients :Ingredient[]
  // =[
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ]

  // addItem(ingredient : Ingredient){
  //   this.ingredients.push(ingredient)
  // }

  constructor(private  shoppingListService :ShoppingListService , private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients=this.store.select('shoppingList')
    // this.ingredients=this.shoppingListService.getIngredients()
  }

  onEditItem(index : number) {
    // this.shoppingListService.editingStarted.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
