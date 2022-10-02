import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RoutingModule} from "./routing.module";
import { HttpClientModule} from "@angular/common/http";
// import {RecipesModule} from "./recipes/recipes.module";
// import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {StoreModule} from "@ngrx/store";
// import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";
// import {authReducer} from "./auth/store/auth.reducer";
// import {AuthModule} from "./auth/auth.module";
import * as fromApp from './store/app.reducer'
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/store/auth.effects";
import {RecipeEffects} from "./recipes/store/recipe.effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RoutingModule,
    HttpClientModule,
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    BrowserAnimationsModule
    // AuthModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
