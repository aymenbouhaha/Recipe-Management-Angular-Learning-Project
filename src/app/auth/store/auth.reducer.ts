import {UserModel} from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user : UserModel,
  error : string,
  loading : boolean
}



const initialState : State = {
  user: null,
  error : null,
  loading : false
}


export function authReducer(state : State = initialState, action : AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN :
      const user : UserModel = new UserModel(action.payload.email,action.payload.id,action.payload.token,action.payload.expirationDate)
      return {
        ...state,
        error : null,
        user: user,
        loading : false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        error: <string>action.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default :
      return state
  }
}
