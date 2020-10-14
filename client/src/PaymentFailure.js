import React from 'react'
import './PaymentFailure.css'
const PaymentFailure = ({match:{params:{msg,heading}}})=>{
    return(
        <div className = "PaymentFailure">
            <h1>{heading}</h1>
            <p>{msg}</p>
        </div>
    )
}
export default PaymentFailure