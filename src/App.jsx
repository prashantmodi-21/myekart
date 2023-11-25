import './App.css'
import { Cart, Navbar, Products } from './components/index'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import {commerce} from './lib/Commerce'
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './components/Checkout/Checkout'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [sortQuery, setSortQuery] = useState()
  const fetchProducts = async()=>{
    if(sortQuery){
      const {data} = await commerce.products.list({sortBy: sortQuery})
      setProducts(data)
      console.log(sortQuery)
    }else{
      const {data} = await commerce.products.list()
      setProducts(data)
    }
  }

  const fetchCart = async() =>{
    setCart(await commerce.cart.retrieve())
  }

  const addToCart = async(productId, quantity)=>{
    const cart = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const resetCart = async() =>{
    console.log('Empty Cart')
    setCart(await commerce.cart.empty())
  }
  
  const removeItem = async(itemId) =>{
    setCart(await commerce.cart.remove(itemId))
  }

  const updateCart = async(itemId, quantity)=>{
    if(quantity === 0){
      setCart(await commerce.cart.remove(itemId))
    }else{
      setCart(await commerce.cart.update(itemId, {quantity}))
    }
  }

  const refreshCart = async() =>{
    setCart(await commerce.cart.refresh())
  }

  const handleCheckout = async(refId, orderInfo)=>{
    try {
      const newOrder = await commerce.checkout.capture(refId, orderInfo)
      setOrder(newOrder)
      refreshCart()
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  const chgSort = (value)=>{
    setSortQuery(value)
  }
  useEffect(()=>{
    fetchProducts()
    fetchCart()
  }, [sortQuery])
  return (
    <>
    <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <CssBaseline/>
        <Navbar items={cart.total_items}/>
      <Routes>
        <Route path='/' element={<Products products={products} addToCart={addToCart} sortValue={chgSort}/>}/>
        <Route path='/cart' element={<Cart cart={cart} resetCart={resetCart} removeItem={removeItem} updateCart={updateCart}/>}/>
        <Route path='/checkout' element={<Checkout cart={cart} onCheckout={handleCheckout} order={order} errorMsg={errorMsg}/>}/>
      </Routes>
    </StyledEngineProvider>
    </BrowserRouter>
    </>
  )
}

export default App
