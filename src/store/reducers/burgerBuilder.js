
import * as actionType from "../actions/actionTypes";

const INGREDIENTS_PRICES = {
  salad: 40,
  cheese: 30,
  meat: 90,
  bacon: 100,
};


const initialState = {
    ingredients:null,
  totalPrice:30,
  purchasing: false,
  loading: false,
  error:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENTS:
      return {
          ...state,
          ingredients:{
              ...state.ingredients,
              [action.ingredientName]:state.ingredients[action.ingredientName]+1
          },
          totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionType.REMOVE_INGREDIENTS:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]-1 
            },
            totalPrice:  state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
        };
        case actionType.SET_INGREDIENTS:
          return{
            ...state,
            ingredients:action.ingredients,
            error:false,
            totalPrice:30

            
          }
          
        
    default:
      return state;
  }
};

export default reducer;
