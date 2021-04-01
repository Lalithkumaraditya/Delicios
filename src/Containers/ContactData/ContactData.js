import React, { Component } from "react";
import Button from "../../Components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../axios";
import Spinner from "../../Components/Spinner/Spinner";
import Input from "../../Components/UI/Input/Input";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/order';
import {connect} from 'react-redux';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementtype:'input',
        elementconfig:{
          type:"text",
          placeholder:"Enter Your Name",
          helper:"Enter Valid  Name"
        },
        value:'',
        Validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      street: {
        elementtype:'input',
        elementconfig:{
          type:"text",
          placeholder:"Enter Your Street",
          helper:"Enter Valid  Street"
        },
        value:'',
        Validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      zippCode: {
        elementtype:'input',
        elementconfig:{
          type:"text",
          placeholder:"Enter Your Zip",
          helper:"Enter Valid  Street"
        },
        value:'',
        Validation:{
          required:true,
          minLength:6,
          maxLength:6
        },
        valid:false,
        touched:false
      },
      country: {
        elementtype:'input',
        elementconfig:{
          type:"text",
          placeholder:"Enter Your Country",
          helper:"Enter Valid  Country"
        },
        value:'',
        Validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      email: {
        elementtype:'input',
        elementconfig:{
          type:"email",
          placeholder:"Enter Your Email",
          helper:"Enter Valid  Email"
        },
        value:'',
        Validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      deliveryMethod: {
        elementtype:'select',
        elementconfig:{
        options:[{value:'fastest',displayValue:'Fastest'},
                 {value:'cheapest',displayValue:'Cheapest'}]
        },
        value:'fastest',
        Validation:{},
        valid:true
      },
    },
    formIsValid:false,
   
  };
  orderHandler = event => {
    event.preventDefault();
    const formData={};
    for(let formElementIdentifier in this.state.orderForm ){
      formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData:formData
    };

   this.props.onOrderBurger(order);
  };

  checkValidity(value,rules){
    let isValid=true;
    if(!rules){
      return true
    }
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
      isValid=value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
      isValid=value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  InputChangeHandler(event,inputIdentifier){
    const updatedOrderForm ={
      ...this.state.orderForm
    }
    const updatedFormElement={
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.Validation)
    updatedFormElement.touched = true;
   // console.log(updatedFormElement);
   let formIsValid=true;
   for(let inputIdentifier in updatedOrderForm){
     formIsValid =updatedOrderForm[inputIdentifier].valid && formIsValid;
   }
    console.log(formIsValid)
    updatedOrderForm[inputIdentifier]=updatedFormElement;
  

    this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    
  }
  render() {
   
    const formElementsArray=[];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config:this.state.orderForm[key]
      })
    }
    let form = (
    
      <form onSubmit={this.orderHandler}>
       
     {formElementsArray.map(formElement =>(
       <Input key={formElement.id}
        elementtype={formElement.config.elementtype}
         elementconfig={formElement.config.elementconfig} 
         value={formElement.config.value}
         invalid={!formElement.config.valid}
         shouldValidate={formElement.config.Validation}
         touched={formElement.config.touched}

         changed={(event)=>this.InputChangeHandler(event,formElement.id)}/>
     ))}
      
        <br></br>
        <Button button_style="button_medium" disabled={!this.state.formIsValid} >
          ORDER
        </Button>
      </form>
     
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData" id="fast-transition">
        <h4>Enter Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading
  }
}
const mapDispatchToProps =dispatch=>{
return{
  onOrderBurger:(orderData)=>dispatch(actions.purchaseBurger(orderData))
};
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
