import recat from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import Button from '../../UI/Button/Button'
const controls =[
       {label: 'Salad',type:'salad'},
       {label: 'Cheese',type:'cheese'},
       {label: 'Meat',type:'meat'},
       {label: 'Becon',type:'bacon'}
]
const BuildControls = (props) =>{
 return(
    <div className='BuildControls'>
    
      {controls.map(ctr =>(
       <BuildControl key={ctr.label} label={ctr.label}
        added={()=>props.ingredientAdded(ctr.type)} 
        remove={()=>props.ingredientRemove(ctr.type)}  
         disabled={props.disabled[ctr.type]} />
      ))}
      <br></br>
        <h3 className='price'>Current Price :{props.price}Rs</h3>
     
        <div className='align'>

         <Button  button_style='button_big' disabled={props.flag} clicked={props.ordered }>CHECKOUT</Button>
        </div>
    </div>
 )
}
export default BuildControls