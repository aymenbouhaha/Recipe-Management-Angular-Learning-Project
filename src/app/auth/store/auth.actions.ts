import {Action} from "@ngrx/store";


export const LOGIN = 'AUTHENTICATE_SUCCESS'
export const LOGOUT = 'LOGOUT'
export const LOGIN_START = 'LOGIN_START'
export const SIGNUP_START = 'SIGNUP_START'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const AUTO_LOGIN = 'AUTO_LOGIN'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'



export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(public payload : {
    email : string ,
    id : string,
    token : string,
    expirationDate : Date,
    redirect : boolean
  }) {
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload? ) {
  }
}

export class LoginStart implements Action {
  readonly type : string = LOGIN_START
  constructor(public payload : {email : string, password : string}) {
  }
}

export class AuthenticateFail implements Action{
  readonly type: string= AUTHENTICATE_FAIL;

  constructor(public payload?) {
  }
}

export class ClearError implements Action {
  readonly type: string= CLEAR_ERROR;
  constructor(public payload?) {
  }

}

export class SignupStart implements Action{
  readonly type: string = SIGNUP_START;


  constructor(public payload : {email : string, password : string}) {
  }
}

export class AutoLogin implements Action {
  readonly type: string= AUTO_LOGIN;

  constructor(public payload?) {
  }
}


export type AuthActions = Logout | Login | AutoLogin | SignupStart | ClearError | LoginStart | AuthenticateFail
