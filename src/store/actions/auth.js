// import * as actionTypes from "../actions/actionTypes";
// import axios from  '../../axios'
// export const authStart = () => {
//   return {
//     type: actionTypes.AUTH_START
//   };
// };
// export const authSuccess = (token,userId) => {
//   return {
//     type: actionTypes.AUTH_SUCCESS,
//     idToken:token,
//     userId:userId
//   };
// };
//  export const authFail = (error) =>{
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error:error
//       };
//  };

//  export const auth  = (email,password)=>{
//      console.log(email)
//      return dispatch=>{
//          dispatch(authStart()); 
//          const authData={
//             email:email,
//              password:password,
//              returnSecureToken:true
//          }
//          axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpiA2A1OXeD8hwed7sVJUS_WOpFgB0uYM',authData)
//          .then(response=>{
//              console.log(response.data);
//              console.log(authData);
//              dispatch(authSuccess(response.data.idToken,response.data.localId));
//          })
//          .catch(err=>{
//             console.log(authData);
//              console.log('error data',err);
//              dispatch(authFail())
//          });
         
//      };
//  };