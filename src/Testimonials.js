import React from 'react'

export default ()=>{
    return (
        
<div id="carouselExampleCaptions" className="carousel slide testimony" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item testimony active container-fluid">
    <div className="carousel-caption d-md-block">
      <h2 class="testimonial-text">Eventa is the best event planning company out there.Their services are unbeatable</h2>
      <em>Silicon Valley, California</em>
      </div>
      <img src={require('./images/sara.jpg')} className="d-block w-100 items" alt="female face"/>
      
    </div>
    <div className="carousel-item testimony container-fluid">
      <img src={require('./images/andy.jpg')} className="d-block w-100 items" alt="Angela"/>
      <div className="carousel-caption d-md-block ">
      <h2 class="testimonial-text">What I like most about Eventa is their quest for perfection.They get A+ in all service delivery metrics</h2>
      <em>Long Island, New York</em>
      </div>
    </div>
    <div className="carousel-item testimony container-fluid">
      <img src={require('./images/clara.jpg')} className="d-block w-100 items" alt="dog"/>
      <div className="carousel-caption d-md-block">
      <h2 class="testimonial-text">Great company!Great event coverage!!Eventa rocks!!!</h2>
        <em>Pebbles, New York</em>
      </div>
    </div>
    <div className="carousel-item testimony container-fluid">
      <img src={require('./images/sammy.jpg')} className="d-block w-100 items" alt="lady"/>
      <div className="carousel-caption d-md-block">
      <h2 class="testimonial-text">If you want a classy event done with perfection,Eventa is the answer,look no further!!!</h2>
        <em> Beverly, Illinois</em>
      </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon arrows" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span className="carousel-control-next-icon arrows" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

       
    )
}