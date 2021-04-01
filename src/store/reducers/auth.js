
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
        error:null,
        loading:false,
        token:action.idToken,
        userId:action.userId
        }

    }
    case actionType.AUTH_FAIL:{
        return{
            error:action.error,
            loading:false,


        }
      


    }

    default:
      return state;
  }
};
export default reducer;
