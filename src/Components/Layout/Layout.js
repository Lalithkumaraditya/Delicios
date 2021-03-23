import React from 'react'
import './Layout.css'
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar'
const layout=(props)=>(
    <React.Fragment>
       <ToolBar/>
        <main className='Content'>{props.children}</main>
        </React.Fragment>
)
export default layout;