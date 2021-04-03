import React from 'react'
import './Layout.css'
import {connect} from 'react-redux'
import ToolBar from '../../Components/Navigation/Toolbar/Toolbar'
import  { Component } from 'react';

class Layout extends Component {
   render() {
      return (
         <React.Fragment>
       <ToolBar isAuth={this.props.isAuth}/>
        <main className='Content'>{this.props.children}</main>
        </React.Fragment>
      );
   }
}
const mapStateToProps = (state)=>{
   return{
       isAuth: state.auth.token != null
   }
}

export default connect(mapStateToProps)(Layout);