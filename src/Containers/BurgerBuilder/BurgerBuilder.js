import React, { Component, Fragment } from "react";
import Burger from "../../Components/Burger/Burger";
import './BurgerBuilder.css'
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrdeSummary from "../../Components/Burger/OrderSummary/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../Components/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENTS_PRICES = {
  salad: 40,
  cheese: 30,
  meat: 90,
  bacon: 100,
};

class BurgerBuilder extends Component {
 
  state = {
    ingredients: null,
    totalPrice: 30,
    purchasing: false,
    loading: false,
    error:false
  };
  componentDidMount() {
    axios
      .get("https://delicious-62109.firebaseio.com/ingredients.json")
      .then((response) => {
          console.log(response)
        this.setState({ ingredients: response.data });
      })
      .catch(error =>{
        this.setState({error:true})
      })
  }
  addIngredients = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounter = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounter;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
  };
  removeIngredients = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounter = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounter;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    
    const queryparams=[];
    for(let i in this.state.ingredients){
      queryparams.push(encodeURIComponent(i)+ '=' +encodeURIComponent(this.state.ingredients[i]))
    }
    queryparams.push('price='+this.state.totalPrice);
    const queryString=queryparams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search:'?'+queryString,

    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    let status;
    let flag = false;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      status = disabledInfo[key] <= 0;
      flag = status || flag;
      // console.log(disabledInfo)
    }
    let orderSummary =null
     

   
    let burger = this.state.error ? <h1 className='text-style'>Ingredients Can't Be Loaded... </h1> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredients}
            ingredientRemove={this.removeIngredients}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            flag={!flag}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrdeSummary
          ingredients={this.state.ingredients}
          canceled={this.purchaseCancel}
          continue={this.purchaseContinue}
          price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);
