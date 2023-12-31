import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Review = ({items, userInfo}) => {
  return (
    <>
    <Typography variant='h5' sx={{margin: '1rem 0'}}>Review Cart</Typography> 
    <List>
        {items.line_items.map((item)=>(
        <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}/>
            <Typography variant='h6'>{item.price.formatted_with_symbol}</Typography>
        </ListItem>
        ))}
        <Divider/>
        {userInfo.country === "IN" ? 
        <ListItem>
            <ListItemText>Subtotal:</ListItemText>
            <Typography variant='h6'>{items.subtotal.formatted_with_symbol}</Typography>
        </ListItem> : <ListItem>
            <ListItemText>Subtotal + Shipping:</ListItemText>
            <Typography variant='h6'>{items.subtotal.formatted_with_symbol} + 250</Typography>
        </ListItem>}
    </List>
    </>
  )
}

export default Review
