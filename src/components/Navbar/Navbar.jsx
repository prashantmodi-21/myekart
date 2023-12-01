import React from 'react'
import {AppBar, Toolbar, Typography, Badge, IconButton} from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.css'
import { Link } from 'react-router-dom';
const Navbar = ({items}) => {
  return (
    <AppBar position='static'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h6'  className='logo' component={Link} to='/'><LocalMallIcon sx={{marginRight: 1}}/>MyEkart</Typography>
            <IconButton aria-label='cart' component={Link} to='/cart'>
              <Badge badgeContent={items} color='secondary'>
                  <ShoppingCartIcon/>
              </Badge>
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
