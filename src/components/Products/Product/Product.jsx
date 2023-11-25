import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react'

const Product = ({product, handleCart}) => {
  
  return (
    <Card variant='outlined'>
      <CardMedia
        image={product.image.url}
        alt={product.title}
        sx={{height: '200px'}}
      />
      <CardContent>
        <Typography variant='h4'>{product.name}</Typography>
        <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' component='p'/>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h5'>₹ {product.price.formatted}</Typography>
        <IconButton aria-label='add to cart' onClick={()=>handleCart(product.id, 1)}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
