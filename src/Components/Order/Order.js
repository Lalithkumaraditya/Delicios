import React from 'react';
import './Order.css';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import {ThemeProvider} from '@material-ui/core';
import theme from '../../theme'


const order = (props)=>{
const ingredients= [];
let Itemname=[];
let number=[];
let spanTag=null
    for(let ingredientName in props.ingredients){
       
        ingredients.push({name:ingredientName,
        amount:props.ingredients[ingredientName]
     })
    }
    
   const  handleDelete=()=>{
  // console.log(ingredients[0].name);

    // console.log(ingredients[i].amount);
    
 
  



    }
    const ingredientOutPut=ingredients.map(ig=>{
        return<span
        style={{textTransform:'capitalize',display:'inline',margin:'0 8px',border:'1px solid #ccc',padding:'5px',color:'white'}}
         key={ig.name}>{ig.name}({ig.amount})</span>
    })
 
    return(
      <ThemeProvider theme={theme}>
      
    <div className='Order'>

   
      
        <p style={{color:'white'}} className='badge_text'>Ingredients:</p>
      
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