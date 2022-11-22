import React,{useState,useEffect, Fragment,useReducer} from 'react'
import axios from 'axios'
import validator from 'validator'
import {validateVal} from './PriceModalChild'
import Modal from './Modal'
import './Contact.css'

export default (props)=>{
  const[isLoading,setIsLoading] = useState(false)
  useReducer()
  const[isDisabled,setIsDisabled] = useState(true)
  const[name,setName] = useState('')
  const[nameIsValid,setNameIsValid] = useState(false)
  const[isNameSet,setIsNameSet] = useState(false)
  const[email,setEmail] = useState('')
  const[emailIsValid,setEmailIsValid] = useState(false)
  const[isEmailSet,setIsEmailSet] = useState(false)
  const[phoneNumber,setPhoneNumber] = useState('')
  const[phoneNumberIsValid,setPhoneNumberIsValid] = useState(false)
  const[isPhoneNumberSet,setIsPhoneNumberSet] = useState(false)
  const[message,setMessage] = useState('')
  const[messageIsValid,setmessageIsValid] = useState(false)
  const[isMessageSet,setIsmessageSet] = useState(false)

  useEffect(() => {
    if(emailIsValid && phoneNumberIsValid && nameIsValid && messageIsValid){
        setIsDisabled(false)
    }
    else{
        setIsDisabled(true)
    }
}, [emailIsValid,phoneNumberIsValid,nameIsValid,messageIsValid])

  const handleChange = (e)=>{
    const value = e.target.value
    switch(e.target.name){
      case "name":
        validateVal(value,validator.isAlpha,setName,setNameIsValid,setIsNameSet,true)
        break
      case "phoneNumber":
        validateVal(value,validator.isMobilePhone,setPhoneNumber,setPhoneNumberIsValid,setIsPhoneNumberSet)
        break
      case "email":
        validateVal(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
        break
      case "message":
        validateVal(value,validator.isAscii,setMessage,setmessageIsValid,setIsmessageSet)
        break
      default:
        console.log(e.target.name)
    }
  }

  const handleSubmit = async ()=>{
    setIsLoading(true)
   const {data:{customer_email_success,company_email_success}} = await axios.post('/contact',{name,phoneNumber,email,message})
   setIsLoading(false)
   if(customer_email_success && company_email_success){
    props.history.push('/success/Thank You!An Email Has Been Sent To You.We Will Get Back To You Soon./Message Received!')
}
else if(!customer_email_success){
    props.history.push('/failure/We Could Not Deliver A Mail To You,Please Check To Ensure You Entered A Valid Email And Try Again./Your Message Was Not Delivered!')
}
else{
    props.history.push('/failure/A Mail Was Sent To You,But We Did Not Receive Your Mail,This Is Probably A Technical Issue,Please Consider Resending The Mail./Email Not Delivered To Us!')
}
  }
  if(isLoading){
    return(
      <Fragment>
        <div className = "more-info">
          <div>
            <h1>We Will Like To Hear From You:</h1>
              <p><span>Name:</span><input type = "text" name = "name" onChange = {handleChange} value = {name} className = {isNameSet?(nameIsValid?'valid':'inValid'):''}/>
              </p>
              <p><span>Tel:</span><input type = "text" name = "phoneNumber" onChange = {handleChange} value = {phoneNumber}  className = {isPhoneNumberSet?(phoneNumberIsValid?'valid':'inValid'):''}/>
              </p>
              <p><span>Email:</span><input type = "email" name = "email" onChange = {handleChange} value = {email}  className = {isEmailSet?(emailIsValid?'valid':'inValid'):''} />
              </p>
              <p><span>Message:</span><textarea rows = "4" name = "message" onChange = {handleChange} value = {message} className = {isMessageSet?(messageIsValid?'validTa':'inValidTa'):''} />
              </p>
              <div className = "submitInfo"><button disabled = {isDisabled} onClick = {handleSubmit}>Submit</button></div>
          </div>
    
        </div>
       <Modal>
        <div className = "bdp">

        </div>
        <div className = "md">
          <img src = {require('./images/horizontal_loader.gif')} alt = "horizontal loading icon"/>
        </div>
      </Modal>       
      </Fragment>

    )
  }
  else{
        return (
  <div className = "more-info">
   <div>
     <h1>We Will Like To Hear From You:</h1>
      <p><span>Name:</span><input type = "text" name = "name" onChange = {handleChange} value = {name} className = {isNameSet?(nameIsValid?'valid':'inValid'):''}/>
      </p>
      <p><span>Tel:</span><input type = "text" name = "phoneNumber" onChange = {handleChange} value = {phoneNumber}  className = {isPhoneNumberSet?(phoneNumberIsValid?'valid':'inValid'):''}/>
      </p>
      <p><span>Email:</span><input type = "email" name = "email" onChange = {handleChange} value = {email}  className = {isEmailSet?(emailIsValid?'valid':'inValid'):''} />
      </p>
      <p><span>Message:</span><textarea rows = "4" name = "message" onChange = {handleChange} value = {message} className = {isMessageSet?(messageIsValid?'validTa':'inValidTa'):''} />
      </p>
      <div className = "submitInfo"><button disabled = {isDisabled} onClick = {handleSubmit}>Submit</button></div>
   </div>
    
  </div>
    )
  }

}
