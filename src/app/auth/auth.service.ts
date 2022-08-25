import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";


export interface AuthResponseData {
  idToken : string ,
  email : string ,
  refreshToken : string ,
  expiresIn : string,
  localId : string,
  registred? : boolean
}



@Injectable({providedIn : 'root'})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null)
  expirationDateReference : any

  constructor(private httpClient :HttpClient, private router : Router) {
  }
  signUp(formValues : {"email" : string , "password": string}){
    return this.httpClient.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD51I_6jhvCzQ2ZpcApZqQ393bb3OND62k",
      {
        ...formValues,
        returnSecureToken : true
      }
    ).pipe(
      catchError(
        (error)=>{
          return this.errorTreatment(error)
        }
      ),tap(
        (responseData)=>{
          this.handleAuthentication(responseData.email,responseData.idToken,+responseData.expiresIn,responseData.localId)
        }
      )
    )
  }

  private handleAuthentication(email : string , token : string , expiresIn : number, id : string){
    const expirationDate = new Date(new Date().getTime()+ expiresIn*1000)
    const user = new UserModel(email,id,token,expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem("userData",JSON.stringify(user))
  }

  login(formValues : {"email" : string , "password": string} ){
    return this.httpClient.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD51I_6jhvCzQ2ZpcApZqQ393bb3OND62k",
      {
        ...formValues,
        returnSecureToken : true
      }
    ).pipe(
      catchError(
        error=>{
          return this.errorTreatment(error)
        }
      ),
      tap(
        (responseData)=>{
          this.handleAuthentication(responseData.email,responseData.idToken,+responseData.expiresIn,responseData.localId)
        }
      )
    )
  }

  autoLogin(){
    const userData : {
      email: string,
      id: string ,
      _token : string,
      _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem("userData"))
    if (!userData){
      return;
    }
    const loadedUser=new UserModel(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))
    if (loadedUser.token){
      const expirationDuration = loadedUser.tokenExpirationDate.getTime() - new Date().getTime()
      this.user.next(loadedUser)
      this.autoLogout(expirationDuration)
    }else {
      return;
    }
  }

  // private gettingUserData() : UserModel{
  //   const userData : {
  //     email: string,
  //     id: string ,
  //     _token : string,
  //     _tokenExpirationDate : string
  //   } = JSON.parse(localStorage.getItem("userData"))
  //   if (!userData){
  //     return;
  //   }
  //   new UserModel(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))
  // }

  logout(){
    this.user.next(null)
    this.router.navigate(["/auth"])
    localStorage.removeItem("userData")
    if (this.expirationDateReference){
      clearTimeout(this.expirationDateReference)
    }
    this.expirationDateReference=null
  }

  // autoLogout(){
  //   const userData = this.gettingUserData()
  //   if (userData.token){
  //     const leftTime = (userData.tokenExpirationDate.getTime() - new Date().getTime())*1000
  //     setTimeout(
  //       ()=>{
  //         this.logout()
  //       },leftTime
  //     )
  //   }else {
  //     this.logout()
  //   }
  // }

  autoLogout(expirationDuration : number){
    this.expirationDateReference=setTimeout(
      ()=>{
        this.logout()
      },
      expirationDuration
    )
  }

  private errorTreatment(error){
    let errorMessage = "An Unknown Error Occured"
    if (!error.error || !error.error.error){
      return throwError(errorMessage)
    }else {
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage="The Email Already Exists"
          break
        case 'EMAIL_NOT_FOUND' :
          errorMessage="The Email Does Not Exist"
          break
        case 'INVALID_PASSWORD' :
          errorMessage="Password Does Not match"
          break
      }
      return throwError(errorMessage)
    }
  }
}
