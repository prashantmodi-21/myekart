import React from 'react'
import Review from './Review'
import { loadStripe } from '@stripe/stripe-js'
import { Button, Divider, Typography } from '@mui/material'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
const stripePromise = loadStripe('pk_test_51NwMGqSJqDLz6xRIEkXCVejBLJNdj2sSQyp3WqyOYs9HvCOC3v3icchxMlDWwlWXzmzBJddzWerGDysyUBJ8CLA000LX8pFMkw')
const PaymentForm = ({userInfo, cart, token, next, prev, onCheckout}) => {
 const PaymentOptions = () =>{
  const handlesubmit = async(e) =>{
    e.preventDefault()
    
      const orderInfo = {
        list_items: token.line_items,
        customer: {firstname: userInfo.fname, lastname: userInfo.lname, phone: userInfo.mobile, email: userInfo.email},
        shipping: {name: `${userInfo.fname} ${userInfo.lname}`,street:  userInfo.address, town_city: userInfo.city, country: userInfo.country, county_state: userInfo.state, postal_zip_code: userInfo.pincode},
        billing: {name: `${userInfo.fname} ${userInfo.lname}`,street:  userInfo.address, town_city: userInfo.city, country: userInfo.country, county_state: userInfo.state, postal_zip_code: userInfo.pincode},
        fulfillment: {shipping_method: userInfo.option},
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '28413',
          },
        }
      }
      onCheckout(token.id, orderInfo)
      next()
    
  }
  return(
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant='contained' color='error' onClick={()=>prev()}>Back to Shipping</Button>
        <Button type='submit' variant='contained' onClick={(e)=>handlesubmit(e)}>Next</Button>
      </div>
  )
}
  
  return (
    <>
    <Review items={cart}/>
    <Divider/>
    <PaymentOptions/>
    </>
  )
}

export default PaymentForm
