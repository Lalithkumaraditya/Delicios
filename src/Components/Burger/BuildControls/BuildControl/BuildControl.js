import React from 'react';

import Button from '../../../../Components/UI/Button/Button'
import './BuildControl.css'
const BuildControl = props => {
    return (
       
        <div className='BuildControl'>
            <div className='label_style'>{props.label}</div>
            <Button button_style="primary" clicked={props.remove} disabled={props.disabled}><span className="text_style">Less</span></Button>
            <Button button_style="primary" clicked={props.added} ><span className='text_style'>More</span></Button>

           
        </div>
        
    );
};



export default BuildControl;