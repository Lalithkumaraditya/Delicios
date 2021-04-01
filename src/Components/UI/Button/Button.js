import React from 'react';
import './Button.css';
import {ThemeProvider} from '@material-ui/core';
import theme from '../../../Buttontheme'
import CustButton  from '@material-ui/core/Button';
const Button =(props)=>{

    return(
        <ThemeProvider theme={theme}>
        <div>
            {/* <button className={props.button_style} onClick={props.clicked} disabled={props.disabled}><span>{props.children}</span></button> */}

            <CustButton variant="contained" size={props.size} color={props.button_style}  onClick={props.clicked} disabled={props.disabled}>
            {props.children}
      </CustButton>
        </div>
        </ThemeProvider>
    )
}

export default Button
