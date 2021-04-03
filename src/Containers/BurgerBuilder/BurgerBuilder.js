import React, { Component, Fragment } from "react";
import Burger from "../../Components/Burger/Burger";
import "./BurgerBuilder.css";
import axios from '../../axios'
import { connect } from "react-redux";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrdeSummary from "../../Components/Burger/OrderSummary/OrderSummary/OrderSummary";
import Spinner from "../../Components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import * as authActions from '../../store/actions/auth'
import {Redirect} from 'react-router-dom'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  
  };
  componentDidMount() {
  
    this.props.OnIngredientsLoad();
   
  }
 
  purchaseHandler = () => {
    if(this.props.isAuth){

      this.setState({ purchasing: true });
    }
    else{
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth');

    }
  };
  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    this.props.onOrderSuccessRedirect();
    this.props.history.push('./checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    let status;
    let flag = false;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      status = disabledInfo[key] <= 0;
      flag = status || flag;
      // console.log(disabledInfo)
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <h1 className="text-style">Ingredients Can't Be Loaded... </h1>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            flag={!flag}
            isAuth={this.props.isAuth}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrdeSummary
          ingredients={this.props.ings}
          canceled={this.purchaseCancel}
          continue={this.purchaseContinue}
          price={this.props.price}
        />
      );
     
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuth:state.auth.token !=null
  };

};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
      OnIngredientsLoad: () =>
      dispatch(actions.OnIngredientsLoad()),
      onOrderSuccessRedirect: () =>
      dispatch(actions.PurchaseSuccessRedirect()),
      onSetRedirectPath: (path) =>
      dispatch(authActions.setAuthRedirect(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder,axios));
