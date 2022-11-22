import React,{Fragment,useState,useEffect} from 'react'
import validator from 'validator'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Loading from './Loading'
import './PriceModalChild.css'

export const validateVal = (value,validator,setVal,setValidity,setIsSet,trimSpace)=>{
    let valid
    if(trimSpace){
        const trimmedStr = value.replace(/\s/g,'')
        valid = validator(trimmedStr)  
        
    }
    else{
        valid = validator(value)
    }
    setVal(value.replace(/\s{2,}/g,' '))
    setValidity(valid)
    value.length?setIsSet(true):setIsSet(false)
}

const PriceModalChild = (props)=>{

    const[isDisabled,setIsDisabled] = useState(true)
    const[days,setDays] = useState("")
    const[bill,setBill] = useState(0)
    const[name,setName] = useState('')
    const[nameIsValid,setNameIsValid] = useState(false)
    const[isNameSet,setIsNameSet] = useState(false)
    const[email,setEmail] = useState('')
    const[emailIsValid,setEmailIsValid] = useState(false)
    const[isEmailSet,setIsEmailSet] = useState(false)
    const[phoneNumber,setPhoneNumber] = useState('')
    const[phoneNumberIsValid,setPhoneNumberIsValid] = useState(false)
    const[isPhoneNumberSet,setIsPhoneNumberSet] = useState(false)
    const[isLoading,setIsLoading] = useState(false)
    const[modalForm,setModalForm] = useState(true)

    useEffect(() => {
        if(!!days && emailIsValid && phoneNumberIsValid && nameIsValid){
            setIsDisabled(false)
        }
        else{
            setIsDisabled(true)
        }
    }, [days,emailIsValid,phoneNumberIsValid,nameIsValid])

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

    const setValidName = (e)=>{
        const value = e.target.value
        validateVal(value,validator.isAlpha,setName,setNameIsValid,setIsNameSet,true)
    }
    const setValidEmail = (e)=>{
        const value = e.target.value
        validateVal(value,validator.isEmail,setEmail,setEmailIsValid,setIsEmailSet)
    }
    const setValidPhoneNumber = (e)=>{
        const value = e.target.value
        validateVal(value,validator.isMobilePhone,setPhoneNumber,setPhoneNumberIsValid,setIsPhoneNumberSet)
    }
    

    const generateTxnRef = ()=>{
        let txnStr = 'Eve-'
        let count = 0
        const returnRandNum = ()=> Math.floor(Math.random()*9)
        const returnRandAlphabet = ()=>{
            const alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
                               'w','x','y','z']
            const randAlphabetIndex = Math.floor(Math.random()*alphabets.length)
            let randAlphabet = alphabets[randAlphabetIndex]
            const alphabetCase = Math.floor(Math.random()*2)
            if(alphabetCase){
             randAlphabet = randAlphabet.toUpperCase()
            }
           return randAlphabet 
        }
        
        do{
          switch(count){
              case 0:
               for(let i=0; i<3; i++){
                  txnStr+=returnRandNum()
               }
               txnStr+='-'
               count++
               break
              case 1:
                  for(let i=0; i<3; i++){
                      txnStr+=returnRandAlphabet()
                   }
               txnStr+='-'
               count++
               break
               case 2:
                  const eFirst = email.charAt(0)
                  const eLast = email.charAt(email.charAt(email.length-1))
                  const p1 = phoneNumber.charAt(Math.floor(Math.random() * phoneNumber.length))
                  const p2 = phoneNumber.charAt(Math.floor(Math.random() * phoneNumber.length))
                  const all = eFirst+eLast+p1+p2+days+ '-'
                  txnStr+=all
                  count++
                  break
               case 3:
                   const str = returnRandAlphabet() + returnRandNum() + returnRandAlphabet()
                   txnStr+=str
                   count++
                   break
               default:
                   console.log(txnStr)
          }
        }while(count<4)
  
        return txnStr
      }

    const completeEventBooking = async (e)=>{

        const txRef = generateTxnRef()

        if(props.planName === "Custom"){
            const txn_obj = {
                "tx_ref":txRef,
                "email":email,
                "phonenumber":phoneNumber,
                "name":name,
                "days":days
            }

            setIsLoading(true)
            setModalForm(false)
            const {data:{customer_email_success,company_email_success}} = await axios.post('/custom',txn_obj)
            setIsLoading(false)
            if(customer_email_success && company_email_success){
                props.history.push('/success/Information Recieved!,You"ll Be Shortly Contacted To Know Your Unique Needs,So That You"ll Be Fairly Billed./Information Received!')
            }
            else if(!customer_email_success){
                props.history.push('/failure/We Could Not Deliver A Mail To You,Please Check To Ensure You Entered A Valid Email And Try Again./Custom Plan Booking Failed!')
            }
            else{
                props.history.push('/failure/A Mail Was Sent To You,But We Did Not Receive The Mail,This Is Probably A Technical Issue,Please Consider Re-Booking Later./Custom Plan Booking Failed!')
            }
        }
        else{
            const redirectUrl = process.env.REDIRECT_URL || `https://localhost:3000/payment-status/`
            const txn_obj = {
                "tx_ref":txRef,
                "amount":bill,
                "currency":"USD",
                "redirect_url":`${redirectUrl}${txRef}/${props.planName}`,
                "payment_options":"card",
                "customer":{
                "email":email,
                "phonenumber":phoneNumber,
                "name":name
                },
                "customizations":{
                "title":"Eventa Booking",
                "description":"Book With Us For Your Top Notch Event Planning",
                "logo":require("./images/logo.png")
                }

        } 
        setIsLoading(true)
        setModalForm(false)
        const {data} = await axios.post("/flutter",txn_obj)
        setIsLoading(false)
        props.displayPrice(false)
        if(data.status === 'success'){
        const{link} = data.data
        window.location.href = link
        }
        else{
            props.history.push('/payment-failure/Could Not Proceed To Checkout For Payment.Please Check Your Entries Or Try Again Later/Payment Request Denied')
        }
            }
    }
    const closeModal = ()=>{
        props.displayModal(false)
    }
    
        if(isLoading){
            return(
                <Fragment>
                    <div className = "backdrop">
                
                    </div> 
                    <div className = "loadingIcon" >
                        <Loading/> 
                    </div>
                </Fragment>
            ) 
        }
        else{
            return(
                modalForm && (
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
                        Name:
                    </label>
                    <input type = "text" value = {name} onChange = {setValidName} className = "textInput"/>
                    {isNameSet && <span className = "imgSpan"><img src = {nameIsValid?require('./images/correct.jpg'):require('./images/wrong.jpg')} alt = "this depicts name validity"/></span>}
                </div>

                <div>
                    <label>
                        Email:
                    </label>
                    <input type = "text" value = {email} onChange = {setValidEmail} className = "textInput"/>
                    {isEmailSet && <span className = "imgSpan"><img src = {emailIsValid?require('./images/correct.jpg'):require('./images/wrong.jpg')} alt = "this depicts email validity"/></span>}
                </div>
                <div>
                    <label>
                        Phone Number:
                    </label>
                    <input type = "text" value = {phoneNumber} onChange = {setValidPhoneNumber} className = "textInput"/>
                    {isPhoneNumberSet && <span className = "imgSpan"><img src = {phoneNumberIsValid?require('./images/correct.jpg'):require('./images/wrong.jpg')} alt = "this depicts phone number validity"/></span>}
                </div>
                {props.planName!=='Custom'&&(
                <div>
                    <label>Amount Per Day:</label><span className = "amount">{`$${props.amount}`}</span>  
                </div>)}
                <div>
                    <label>
                        Number Of Event Days:
                    </label>
                    <input type = "text" onChange = {setValidDays} min = "1" max = "365" maxLength = "3" value = {days} className = "textInput"/>
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
            )
        }
    
}
export default withRouter(PriceModalChild) 
