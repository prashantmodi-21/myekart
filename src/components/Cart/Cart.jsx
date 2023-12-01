import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({cart, resetCart, removeItem, updateCart, loader}) => {
  const EmptyCart = () =>(
    <Box>
      <Typography variant='h5'>Cart is Empty. <Link to='/'>Shop Now</Link></Typography>
    </Box>
  )
  const FilledCart = () =>(
    <>
      <Grid container spacing={4}>
        {cart.line_items.length > 0 ? cart.line_items.map((item)=>(
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CartItem item={item} removeItem={removeItem} updateCart={updateCart}/>
        </Grid>
       )) : <Box sx={{width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box>}
      </Grid>
      <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem'}}>
        <Typography variant='h5'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
      <Box sx={{display: 'flex'}}>
          <Button variant='contained' color='error' sx={{marginRight: 2}} onClick={()=>resetCart()}>Reset Cart</Button>
          <Button variant='contained' component={Link} to='/checkout'>Checkout</Button>
      </Box>
      </Box>
      </>
  )
  return (
    <Container sx={{marginTop: 5}}>
    <Typography variant='h4' gutterBottom>Your Shopping Cart</Typography>
      {cart.line_items?.length > 0 ? FilledCart() : EmptyCart()}
    </Container>
  )
}

export default Cart
