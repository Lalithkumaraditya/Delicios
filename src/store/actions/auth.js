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

export const checkAuthTimeout=(expirationTime)=>{
  return dispatch=>{
    setTimeout(()=>{
       dispatch(logout())
    },expirationTime * 1000);
  }
  

}
export const authSuccess = (token,userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken:token,
    userId:userId
  };
};
export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return{
    type:actionTypes.AUTH_LOGOUT
  }
}


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
        console.log("response"+response.data);
        let expirationDate =new Date(new Date().getTime() + response.data.expiresIn *1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationTime',expirationDate);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn)) 

      })
      .catch((err) => {
      
        dispatch(authFail(err.message));
      });
  };
};

export const  setAuthRedirect =(path)=>{
  return{
    type:actionTypes.SET_AUTH_REDIRECT,
    path:path
  }

}

export const authCheckState=()=>{
return dispatch=>{
     const token=localStorage.getItem('token');
     if(!token){
       dispatch(logout())
     }
     else{
       const expirationTime=new Date(localStorage.getItem('expirationTime'));
       if(expirationTime < new Date()){
         dispatch(logout())
       }else{
         const userId=localStorage.getItem('userId')
        dispatch(authSuccess(token,userId))
        dispatch(checkAuthTimeout(expirationTime.getTime() - new Date().getTime())/1000)
       }
    
     }
}
};