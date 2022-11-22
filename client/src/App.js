import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import Footer from './Footer'
import Contact from './Contact'
import About from './About'
import Testimonials from './Testimonials'
import PaymentStatus from './PaymentStatus'
import PaymentFailure from './PaymentFailure'
import NotFound from './NotFound'
import './App.css';
import Pricing from './Pricing';
import PaymentSuccess from './PaymentSuccess';

function App() {
  return (
    
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path = '/' component = {Home} />
        <Route exact path = '/contact' component = {Contact} />
        <Route exact path = '/about' component = {About} />
        <Route exact path = '/testimonials' component = {Testimonials} />
        <Route exact path = '/pricing' component = {Pricing} />
        <Route exact path = '/payment-status/:txref/:planName' component = {PaymentStatus} />
        <Route exact path = '/payment-failure/:msg/:heading' component = {PaymentFailure} />
        <Route exact path = '/success/:body/:heading' component = {PaymentSuccess}/>
        <Route exact path = '/failure/:msg/:heading' component = {PaymentFailure}/>
        <Route component = {NotFound} />
      </Switch>
      
      <Footer/>
    </BrowserRouter>
    
    
    
  );
}

export default App;
