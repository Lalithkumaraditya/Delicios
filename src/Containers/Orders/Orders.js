import React,{ Component } from "react";
import Order from '../../Components/Order/Order';
import axios from '../../axios';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../Components/Spinner/Spinner'
class Orders extends Component{
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount(){
      // axios.get('/orders.json')
      // .then(res=>{
      //   console.log(res.data);
      //     const fetchOrders =[];
      //     for(let key in res.data){
      //       fetchOrders.push(
      //          { 
      //           ...res.data[key],
      //           id : key
      //       });
      //       console.log("fetchOrders"+fetchOrders);
      //     }
      //   this.setState({loading:false,orders:fetchOrders});
      // })
      // .catch(err =>{
      //   this.setState({loading:false});

      // });
      this.props.fetchOrderStart(this.props.token);
    }
render(){
     let orders=  <Spinner />;
     if(!this.props.loading){
      let UserEmail=this.props.email;
      console.log(JSON.stringify(this.props.orders))
      orders=this.props.orders.filter(order=>{
        return (UserEmail === order.orderData.email);
      }).map(order=>{
        return <Order key={order.id} ingredients={order.ingredients} price={order.price} orderInfo={order.orderData}/>
      })
    console.log(orders)
     }
     if(orders.length==0){
      orders=<h1 style={{color:'white',textAlign:"center",marginTop:'30%'}}>Currently You Didn't Ordered Anything ☹️</h1>
    }
    return(
        <div>
        {orders}
        </div>
    );
}
}

const mapStateToProps=state=>{
  return{
    orders:state.order.orders,
    loading:state.order.fLoading,
    token:state.auth.token,
    email:state.auth.email
  }
}
  const mapDispatchToProps=dispatch=>{
    return{
      fetchOrderStart:(token)=>dispatch(actions.fetchOrderStart(token))
    }
  }
 

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));



//if(!this.props.loading){
  //  orders=this.props.orders.map(order=>(
     
  //   <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
  //   ))