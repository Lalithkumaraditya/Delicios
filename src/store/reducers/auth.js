import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import { authFail, authSuccess } from '../actions/auth';
import {updateObject} from '../utility';
const initialstate={

    token:null,
    userId:null,
    error:null,
    login:false
}
const authStart =(state,action)=>{
    return  updateObject(state,{error: null});
}

const autthSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        login:true
        
    })
   
}
const autthFail=(state,action)=>{
    return updateObject(state,{
      error:action.error
    })
}

const auth=(state=initialstate,action)=> {
   switch(action.type){
       case actionTypes.AUTH_START: return authStart(state,action);
       case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
       case actionTypes.AUTH_FAIL:return authFail(state,action);
           
           default:
               return state
   }
}

export default auth;