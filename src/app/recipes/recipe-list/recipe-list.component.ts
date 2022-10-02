import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from '../store/recipe.actions'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipes :Recipe[]

  subscription : Subscription

  isLoading : boolean = false

  constructor(private recipeService : RecipeService , private router : Router, private dataStorageService: DataStorageService , private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.isLoading=true
    // this.store.dispatch(
    //   new RecipeActions.FetchData()
    // )
    this.subscription=this.store.select('recipes').subscribe(
      (recipeState)=>{
        this.recipes=recipeState.recipes
        this.isLoading=false
      }
    )
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes : Recipe[])=>{
    //       this.recipes=recipes
    //       this.isLoading=false
    //     }
    //   )
    // this.recipes=this.recipeService.getRecipes()
  }

  navigateToNewRecipe(){
    this.router.navigate(['/recipes','new'] )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
