import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

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

  constructor(private dataStorageService: DataStorageService, private authService:AuthService) { }

  ngOnInit(): void {
    this.subscription=this.authService.user.subscribe(
      (user) => {
        this.isLogged = user ? true : false
      }
    )
  }

  saveRecipes(){
    this.dataStorageService.storeRecipes().subscribe(
      (response)=>{
      }
    )
  }

  logout(){
    this.authService.logout()
  }

  fetchData() {
    this.dataStorageService.fetchingData().subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
