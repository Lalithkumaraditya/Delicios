import React from 'react';

import Button from '../../../../Components/UI/Button/Button'
import './BuildControl.css'
const BuildControl = props => {
    return (
        <div className='BuildControl'>
            <div className='label_style'>{props.label}</div>
            <Button button_style="button_small" clicked={props.remove} disabled={props.disabled}>Less</Button>
            <Button button_style="button_small" clicked={props.added} >More</Button>

           
        </div>
    );
};



export default BuildControl;