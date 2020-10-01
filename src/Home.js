import React from 'react'
import {Link} from 'react-router-dom'
export default function Home(){
    return (
        <div className="container-fluid homeWrapper">
       
          <div className="container_custom navigation homeContainer">
              <div className = "row section1">

                <div className = "col col-lg-6 col-md-8 col-sm-9 col-xs">
                <h1 className = 'meetUp'>Let us make your event a memorable fun filled one</h1>
                <div className = "buttons">
                <Link to = "/pricing" className = "btn btn-dark btn-lg button smscreen">Get Started</Link>
                <Link to = "/about" className = "btn btn-outline-light btn-lg button smscreen">Learn More</Link>
                </div>

                </div>
                <div className = "col col-lg-6 col-md-4 col-sm-3 col-xs">
                <img className = "img_phone" src ={require('./images/eventplanninged.png')} alt = "Event written on a phone"/>
                </div>
            </div>
          </div>   
  
 
        </div>
    )
}
