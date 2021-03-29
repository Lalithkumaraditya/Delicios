import React, { Component, Fragment } from "react";
import Burger from "../../Components/Burger/Burger";
import "./BurgerBuilder.css";
import { connect } from "react-redux";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrdeSummary from "../../Components/Burger/OrderSummary/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../Components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    // axios
      // .get("https://delicious-62109.firebaseio.com/ingredients.json")
      // .then((response) => {
      //     console.log(response)
      //   this.setState({ ingredients: response.data });
      // })
      // .catch(error =>{
      //   this.setState({error:true})
      // })
  }
 
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
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

    let burger = this.state.error ? (
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
            price={this.props.totalPrice}
            flag={!flag}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrdeSummary
          ingredients={this.props.ings}
          canceled={this.purchaseCancel}
          continue={this.purchaseContinue}
          price={this.props.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
    ings: state.ingredients,
    totalPrice:state.totalPrice
  };

};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemove: (ingName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
