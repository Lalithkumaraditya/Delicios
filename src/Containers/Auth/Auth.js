
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import './Auth.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import React, { Component } from "react";
import Spinner from '../../Components/Spinner/Spinner'
import SnackBar from '../../Components/UI/SnackBar/SnackBar'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Enter Your Email",
          helper: "Enter Valid  Email"
        },
        value: "",
        Validation: {
          required: true,
          isEmail:true
        },
        valid: false,
        touched: false,
      },
      password: {
        elementtype: "input",
        elementconfig: {
          type: "password",
          placeholder: "Enter Your Password",
          helper: "Enter Valid  Password"
        },
        value: "",
        Validation: {
          required: true,
          minLength: 6,
          maxLength:200
        },
        valid: false,
        touched: false,
      },
     
  
    },
    formIsValid:false,
    isSignup:true,
    open:false,

  };
  componentDidMount(){
    if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
      this.props.onSetAuthRedirectPath()
    }
  }
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
    if(rules.isEmail){
       
         isValid = /@gmail\.com$/.test(value)
    }
    return isValid;
  }
  InputChangeHandler(event,inputIdentifier){
    const updatedcontrols ={
      ...this.state.controls
    }
    const updatedFormElement={
      ...updatedcontrols[inputIdentifier]
    };
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.Validation)
    updatedFormElement.touched = true;
   // console.log(updatedFormElement);
   let formIsValid=true;
   for(let inputIdentifier in updatedcontrols){
     formIsValid =updatedcontrols[inputIdentifier].valid && formIsValid;
   }
    console.log(formIsValid)
    updatedcontrols[inputIdentifier]=updatedFormElement;
  

    this.setState({controls:updatedcontrols,formIsValid:formIsValid})
    
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      ...this.state,
      open:false,
    })
  };
  orderHandler = event => {
    event.preventDefault();
   
    console.log(this.state.isSignup )
   this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
   if(this.props.error){
    console.log( 'error');
    this.setState({
      ...this.state,
      open:true,
    })
  }
  else{
    console.log('No error');
    this.setState({
      ...this.state,
      open:true,
    })
  }
  };
 switchAuthModeHandler=()=>{
   console.log(this.state.isSignup);
   this.setState(prevState=>{
     return{isSignup:!(prevState.isSignup)}
   })
 }
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = (
      <React.Fragment>
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
       </React.Fragment>
       
    );
    if(this.props.loading){
      form=<Spinner />
    }
    let errorMessage;
  
      if(this.props.error && (!(this.props.loading))){
        errorMessage=<SnackBar status={this.state.open} errorStatus={this.props.error} SuccessDisplay={this.state.isSignup} handleClose={this.handleClose} />
      }
      // if((!(this.props.error)) && (!(this.props.loading))){
      //   errorMessage=<SnackBar status={this.state.open} errorStatus={this.props.error} SuccessDisplay={this.state.isSignup} handleClose={this.handleClose} />
      // }
      let authRedirect=null
     if(this.props.isAuth){
      authRedirect=<Redirect to={this.props.authRedirectPath} />
     }
    return (
      <div className="ContactData" id="fast-transition">
        {authRedirect}
        {errorMessage}
           <form >
       {form} 
       <div className="BuildControls_rw_auth">
       <Button button_style="primary" clicked={this.orderHandler}  >
            Submit
          </Button>
          <Button button_style="secondary"  size="medium" clicked={this.switchAuthModeHandler} >
           Switch to {this.state.isSignup ?   'SIGN-IN' :'SIGN-UP' } 
          </Button>
          </div>
       </form>
       {errorMessage}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
return{
  loading:state.auth.loading,
  error:state.auth.error,
  isAuth:state.auth.token != null,
  buildingBurger:state.burgerBuilder.building,
  authRedirectPath:state.auth.authRedirectPath

}
}

const mapDispatchToProps=(dispatch)=>{
  return{
       onAuth: (email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
       onSetAuthRedirectPath:()=>(actions.setAuthRedirect('/'))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
