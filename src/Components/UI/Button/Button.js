import React from 'react';
import './Button.css';

const Button =(props)=>{

    return(
        <div>
            <button className={props.button_style} onClick={props.clicked} disabled={props.disabled}><span>{props.children}</span></button>
        </div>
    )
}

export default Button
