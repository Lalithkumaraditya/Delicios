import React from 'react';
import './Input.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));
  
  
const Input =(props)=>{
    const classes = useStyles();
    let inputElement=null
    switch(props.inputType){
   
        case('input'):
        inputElement= <TextField
          id="standard-full-width"
          label={props.value}
          style={{ margin: 8 }}
          placeholder={props.placeholder}
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          
          {...props}
      value={props.value}
      onChange={props.changed}/>
       

        //<input className='Input' {...props.elementconfig} value={props.value}
        //onChange={props.changed}/>;
        break;
         case('textarea'):
         inputElement=<textarea className='Textarea' {...props} value={props.value}
         onChange={props.changed} />;
         break;
         case('select'):
         inputElement=<select
          className='Textarea' {...props} 
          value={props.value}
          onChange={props.changed}
         >
          {props.elementconfig.options.map(option=>(
              <option  key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
         </select>;
         break;
        default:
            inputElement=<input  {...props} value={props.value}
            onChange={props.changed}/>;
    }
    return(
    <div>
    <label className='Label'>{props.label}</label>
     {inputElement}
     {/* {validationError} */}
    </div>
    )
};
export default Input;








 // let inputElement=null;
    // const inputClasses=[];
    // let validationError = null;
    // if(props.invalid && props.shouldValidate && props.touched){
    //     inputClasses.push('Invalid');
    //     console.log(props.value);
    //     validationError = <p className='ValidationError'>Please enter a valid value!</p>;
    // }