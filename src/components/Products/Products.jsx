import React from 'react'
import { Box, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, Typography } from '@mui/material'
import Product from './Product/Product'
const Products = ({categories, products, addToCart, sortValue, selectValue, selectCategory, selectedCategory}) => {
  const sortMenu = ['name', 'created', 'updated', 'price']
  return (
    <Container>
      <Stack direction='row' justifyContent='space-between'>
        {products?.length > 0 && <><FormControl sx={{width: '160px', marginTop: '1rem'}}><InputLabel id="demo-simple-select-label">Sort By</InputLabel><Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Sort By"
      onChange={(e)=>sortValue(e.target.value)}
      value={selectValue}
    >
      {sortMenu.map((item, i)=>(<MenuItem key={i} value={item}>{item}</MenuItem>))}
    </Select></FormControl>

    <FormControl sx={{width: '160px', marginTop: '1rem'}}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Category"
      >{categories.map((category)=>(<MenuItem key={category.id} onClick={()=>selectCategory(category.slug)}><Checkbox checked={selectedCategory.includes(category.slug)}/><ListItemText primary={category.name}/></MenuItem>))}
      </Select>
    </FormControl></>}
    </Stack>
    <Grid container spacing={4} sx={{marginTop: 1}}>
    {products?.length > 0 ? products.map((product)=>(
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Product product={product} handleCart={addToCart}/>
      </Grid>
      )) : <Typography variant='h4' sx={{marginTop: 2}}>No Product Available</Typography>}
    </Grid>
    </Container>
  )
}

export default Products
