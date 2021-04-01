
import axios from '../../axios'
import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccess=(id,orderData)=>{
return{
    type:actionTypes.PURCHASE_BURGER_SUCCESS,
    id:id,
    orderData:orderData
};
};

export const purchaseBurgerFail=(error)=>{
    return{
       type:actionTypes.PURCHASE_BURGER_FAIL,
       error:error
    }
}
export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart()) 
        axios
        .post("/orders.json", orderData)
   
        .then(response => {
        
        dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(err => {
          dispatch(purchaseBurgerFail(err))
        });
       
    };
}

export const PurchaseSuccessRedirect =()=>{
    return{
          type:actionTypes.PURCHASE_SUCCESS_REDIRECT
    };
};

export const fetchOrderSuccess=(orders)=>{
    return{
            type:actionTypes.FETCH_ORDERS_SUCCESS,
            orders:orders
    }
}
export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrderStart = ()=>{
    return dispatch=>{
        axios.get('/orders.json')
        .then(res=>{
            const fetchOrders =[];
            for(let key in res.data){
              fetchOrders.push(
                 { 
                  ...res.data[key],
                  id : key
              });
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(err =>{
            dispatch(fetchOrdersFail(err));
        });

    }
}