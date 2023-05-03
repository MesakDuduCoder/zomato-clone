import React, { Component } from "react";
import '../../styles/header.css'
import { Link } from 'react-router-dom';


export default class Header extends Component {


 handleLogout(e){
        e.preventDefault();
      window.localStorage.removeItem("token");
      alert("logged out")
        console.log("token removed");
  }
  
  
  render() {
    return (
    <div className='header'>
          <Link to='/' style={{textDecoration: 'none'}}>
          <div className="s-logo">e!</div>
          </Link>
        
           <div className="header-nav">
            <Link to='/' style={{textDecoration: 'none'}}>
          <div className='logout' onClick={(e)=>this.handleLogout(e)}>Logout</div>
          </Link> 
          
          <Link to='/sign-in' style={{textDecoration: 'none'}}>
          <div className='login'>Login</div>
          </Link>
          <Link to='/sign-up' style={{textDecoration: 'none'}}>
          <div className='signUp'>Create an account</div>
          </Link>
           </div>
    </div>
    );
  }
}
