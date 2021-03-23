import React from 'react';
import logo from '../../Assets/images/burger-logo.png'
import './Logo.css'
const Logo=(props) =>{
    return (
        <div className='logo'>
            <img  src={logo} alt="Burger"/>
        </div>
    );
}

export default Logo;