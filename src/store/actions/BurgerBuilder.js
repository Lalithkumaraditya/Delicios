import * as  actionType from './actionTypes';
import axios from "../../axios";

export const addIngredient =(name)=>{
    return{
        type:actionType.ADD_INGREDIENTS,
        ingredientName:name
    }
}


export const removeIngredient =(name)=>{
    return{
        type:actionType.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}
export const setIngredients=(ingredients)=>{
    return{
        type:actionType.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientFail=()=>{
    return{
        type:actionType.FETCH_INGREDIENTS_FAIL
    }
}
export const OnIngredientsLoad=(ingredients)=>{
    return dispatch =>{
        axios
        .get("https://delicious-62109.firebaseio.com/ingredients.json")
        .then((response) => {
        dispatch(setIngredients(response.data))
        })
        .catch(error =>{
           dispatch(fetchIngredientFail())
        })
    };
};