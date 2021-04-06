import React from "react";
import "./Input.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import theme from '../../../theme'
import {ThemeProvider} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch"
  }
}));

const Input = props => {

  const classes = useStyles();
  let helper;
  let inputElement = [];
  const InputClasses = [inputElement]
  //console.log(props.invalid+" "+props.shouldValidate+' '+props.touched)
  if(props.invalid && props.shouldValidate && props.touched){
  
    InputClasses.push('Error');
   
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <TextField
        id="standard-full-width"
       className={InputClasses.join(' ')}
        color="primary"
        style={{ margin: 8 }}
        placeholder={props.placeholder}
        helperText= {(props.invalid && props.touched)  ? props.elementconfig.helper : null}
        fullWidth
        margin="normal"
        InputLabelProps={{
            shrink: true
          }}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
         <React.Fragment>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={props.value}
          fullWidth
          onChange={props.changed}
        >
          {props.elementconfig.options.map(option=>(
            <MenuItem key={option.value} value={option.value}>{option.displayValue}</MenuItem>
          ))}
        </Select>
        </React.Fragment>
      );
  }
  return (
    <ThemeProvider theme={theme}>
    <div>
      <label className="Label">{props.label}</label>
      {inputElement}
      {/* {validationError} */}
    </div>
    </ThemeProvider>
  );
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
