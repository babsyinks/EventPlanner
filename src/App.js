import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import Footer from './Footer'
import Contact from './Contact'
import About from './About'
import Testimonials from './Testimonials'
import './App.css';
import Pricing from './Pricing';

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
      </Switch>
      
      <Footer/>
    </BrowserRouter>
    
    
    
  );
}

export default App;
