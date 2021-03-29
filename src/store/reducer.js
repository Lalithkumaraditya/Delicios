import * as actionType from "./actions";

const INGREDIENTS_PRICES = {
  salad: 40,
  cheese: 30,
  meat: 90,
  bacon: 100,
};


const initialState = {
    ingredients: {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
  },
  totalPrice: 30,
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
    default:
      return state;
  }
};

export default reducer;
