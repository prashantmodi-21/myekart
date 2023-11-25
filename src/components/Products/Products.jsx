import React from 'react'
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Product from './Product/Product'
// const products = [{id: 1, title: 'Smartwatch', description: 'A Rugged Smartwatch', price: 2999, image: 'https://cdn.pixabay.com/photo/2016/09/10/21/54/watch-1660232_1280.jpg'},
//  {id: 2, title: 'Headphones', description: 'A Marshal Headphones', price: 8999, image: 'https://cdn.pixabay.com/photo/2018/01/16/10/18/headphones-3085681_1280.jpg'},
//   {id: 3, title: 'Powerbank', description: 'A Xiaomi Powerbank', price: 1499, image: 'https://cdn.pixabay.com/photo/2017/01/20/09/44/xiaomi-1994389_1280.png'},
//   {id: 4, title: 'Kindle', description: 'An Amazon Kindle', price: 4499, image: 'https://cdn.pixabay.com/photo/2016/11/29/06/16/kindle-1867751_1280.jpg'}]
const Products = ({products, addToCart, sortValue, inputValue}) => {
  const sortMenu = ['name', 'created', 'updated', 'price']
  return (
    <Container>
        {products.length > 0 && <><FormControl sx={{width: '160px', marginTop: '1rem'}}><InputLabel id="demo-simple-select-label">Sort By</InputLabel><Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Sort By"
      onChange={(e)=>sortValue(e.target.value)}
    >
      {sortMenu.map((item, i)=>(<MenuItem key={i} value={item}>{item}</MenuItem>))}
    </Select></FormControl></>}
    <Grid container spacing={4} sx={{marginTop: 1}}>
    {products.length > 0 ? products.map((product)=>(
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Product product={product} handleCart={addToCart}/>
      </Grid>
      )) : <Typography variant='h4' sx={{marginTop: 2}}>No Product Available</Typography>}
    </Grid>
    </Container>
  )
}

export default Products
