 import React from 'react'
 import Burger from '../../../Burger/Burger'
 import Button from '../../../UI/Button/Button.js'
 import './OrderSummary.css'
 const OrderSummary =(props)=>{
 const ingredientSummary=Object.keys(props.ingredients)
  .map(igKey=>{
      return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>
  });
return(
    <React.Fragment>
        <h3>Your Order</h3>
        <p>A Delicious Burgerwith the following ingredients</p>
        {/* <Burger ingredients={props.ingredients}/> */}
    <ul>
     {ingredientSummary}
    </ul>
<p>Total Price:{props.price}  Rs</p>
    <div className='BuildControl'>
    <Button button_style='primary' size="large" clicked={props.canceled}>Cancel</Button>
    <Button button_style='primary' size="large"  clicked={props.continue}>Continue</Button>
    </div>
    </React.Fragment>
);
}

export default OrderSummary;