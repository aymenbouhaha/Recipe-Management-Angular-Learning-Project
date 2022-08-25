import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers : [RecipeService]
})
export class RecipesComponent implements OnInit /* OnDestroy */{

  // recipeToShow : Recipe
  // recipeItemSubs : Subscription

  constructor(private recipeService : RecipeService) { }

  // ngOnDestroy(): void {
  //       this.recipeItemSubs.unsubscribe()
  //   }

  ngOnInit(): void {
    // this.recipeItemSubs=this.recipeService.recipeSelected.subscribe(
    //   (recipe : Recipe)=>{
    //     this.recipeToShow=recipe
    //   }
    // )
  }

}
