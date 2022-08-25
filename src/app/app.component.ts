import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-shopping';

  constructor( private authService:AuthService) {
    this.authService.autoLogin()
  }
  ngOnInit(): void {

  }
  // recipeObserved : boolean=true
  //
  // navigate(recipeObserved : boolean){
  //   this.recipeObserved=recipeObserved
  // }



}
