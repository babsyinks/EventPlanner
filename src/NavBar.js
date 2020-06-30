import React from 'react'
import {Link} from 'react-router-dom'
export default ()=>{

    return (
     
        <nav className = "navbar navbar-expand-lg navbar-dark navigation">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
    
             <Link className="navbar-brand nav_brand eventa" to="/">eventa</Link> 
             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active nav_list">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item nav_list">
                    <Link className="nav-link" to="/about">About </Link>
                </li>
                <li className="nav-item nav_list ">
                    <Link className="nav-link" to="/testimonials">Testimonials</Link>
                </li>
                <li className="nav-item nav_list">
                    <Link className="nav-link" to="/pricing">Pricing </Link>
                </li>
                <li className="nav-item nav_list">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
            </ul>
            </div>
            </nav>
    
    )
}