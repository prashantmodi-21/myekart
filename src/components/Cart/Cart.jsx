import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({cart, resetCart, removeItem, updateCart}) => {
  const EmptyCart = () =>(
    <div>
      <Typography variant='h5'>Cart is Empty. <Link to='/'>Shop Now</Link></Typography>
    </div>
  )
  const FilledCart = () =>(
    <>
      <Grid container spacing={4}>
        {cart.line_items.map((item)=>(
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CartItem item={item} removeItem={removeItem} updateCart={updateCart}/>
        </Grid>
       ))}
      </Grid>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem'}}>
        <Typography variant='h5'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
      <div>
          <Button variant='contained' color='error' sx={{marginRight: 2}} onClick={()=>resetCart()}>Reset Cart</Button>
          <Button variant='contained' component={Link} to='/checkout'>Checkout</Button>
      </div>
      </div>
      </>
  )
  return (
    <Container sx={{marginTop: 10}}>
    <Typography variant='h4' gutterBottom>Your Shopping Cart</Typography>
      {cart.line_items ? FilledCart() : EmptyCart()}
    </Container>
  )
}

export default Cart
