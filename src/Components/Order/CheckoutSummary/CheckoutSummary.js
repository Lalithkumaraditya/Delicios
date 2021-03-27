import React from 'react'
import Burger from '../../Burger/Burger'
import './CheckoutSmmary.css';
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) =>{
return(
    <React.Fragment>
    <div className='CheckoutSummary'>
        <h1 className='text_style'>We hope it tast well</h1>
        <div style={{width:'100%',height:'20%',margin:'auto'}}>
         <Burger ingredients ={props.ingredients}/>
        </div>
    </div>
    <div className="BuildControls_rw">
     <Button 
     button_style="button_medium"
     clicked={props.onCheckoutCancelled}>Cancel</Button>
     <Button button_style="button_medium"
     clicked={props.onCheckoutContinued}>Continue</Button>
     </div>
     </React.Fragment>
)

}
export default CheckoutSummary;