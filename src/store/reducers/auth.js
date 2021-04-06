
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import * as actionType from '../actions/actionTypes'
const initialstate = {
  ingredients: null,
  totalPrice: 30,
  token: null,
  userId: null,
  error: null,
  login: false,
  loading: false,
  authRedirectPath:'/',
  email:''
};
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case actionTypes.AUTH_SUCCESS:{
        return{
          ...state,
        error:null,
        loading:false,
        token:action.idToken,
        userId:action.userId,
        email:action.email
      
        }

    }
    case actionType.AUTH_FAIL:{
        return{
          ...state,
            error:action.error,
            loading:false,


        }
      }
      case actionTypes.AUTH_LOGOUT:
        return{
          ...state,
          token:null,
          userId:null,
          email:''
        }
      case actionTypes.SET_AUTH_REDIRECT:
        return{
         ...state,
         authRedirectPath:action.path

        }


    default:
      return state;
  }
};
export default reducer;