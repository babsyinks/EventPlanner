import React from 'react'
export default ()=>{
    return (
        <div className = "container-fluid section2 abt">

        <div className = "row">
            <h1 style = {{paddingRight:100}}>About Us</h1>
            <p className="aboutText">We are an elite event planning group with many years of experience.We have several happy clients 
                from diverse cultures and backgrounds.We are here to make your event one for the ages
            </p>
        </div>    
       
        <div className = "row ">
            <div className = "col-lg-4">
            <i className="fas fa-check-circle fa-4x icon"></i>
            <h3 className="feature-title">Excellent Service.</h3>
            <p>Our service delivery is always excellent.</p>
            </div>
            <div className = "col-lg-4">
            <i className="fas fa-bullseye fa-4x icon"></i>
            <h3 className="feature-title">Elite Clientele</h3>
            <p>We have managed several events for elites.</p>
            </div>
            <div className = "col-lg-4">
            <i className="fas fa-heart fa-4x icon"></i>
            <h3 className="feature-title">We Care.</h3>
            <p>We'll give you a refund if you're unsatisfied.</p>
            </div>
        </div>
    </div>
    )
}