import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) =>(
    <React.Fragment>
<header className='Toolbar'>
    <Logo />
    <nav>
       <NavigationItems isAuth={props.isAuth}/>
    </nav>
</header>
    </React.Fragment>
);
export default Toolbar;