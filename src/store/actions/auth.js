import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
// export const authSuccess = (token,userId) => {
//   return {
//     type: actionTypes.AUTH_SUCCESS,
//     idToken:token,
//     userId:userId
//   };
// };
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};
export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};



export const auth = (email, password,isSignup) => {
    console.log(email+" "+password+" "+isSignup)
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
   
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpiA2A1OXeD8hwed7sVJUS_WOpFgB0uYM';
    
    if(!isSignup){
       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpiA2A1OXeD8hwed7sVJUS_WOpFgB0uYM';
    }
    axios.post(url,authData)
      .then(response => {
    
        //dispatch(authSuccess(response.data.idToken, response.data.localId));
        console.log("response"+response)
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
       
        dispatch(authFail(err));
      });
  };
};
