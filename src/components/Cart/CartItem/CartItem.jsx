import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CartItem = ({item, removeItem, updateCart}) => {
  return (
    <Card>
      <CardMedia
      image={item.image.url}
      alt={item.name}
      sx={{height: '300px'}}
      />
      <CardContent>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='body2'>{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Button onClick={()=>updateCart(item.id, item.quantity -1)}>-</Button>
        <Typography variant='subtitle2'>{item.quantity}</Typography>
        <Button onClick={()=>updateCart(item.id, item.quantity +1)}>+</Button>
        </div>
        <Button variant='contained' color='error' onClick={()=>removeItem(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
