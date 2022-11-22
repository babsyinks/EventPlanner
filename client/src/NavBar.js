import React from 'react'
import {Link,NavLink} from 'react-router-dom'
export default ()=>{

    return (
     
        <nav className = "navbar navbar-expand-lg navbar-dark navigation">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
    
             <Link className="navbar-brand nav_brand eventa" to="/"><img src = {require('./images/logo.png')} alt="logo"/>eventa</Link> 
             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item nav_list">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item nav_list">
                    <NavLink className="nav-link" to="/about">About </NavLink>
                </li>
                <li className="nav-item nav_list ">
                    <NavLink className="nav-link" to="/testimonials">Testimonials</NavLink>
                </li>
                <li className="nav-item nav_list">
                    <NavLink className="nav-link" to="/pricing">Pricing </NavLink>
                </li>
                <li className="nav-item nav_list">
                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
            </ul>
            </div>
            </nav>
    
    )
}