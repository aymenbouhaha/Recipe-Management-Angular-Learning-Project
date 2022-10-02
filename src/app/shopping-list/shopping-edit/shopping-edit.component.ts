import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingActions from "../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

  // second approach
  // @ViewChild("nameInput") nameInputRef : ElementRef
  // @ViewChild("amountInput") amountInputRef : ElementRef


  // (first approach)
  // @Output()
  // ingredientAdded = new EventEmitter<Ingredient>()

  @ViewChild("shopForm") shoppingListForm : NgForm
  editingSubscription : Subscription
  editedItem : Ingredient
  editItemIndex : number
  editMode = false

  onAddItem(){

    //form approach

    let formValues : {'name': string , 'amount' : number}  = this.shoppingListForm.value
    // this.shoppingListService.addIngedient(new Ingredient(formValues.name,formValues.amount))

    // first approach
    // this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value))

    // second approach
    // this.shoppingListService.addIngedient(new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value))

    this.store.dispatch(new ShoppingActions.AddIngredient(new Ingredient(formValues.name,formValues.amount)))



  }

  constructor(private shoppingListService :ShoppingListService , private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.editingSubscription=this.store.select('shoppingList').subscribe((stateData)=>{
      if (stateData.editedIngredientIndex>=0){
        this.editMode=true
        this.editItemIndex=stateData.editedIngredientIndex
        this.editedItem=stateData.editedIngredient
        this.shoppingListForm.setValue(
          {
            'name' : this.editedItem.name,
            'amount': this.editedItem.amount
          }
        )
      }else {
        this.editMode=false
      }
    })
    // this.editingSubscription=this.shoppingListService.editingStarted.subscribe(
    //   (index: number)=>{
    //     this.editMode=true
    //     this.editItemIndex=index
    //     this.editedItem=this.shoppingListService.getIngredientByIndex(index)
    //     this.shoppingListForm.setValue(
    //       {
    //         'name' : this.editedItem.name,
    //         'amount': this.editedItem.amount
    //       }
    //     )
    //   }
    // )
  }

  editItem(){
    let formValues : {'name': string , 'amount' : number}  = this.shoppingListForm.value
    // this.editedItem.name=formValues.name
    // this.editedItem.amount=formValues.amount
    // this.shoppingListService.updateIngredient(this.editItemIndex,new Ingredient(formValues.name,formValues.amount))
    this.store.dispatch(new ShoppingActions.UpdateIngredient(new Ingredient(formValues.name,formValues.amount)))
    this.clearForm()
    this.editItemIndex=null
    this.editedItem=null
  }

  clearForm(){
    this.shoppingListForm.reset()
    this.editMode=false
    this.store.dispatch(new ShoppingActions.StopEdit())
  }

  deleteItem(){
    this.store.dispatch(new ShoppingActions.DeleteIngredient())
    this.clearForm()
    this.editItemIndex=null
    this.editedItem=null
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe()
    this.store.dispatch(new ShoppingActions.StopEdit())
  }

}
