// import React, { Component } from 'react';

// import Input from '../../Components/UI/Input/Input';
// import Button from '../../Components/UI/Button/Button'
// import './Login.css';
// // import UserIcon from '../../Components/Icons/User-icon/User-Icon'
// import * as actions from '../../store/actions/index'
// import {connect } from 'react-redux'


// class Login extends Component {
//     state = {
//         controls: {
//             email: {
//                 elementtype: 'input',
//                 elementconfig: {
//                     type: 'email',
//                     placeholder: 'Email'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     isEmail: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             password: {
//                 elementtype: 'input',
//                 elementconfig: {
//                     type: 'password',
//                     placeholder: 'Password'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 6
//                 },
//                 valid: false,
//                 touched: false
//             }
//         },
//         isSignup: true
//     }

//     checkValidity ( value, rules ) {
//         let isValid = true;
//         if ( !rules ) {
//             return true;
//         }

//         if ( rules.required ) {
//             isValid = value.trim() !== '' && isValid;
//         }

//         if ( rules.minLength ) {
//             isValid = value.length >= rules.minLength && isValid
//         }

//         if ( rules.maxLength ) {
//             isValid = value.length <= rules.maxLength && isValid
//         }

//         if ( rules.isEmail ) {
//             const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//             isValid = pattern.test( value ) && isValid
//         }

//         if ( rules.isNumeric ) {
//             const pattern = /^\d+$/;
//             isValid = pattern.test( value ) && isValid
//         }

//         return isValid;
//     }

//     inputChangedHandler = ( event, controlName ) => {
//         const updatedControls = {
//             ...this.state.controls,
//             [controlName]: {
//                 ...this.state.controls[controlName],
//                 value: event.target.value,
//                 valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
//                 touched: true
//             }
//         };
//         this.setState( { controls: updatedControls } );
//     }

//     submitHandler = ( event ) => {
//         event.preventDefault(); // we added this function to prevent the reloading of page
//         this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value);
//         //this.state.isSignup 

//     }

//     switchAuthModeHandler = () => {
//         this.setState(prevState => {
//             return {isSignup: !prevState.isSignup};
//         });
//     }

//     render () {
  
//         const formElementsArray = [];
//         for ( let key in this.state.controls ) {
//             console.log(key)
//             formElementsArray.push( {
//                 id: key,
//                 config: this.state.controls[key]
               
//             } );
       
//         }
       
//         const status=this.props.login
//         const form = formElementsArray.map( formElement => (
         
//             <Input
//                 key={formElement.id}
//                 elementtype={formElement.config.elementtype}
//                 elementconfig={formElement.config.elementconfig}
//                 value={formElement.config.value}
//                 invalid={!formElement.config.valid}
//                 shouldValidate={formElement.config.validation}
//                 touched={formElement.config.touched}
//                 changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
//         ));
       
//         return (
//             <div className="Login">
//                  <div className="icon-styling">
          
//                 </div>
//                 <form onSubmit={this.submitHandler}>
//                       {form}             
                
                
//                     <div className='Login-button'>
//                     <Button button_style="button_big" type='submit'>SUBMIT</Button>
//                     </div>
//                     <p>{this.props.login}</p>
//                 </form>
            
//                 {/* <Button 
//                     clicked={this.switchAuthModeHandler}
//                     button_style="button_big">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button> */}
//             </div>
//         );
//     }
// }

// const mapDispatchToProps = dispatch => {
   
//     return {
    
//         onAuth: ( email, password) => dispatch( actions.auth( email, password) )
//     };
// };
//  const mapStateToProps = state =>{
//      return{
//         login:state.login
//      };
//  }

// export default connect(mapStateToProps,mapDispatchToProps)(Login);