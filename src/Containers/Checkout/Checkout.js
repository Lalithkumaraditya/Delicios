import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
class Checkout extends Component {


  onCheckoutCancelledHandler=()=>{

    //window.location.reload(true);
    this.props.history.push('/');
  }
  onCheckoutContinuedHandler=()=>{
   this.props.history.replace('/checkout/contact-data')
  }
    render(){
      let summary=<Redirect to="/" />
      if(this.props.ings){
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" />  : null
        summary=( <div>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ings} 
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
          />
          <Route 
          path={this.props.match.path +'/contact-data'} 
          component={ContactData}/>
          </div>
          )
      }
        return summary
           
             
                
        
      
    }
}
const mapStateToProps = (state) => {
    return {
      ings: state.burgerBuilder.ingredients,
      purchased:state.order.purchased
    };
  
  };



export default connect(mapStateToProps)(Checkout);