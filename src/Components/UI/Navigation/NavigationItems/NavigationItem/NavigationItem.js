import React from 'react';
import './NavigationItem.css'
const NavigationItem=(props)=> {
    return (
        <div className="NavigationItem">
            <a href={props.link} 
            className={props.active ? 'active' : null}>
                {props.children}</a>
        </div>
    );
}

export default NavigationItem;