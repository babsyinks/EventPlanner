import React from 'react'
import './PaymentSuccess.css'
const PaymentSuccess = ({heading,body,match})=>{
    const head = heading||match.params.heading
    const bd = body||match.params.body
    return head && bd && (
        <div className = "payment_success">
            <h1>{head}</h1>
            <p>{bd} </p>
        </div>
    )
}
export default PaymentSuccess