import React from 'react';
import './Order.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import {ThemeProvider} from '@material-ui/core';
import theme from '../../theme'


const order = (props)=>{
const ingredients= [];
const orderInfo=[];
let Itemname=[];
let number=[];
let spanTag=null
    for(let ingredientName in props.ingredients){
       
        ingredients.push({name:ingredientName,
        amount:props.ingredients[ingredientName]
     })
    }
  //   for(let orderName in props.orderInfo){
       
  //     orderInfo.push({name:orderName,
  //     amount:props.orderInfo[orderName]
  //  })
  //  console.log("OrderInfo"+JSON.stringify(orderInfo.amount));
  
  // }
  console.log(props.orderInfo.country)
    
   const  handleDelete=()=>{

    }
    const ingredientOutPut=ingredients.map(ig=>{
        return<span
        style={{textTransform:'capitalize',display:'inline',margin:'0 8px',border:'1px solid #ccc',padding:'5px',color:'white'}}
         key={ig.name}>{ig.name}({ig.amount})</span>
    })
 
    return(
      <ThemeProvider theme={theme}>
      
    <div className='Order'>

    <p style={{color:'white'}} className='badge_text'>Order Info:</p><br></br>
   
            <div className='backDrop'>
        {/* <h4>Name:           {props.orderInfo.name}</h4>
        <h4>Billing Address:{props.orderInfo.street}</h4>
        <h4> ZipCode:       {props.orderInfo.zippCode}</h4> */}

        <table>
        <tr> 
        <td>Name:-     </td>
        <td>{props.orderInfo.name.charAt(0).toUpperCase()+props.orderInfo.name.slice(1)}</td>
         </tr>     
         <tr> 
        <td>Billing To:-</td>
        <td>{props.orderInfo.street}</td>
         </tr>     
         <tr> 
        <td>Zip Code:-    </td>
        <td>{props.orderInfo.zippCode}</td>
         </tr>     
        </table>
      </div>
     
  


      
        <p style={{color:'white'}} className='badge_text'>Ingredients:</p><br></br>
      
        {ingredients.map(ing =>(
            <div className='gap_btwn'>
        <Chip
        size="large"
        avatar={<Avatar>{ing.amount}</Avatar>}
        label={ing.name}
        key={Math.random(100)}
        clickable
        color="primary"
        onClick={(label)=>handleDelete(label)}
        deleteIcon={<DoneIcon />}
      />
      </div>
     
      ))}
        <br></br>
        <br></br>
        <h1 style={{color:'white'}} className='badge_text'>Price:</h1>
        <div className='badge_text'>
        <Chip
        size="medium"
        avatar={<Avatar>INR</Avatar>}
        label={props.price}
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      </div>
          
      
    </div>
    </ThemeProvider>
    );
};

export default order;