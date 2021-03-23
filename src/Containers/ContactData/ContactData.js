import React,{Component} from 'react';
import Button from '../../Components/UI/Button/Button'
import './ContactData.css';
import axios from '../../axios'
import Spinner from '../../Components/Spinner/Spinner'
import Input from '../../Components/UI/Input/Input'
class ContactData extends Component{
     state={
         name:'',
         email:'',
         address:{
             street:'',
             postalCode:''
         },
         loading:false
     }
     orderHandler = (event)=>{
         event.preventDefault();
        
     this.setState({ loading: true });
     const order = {
       ingredients: this.props.ingredients,
       price: this.state.totalPrice,
       customer: {
         name: "Lalith",
         address: {
           street: "3rd cross",
           zippCode: "517101",
           country: "india",
         },
         email: "lalith@gmail.com",
       },
       deliveryMethod: "faster",
     };
     axios
       .post("/orders.json", order)
       .then((response) => {
         this.setState({ loading: false, purchasing: false });
         this.props.history.push('/');
       })
       .catch((err) => {
         this.setState({ loading: false, purchasing: false });
       });
     }
     render(){
         let form =(
            <form>
            <Input type='text' inputType="input" name='name' placeholder='Enter your Name' />
            <Input type='email' inputType="input" name='email' placeholder='Enter Your Email' type="email" />
            <Input type='text' inputType="input"  name='street'placeholder='Enter Your Street' />
            <Input type='text' inputType="input" name='postalcode' placeholder='Enter your Postal Code' min="5" max="5"  />
            <br></br>
           <Button button_style="button_medium" clicked={this.orderHandler}>ORDER</Button>
        </form>
         );
         if(this.state.loading){
             form=<Spinner />
         }
         return(
             <div className='ContactData' id='fast-transition'>
              <h4>Enter Contact Data</h4>
             {form}
             </div>
         );
     }

}
export default ContactData;