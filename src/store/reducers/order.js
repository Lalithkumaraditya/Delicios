import * as actionTypes from '../actions/actionTypes';
const initialState={
    orders:[],
    loading:false,
    purchased:false,
    fLoading:true
}
const reducer =(state=initialState,action)=>{
      switch(action.type){

        case actionTypes.PURCHASE_SUCCESS_REDIRECT:
            return{
                   ...state,
                   purchased:false
            };
          case actionTypes.PURCHASE_BURGER_START:
              return{
                  ...state,
                  loading:true
              }

          case actionTypes.PURCHASE_BURGER_SUCCESS:
              const newOrder={
                  ...action.orderData,
                  id:action.id
              }
              return{
                      ...state,
                      loading:false,
                      purchased:true,
                       orders:state.orders.concat(newOrder)
              };
              case actionTypes.PURCHASE_BURGER_FAIL:
                return{
                    ...state,
                    loading:false
                };
               case actionTypes.FETCH_ORDERS_START:
                   return{
                       ...state,
                       fLoading:true
                   }
                   case actionTypes.FETCH_ORDERS_SUCCESS:
                       return{
                           ...state,
                           orders:action.orders,
                           fLoading:false
                       }
                       case actionTypes.FETCH_ORDERS_FAIL:
                           return{
                               ...state,
                               error:action.error,
                               fLoading:false
                           }
                default:
                    return state;
      }
}
export default reducer;