import React from 'react';
import './NavigationItems.css';
import Button from '../../Button/Button'
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems=(props)=> {
    return (
       <ul className="NavigationItems">
           <span className='span-gap_one'></span>
          <NavigationItem link="/" active>Home</NavigationItem>
          <NavigationItem>About</NavigationItem>
          <NavigationItem>Contact</NavigationItem>
          <NavigationItem>Menu's</NavigationItem>
       
         <Button button_style="button_big">SignUp</Button>
       </ul>
    );
}

export default NavigationItems;