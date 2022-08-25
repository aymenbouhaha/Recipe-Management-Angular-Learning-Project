import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipes :Recipe[]

  subscription : Subscription

  isLoading : boolean = false

  constructor(private recipeService : RecipeService , private router : Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.isLoading=true
    this.dataStorageService.fetchingData().subscribe()
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes : Recipe[])=>{
          this.recipes=recipes
          this.isLoading=false
        }
      )
    this.recipes=this.recipeService.getRecipes()
  }

  navigateToNewRecipe(){
    this.router.navigate(['/recipes','new'] )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
