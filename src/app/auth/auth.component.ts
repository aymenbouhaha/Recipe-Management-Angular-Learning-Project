import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../shared/placeholder.directive";
import {AlertComponent} from "../shared/alert/alert.component";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy {

  loginMode = true
  @ViewChild("loginForm") loginForm : NgForm
  isLoading = false ;
  error : string= null
  @ViewChild(PlaceholderDirective) errorHost : PlaceholderDirective
  subscription : Subscription
  storeSub : Subscription

  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver: ComponentFactoryResolver, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub= this.store.select('auth').subscribe(
      (authState)=>{
        this.isLoading=authState.loading
        this.error=authState.error
        if (this.error){
          this.showErrorMessage(this.error)
        }
      }
    )
  }

  switchMode(){
    this.loginMode= ! this.loginMode
  }



  onSubmit(){
    if (!this.loginForm.valid){
      return ;
    }
    const email= this.loginForm.value.email
    const password =this.loginForm.value.password
    if (this.loginMode){
      this.store.dispatch(
        new AuthActions.LoginStart({email, password})
      )
    }else {
      this.store.dispatch(
        new AuthActions.SignupStart({email ,password})
      )
    }
    this.loginForm.reset()
  }

  closeErrorTab(){
    this.error=null
  }

  private showErrorMessage(errorMessage: string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.errorHost.viewContainerRef
    hostViewContainerRef.clear()
    const cmpRef = hostViewContainerRef.createComponent(alertComponentFactory)
    cmpRef.instance.error=errorMessage
    this.subscription=cmpRef.instance.close.subscribe(
      ()=>{
        this.subscription.unsubscribe()
        hostViewContainerRef.clear()
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
    if (this.storeSub)
      this.storeSub.unsubscribe()
  }


  //Different Approach #999

  // onSubmit(){
  //   this.error=null
  //   if (!this.loginForm.valid){
  //     return ;
  //   }
  //   let authObs : Observable<AuthResponseData>
  //   this.isLoading=true
  //   if (this.loginMode){
  //       authObs=this.authService.login(this.loginForm.value)
  //   }else {
  //       authObs=this.authService.signUp(this.loginForm.value)
  //   }
  //   authObs.subscribe(
  //     (response)=>{
  //       this.isLoading=false
  //       this.router.navigate(["/recipes"])
  //     }
  //     ,
  //     error => {
  //       this.error=error
  //       this.isLoading=false
  //       this.showErrorMessage(error)
  //     })
  //   this.loginForm.reset()
  // }
}
