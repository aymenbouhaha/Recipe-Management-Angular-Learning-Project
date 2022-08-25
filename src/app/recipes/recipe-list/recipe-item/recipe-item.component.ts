import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input("recipe")
  recipe : Recipe

  @Input()
  id : number

  // showDetails(){
  //   this.recipeService.recipeSelected.next(this.recipe)
  // }

  constructor(private recipeService :RecipeService , private router :Router) { }

  ngOnInit(): void {
  }



}
