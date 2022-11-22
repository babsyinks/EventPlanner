import React,{useState,useEffect} from 'react'
import qs from 'query-string'
import axios from 'axios'
import Loading from './Loading'
import PaymentSuccess from './PaymentSuccess'
const PaymentStatus = ({location,match,history})=>{
const[loading,setLoading] = useState(true)    

useEffect(()=>{
    (async ()=>{
        const parsedVals = qs.parse(location.search)
        const txId = parsedVals["transaction_id"]
        const status = parsedVals["status"]
        if(status === "cancelled"){
            history.push('/payment-failure/This Transaction Has Been Cancelled./Payment Cancelled')
        }
        else if(status!=="successful"){
            history.push('/payment-failure/This Transaction Could Not Be Completed.Try Again Later./Incomplete Transaction')
        }
        else{
        const res = await axios.get(`https://eventaserver.onrender.com/api/verify/${txId}`)
        if(res.status === 200){
            setLoading(false)
        }
        else{
            history.push('/payment-failure/This Transaction Did Not Meet The Expected Conditions For The Service Requested.Contact Us For A Refund If You Have Been Debited./Payment Failure')
        }            
        }

    })()
    //eslint-disable-next-line
},[])
return (
    loading?(
        <Loading/>
    ):
    (    
        <PaymentSuccess
         heading = {'Payment Successful'}
         body = {`Congrats!You Have Successfully Booked And Paid For The ${match.params.planName} Plan!`}
         />
    )

)
}

export default PaymentStatus