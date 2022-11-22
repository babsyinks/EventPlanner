import React,{useState,Fragment} from 'react'
import Modal from './Modal'
import PriceModalChild from './PriceModalChild'
import './Pricing.css'

export default ()=>{

  const[openModal,setOpenModal] = useState(false)
  const[name,setName] = useState('')
  const[amount,setAmount] = useState(0)
  const[renderContent,setRenderContent] = useState(true)

  const handleEvent = (e)=>{
    setOpenModal(true)
    setRenderContent(true)
    const targetName = e.target.name
    switch(targetName){
      case 'Basic':
        setName(targetName)
        setAmount(50)
        break

      case 'Prestige':
        setName(targetName)
        setAmount(100)
        break

      case 'Custom':
        setName(targetName)
        setAmount(0)
        break
      default:
        return
    }
  }
    return (
     !renderContent?(
       <div className = "fullPage"><p>Still Loading...</p></div>
     ):<Fragment>
        <div className="container pricing">
   
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
              <h1 className="display-4">Choose the right plan for you</h1>
              <p className="lead">Simple and affordable price plans for your event</p>
            </div>
            <div className="card-deck mb-3 text-center">
          <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Basic</h4>
              </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">$50

            <small className="text-muted">/day</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>10 dedicated staff</li>
              <li>Silver curtleries</li>
              <li>12 working hours</li>
              <li>100 guests feeding coverage</li>
            </ul>
            <button name = "Basic" type="button" className="btn btn-lg btn-block btn-custom-outline" onClick = {handleEvent}>Get Started</button>
      </div>
    </div>
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">Prestige</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">$100
        <small className="text-muted">/ day</small></h1>
        <ul className="list-unstyled mt-3 mb-4">
          <li>30 dedicated staff</li>
          <li>Golden curtleries</li>
          <li>18 working hours</li>
          <li>300 guests feeding coverage</li>
        </ul>
        <button name = "Prestige" type="button" className="btn btn-lg btn-block btn-prestige-inline" onClick = {handleEvent}>Get Started</button>
      </div>
    </div>
    
    <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">Custom</h4>
      </div>
      <div className="card-body">
          <h1 className="card-title pricing-card-title">Custom Price
            <small className="text-muted"></small>
          </h1>
        <ul className="list-unstyled mt-3 mb-4">
          <li>As many staff as needed</li>
          <li>Curtleries customized to taste</li>
          <li>24 working hours</li>
          <li>Feeding based on request</li>
        </ul>
        <button name = "Custom" type="button" className="btn btn-lg btn-block btn-custom-inline" onClick = {handleEvent}>Contact Us</button>
      </div>
    </div>
  </div>
  </div>
  {openModal&& <Modal><PriceModalChild planName = {name} amount = {amount} displayModal = {setOpenModal} displayPrice = {setRenderContent}/></Modal>}
  </Fragment>
    )
}