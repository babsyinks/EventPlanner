import React,{Fragment,useState,useEffect} from 'react'
import './PriceModalChild.css'
import validator from 'validator'

export default (props)=>{

    const[isDisabled,setIsDisabled] = useState(true)
    const[days,setDays] = useState("")
    const[bill,setBill] = useState(0)
    const[email,setEmail] = useState('')
    const[emailIsValid,setEmailIsValid] = useState(false)
    const[isEmailSet,setIsEmailSet] = useState(false)
    const[phoneNumber,setPhoneNumber] = useState('')
    const[phoneNumberIsValid,setPhoneNumberIsValid] = useState(false)
    const[isPhoneNumberSet,setIsPhoneNumberSet] = useState(false)
    
    useEffect(() => {
        if(!!days && emailIsValid && phoneNumberIsValid){
            setIsDisabled(false)
            console.log('email',emailIsValid)
            console.log('phone',phoneNumberIsValid)
        }
        else{
            setIsDisabled(true)
            console.log('email inv',emailIsValid)
            console.log('phoneinv',phoneNumberIsValid)
        }
    }, [days,emailIsValid,phoneNumberIsValid])

    const setValidDays = (e)=>{
        const value = e.target.value

        if(Number.isNaN(+value)){
            setDays("")
            setBill(0)
            return
        }
        if(value.length !== 0){

            const finalVal = Math.floor(value)

            if(finalVal<=365){
                setDays(finalVal)
                props.planName!=='Custom'&&setBill(props.amount*finalVal)
            }
            else{
                const val = value.charAt(0) + value.charAt(1)
                const trimedVal = Math.floor(val)
                setDays(trimedVal)
                props.planName!=='Custom'&&setBill(props.amount*trimedVal)
            }
        }
        else{
            setDays("")
            setBill(0)
        }
    }


    const validateEmailOrPhoneNumber = (value,validator,setEmailOrPhone,setEmailOrPhoneValidity,setEmailOrPhoneIsSet)=>{
        const valid = validator(value)
        setEmailOrPhone(value)
        setEmailOrPhoneValidity(valid)
        value.length?setEmailOrPhoneIsSet(true):setEmailOrPhoneIsSet(false)
    }

    const setValidEmail = (e)=>{
        const value = e.target.value
        validateEmailOrPhoneNumber(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
    }
    const setValidPhoneNumber = (e)=>{
        const value = e.target.value
        validateEmailOrPhoneNumber(value,validator.isMobilePhone,setPhoneNumber,setPhoneNumberIsValid,setIsPhoneNumberSet)
    }

    const completeEventBooking = (e)=>{
  
    }

    const closeModal = ()=>{
        props.displayModal(false)
    }
    return (
        <Fragment>
            <div className = "backdrop" onClick = {closeModal}>
            
            </div>  
            <div className = "modal" >
        
                <span className = "x" onClick = {closeModal}>X</span>
                <div>
                    <h4>Thanks for choosing Eventa!Please provide your details below and click OK</h4>
                </div>
                <div>
                    <label>
                        Plan Name:
                    </label>
                    <span className = "planName">{props.planName}</span>
                </div>
                <div>
                    <label>
                        Email:
                    </label>
                    <input type = "text" placeholder = "Enter your email" value = {email} onChange = {setValidEmail} className = "textInput"/>
                    {isEmailSet && <span className = "imgSpan"><img src = {emailIsValid?require('./images/correct.jpg'):require('./images/wrong.jpg')} alt = "this depicts email validity"/></span>}
                </div>
                <div>
                    <label>
                        Phone Number:
                    </label>
                    <input type = "text" placeholder = "Enter your phone number" value = {phoneNumber} onChange = {setValidPhoneNumber} className = "textInput"/>
                    {isPhoneNumberSet && <span className = "imgSpan"><img src = {phoneNumberIsValid?require('./images/correct.jpg'):require('./images/wrong.jpg')} alt = "this depicts phone number validity"/></span>}
                </div>
                {props.planName!=='Custom'&&(
                <div>
                    <label>Amount Per Day:</label><span className = "amount">{`$${props.amount}`}</span>  
                </div>)}
                <div>
                    <label>
                        Number Of Days Event Will Hold:
                    </label>
                    <input type = "text" placeholder = "Enter number of event days" onChange = {setValidDays} min = "1" max = "365" maxLength = "3" value = {days} className = "textInput"/>
                </div>
                {props.planName!=='Custom'&&(
                <div>
                    <label>
                        Total Bill:
                    </label>
                    <span>
                        {`$${bill}`}
                    </span>
                </div>
                )}
                <section>
                    <button id = "proceed" value = "OK" disabled = {isDisabled} onClick = {completeEventBooking}>OK</button>
                </section>
            </div>
        </Fragment>

    )
}