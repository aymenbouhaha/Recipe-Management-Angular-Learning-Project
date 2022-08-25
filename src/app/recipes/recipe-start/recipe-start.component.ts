import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  verifyRecipeList(){
    return  this.recipeService.getRecipes().length > 0
  }
}
