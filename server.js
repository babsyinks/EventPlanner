const express = require('express')
const path = require('path')
const https = require('https')
const fs = require('fs')
const axios = require('axios')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const cors = require('cors')
dotenv.config({path:path.join(__dirname,'.env')})

const FLUTTER_SECRET = process.env.FLUTTER_WAVE_SECRET_KEY

axios.defaults.headers.common['Authorization'] = `Bearer ${FLUTTER_SECRET}`
const port = process.env.PORT || 3001
const app = express()
app.use(express.json())
var whitelist = ['https://eventaserver.onrender.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.options('*', cors())
app.use(cors(corsOptions))
app.post('/api/flutter',async (req,res)=>{
    const obj = req.body
    try {
          const result = await axios.post('https://api.flutterwave.com/v3/payments',obj)
          res.json(result.data)
    } catch (err) {
       console.log(err)
       res.status(400).send({error:err})
    } 
})

app.get('/api/verify/:txId',async (req,res)=>{
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${req.params.txId}/verify`,{'headers':{'Content-Type':'application/json'}})
    console.log(response)
    res.json(response)
})
app.post('/api/custom',(req,res)=>{
    const{name,email,phonenumber,days,tx_ref} = req.body
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 25,
        secure: false,
        auth: {
          user: 'corestackng@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
      }
      }) 

      const details_for_company= {
        from: 'corestackng@gmail.com',
        to: 'babawarunn@yahoo.com',
        subject: 'Hey,A Customer Wants To Book For An Event Using The Custom Plan',
        text: `Howdy,${name} wants to book for a custom event.The details of the customer is as follows:
        Transaction Reference: ${tx_ref}
        Name: ${name},
        Phone Number: ${phonenumber},
        Number of Event Days: ${days},
        Email: ${email}.
        Send him a bill as soon as possible!`
      }

      const details_for_customer = {
        from: 'corestackng@gmail.com',
        to: email,
        subject: 'Thank You For Choosing Eventa',
        text: `Thank you ${name} for choosing Eventa.We guarantee that you will not regret trusting us to manage your Event.
        We will get back to you shortly about what your unique and peculiar needs are for your event.This will help us plan 
        for your event probably and it will also enable us to give you a fair bill.
        Thanks once again for choosing Eventa,the most reliable Event management company in the world!`
      } 

      let customer_email_success = false
      let company_email_success = false 

      const sendCustomerMail = ()=>{
        transporter.sendMail(details_for_customer,(error, info)=>{
        if (error) {
        console.log(error);
        res.json({customer_email_success,company_email_success})
        } else {
        console.log(`Email has been sent ${info.response}`);
        customer_email_success = true
        res.json({customer_email_success,company_email_success})
        }
      });
      }


      transporter.sendMail(details_for_company,(error, info)=>{
        if (error) {
          console.log(error);
          sendCustomerMail()
        } else {
          console.log(`Email has been sent ${info.response}`);
          company_email_success = true
          sendCustomerMail()
        }
      });  
})

app.post('/api/contact',(req,res)=>{
  const{name,email,phoneNumber,message} = req.body

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 25,
        secure: false,
        auth: {
          user: 'corestackng@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
      }
      }) 

      const details_for_company= {
        from: 'corestackng@gmail.com',
        to: 'babawarunn@yahoo.com',
        subject: 'Hey,A Customer Has A Message For You',
        text: `Hi,${name} has a message for you.This person can be reached on this number: ${phoneNumber}.
        The Email is ${email}.
        Here is the message:

        ${message}`
      }

      const details_for_customer = {
        from: 'corestackng@gmail.com',
        to: email,
        subject: 'Thanks For Contacting Us',
        text: `Thank you ${name} for your interest in Eventa.We cherish you as a prospective customer,and we strive to make your
        event a very memorable one.
        We will painstakingly peruse your message and get back to you shortly.`
      } 

      let customer_email_success = false
      let company_email_success = false

      const sendCustomerMail = ()=>{
        transporter.sendMail(details_for_customer,(error, info)=>{
        if (error) {
        console.log(error);
        res.json({customer_email_success,company_email_success})
        } else {
        console.log(`Email has been sent ${info.response}`);
        customer_email_success = true
        res.json({customer_email_success,company_email_success})
        }
      });
      }


      transporter.sendMail(details_for_company,(error, info)=>{
        if (error) {
          console.log(error);
          sendCustomerMail()
        } else {
          console.log(`Email has been sent ${info.response}`);
          company_email_success = true
          sendCustomerMail()
        }
      });  
})

if(process.env.NODE_ENV === "production"){
/*     app.use(express.static(path.resolve(__dirname,'client','build')))
    app.get('*',(req,res)=>{ 
      res.sendFile(path.join(__dirname,'client','build','index.html'))
  }) */

  app.listen(port,()=>{
    console.log('Listening on port ',port) 
})

}
else{
app.get('*',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'client','public','index.html'))
})

const credentials = { 
                     key:fs.readFileSync(path.join(__dirname,'client','key.pem')),
                     cert:fs.readFileSync(path.join(__dirname,'client','cert.pem'))
                    } 

const serv = https.createServer(credentials,app) 

serv.listen(port,()=>{
    console.log('Listening on port ',port) 
})

}





  

