import { Box, Button, CircularProgress, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutForm/CheckoutForm'
import PaymentForm from './CheckoutForm/PaymentForm'
import {commerce} from '../../lib/Commerce'
import { Link } from 'react-router-dom'
const Checkout = ({cart, onCheckout, order, errorMsg }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [userInfo, setUserInfo] = useState(null)
    const [token, setToken] = useState(null)
    const moveBackward = () => setActiveStep(activeStep - 1)
    const moveForward = () => setActiveStep(activeStep + 1)
    const steps = ['Shipping Address', 'Payments Details']
    const OdConfirmation = () =>(
      order.id ? <><Box sx={{marginTop: '1rem'}}>
        <Typography variant='h5' gutterBottom>Order {!errorMsg ? "Confirmed" : "Failed"}</Typography>
        <Typography variant='body2'>OrderId: {order.id}</Typography>
      </Box><Box>
        <Typography variant='h5' sx={{margin: '1rem 0'}}>{errorMsg}</Typography>
        <Button variant='contained' component={Link} to='/'>Back to Home</Button>
      </Box></> : <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}><CircularProgress/></Box>
      ) 
    const setUser = (user) =>{
      setUserInfo(user)
      moveForward()
    }
    const fetchToken = async() =>{
     setToken(await commerce.checkout.generateTokenFrom('cart', commerce.cart.id()))
    }
    
    useEffect(()=>{
      fetchToken()
    }, [])
  return (
    <Container sx={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
    <Paper sx={{padding: '4rem', textAlign: 'center'}}>
        <Typography variant='h4' gutterBottom>Checkout</Typography>
        <Stepper activeStep={activeStep}>
            {steps.map((step)=>(<Step key={step}><StepLabel>{step}</StepLabel></Step>))}
        </Stepper>
        {activeStep === steps.length ? OdConfirmation() : token ? (activeStep === 0 ? <CheckoutForm token={token} user={setUser}/> : <PaymentForm userInfo={userInfo} cart={cart} token={token} onCheckout={onCheckout} next={moveForward} prev={moveBackward}/>) : <CircularProgress sx={{marginTop: '1rem'}}/>}
      </Paper>
    </Container>
  )
}

export default Checkout
