import React from 'react'
import {Box, Checkbox, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import Product from './Product/Product'
const Products = ({categories, products, addToCart, sortValue, selectValue, selectCategory, selectedCategory, loader}) => {
  const sortMenu = ['name', 'created', 'updated', 'price']
  return (
    loader ? <Box sx={{width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></Box> : <Container>
      <Stack direction='row' justifyContent='space-between'>
        {products?.length > 0 && <><FormControl sx={{width: '160px', marginTop: '1rem'}}><InputLabel id="demo-simple-select-label">Sort By</InputLabel><Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Sort By"
      value={selectValue}
    >
      {sortMenu.map((item, i)=>(<MenuItem key={i} value={item} onClick={()=>sortValue(item)}>{item.slice(0, 1).toUpperCase()+item.substring(1)}</MenuItem>))}
    </Select></FormControl>

    <FormControl sx={{width: '200px', marginTop: '1rem'}}>
      <InputLabel id="demo-multiple-select-label">Category</InputLabel>
      <Select
        labelId="demo-multiple-select-label"
        id="demo-multiple-checkbox"
        label="Category"
        value={selectedCategory}
      >{categories?.length > 0 && categories.map((category)=>(<MenuItem key={category.id} value={category.slug}><Checkbox checked={selectedCategory.includes(category.slug)} disabled={selectedCategory.length < 1 || selectedCategory.includes(category.slug) ? false : true} onClick={()=>selectCategory(category.slug)}/>{category.name}</MenuItem>))}
      </Select>
    </FormControl></>}
    </Stack>
    <Grid container spacing={4} sx={{marginTop: 1}}>
    {products?.length > 0 ? products.map((product)=>(
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Product product={product} handleCart={addToCart}/>
      </Grid>
      )) : <Typography variant='h4' sx={{margin: '1rem'}}>Products Not Available</Typography>}
    </Grid>
    </Container>
  )
}

export default Products
