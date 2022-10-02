import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
// import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs/Subscription";
// import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import {map} from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  isLogged : boolean = false
  subscription : Subscription

  // @Output()
  // navigation = new EventEmitter<boolean>()
  //
  // toShoppingList(){
  //   this.navigation.emit(false)
  // }
  //
  // toRecipes(){
  //   this.navigation.emit(true)
  // }

  constructor(private dataStorageService: DataStorageService, private authService:AuthService, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select('auth').
      pipe(
        map(authState => {
          return authState.user
        })
    ).subscribe(
      (user) => {
        this.isLogged = user ? true : false
      }
    )
  }

  saveRecipes(){
    // this.dataStorageService.storeRecipes().subscribe(
    //   (response)=>{
    //   }
    // )
    this.store.dispatch(
      new RecipesActions.SaveData()
    )
  }

  logout(){
    // this.authService.logout()
    this.store.dispatch(
      new AuthActions.Logout()
    )
  }

  fetchData() {
    // this.dataStorageService.fetchingData().subscribe()
    this.store.dispatch(new RecipesActions.FetchData())
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
