import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode = true
  @ViewChild("loginForm") loginForm : NgForm
  isLoading = false ;
  error : string= null

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.loginMode= ! this.loginMode
  }

  onSubmit(){
    this.error=null
    if (!this.loginForm.valid){
      return ;
    }
    let authObs : Observable<AuthResponseData>
    this.isLoading=true
    if (this.loginMode){
        authObs=this.authService.login(this.loginForm.value)
    }else {
        authObs=this.authService.signUp(this.loginForm.value)
    }
    authObs.subscribe(
      (response)=>{
        this.isLoading=false
        this.router.navigate(["/recipes"])
      }
      ,
      error => {
        this.error=error
        this.isLoading=false
      })
    this.loginForm.reset()
  }


}
