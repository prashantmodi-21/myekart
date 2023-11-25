import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, FormControl, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import TextInput from './CustomTextField'
import { commerce } from '../../../lib/Commerce';
import { Link } from 'react-router-dom';
const CheckoutForm = ({token, user}) => {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [states, setStates] = useState([])
    const [state, setState] = useState('')
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')
    const methods = useForm()
    const onSubmit = data => user({...data, country, state, option});
    const fetchCountries = async()=>{
      const {countries} = await commerce.services.localeListShippingCountries(token.id)
     setCountries(countries)
      const [id, value] = Object.entries(countries)[0]
      setCountry(id)
    }
    const fetchState = async(country)=>{
      const {subdivisions} = await commerce.services.localeListSubdivisions(country)
      setStates(subdivisions)
      const [id, value] = Object.entries(subdivisions)[0]
      setState(id)
    }
    const fetchShipping = async(tokenId, country, region) =>{
      const response = await commerce.checkout.getShippingOptions(tokenId, {
        country: country,
        region: region,
      })
      setOptions(response)
      setOption(response[0].id)
    }
    useEffect(()=>{
      fetchCountries()
    }, [])
    useEffect(()=>{
      if(country) fetchState(country)
    }, [country])
    useEffect(()=>{
      if(state) fetchShipping(token.id, country, state)
    }, [state])
  
  return (
    <div style={{width: '400px', marginTop: '1rem'}}>
      <FormProvider {...methods}>
      {!option ? <CircularProgress/> : <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <TextInput type="text" name='fname' label="First Name" />
        <TextInput type="text" name='lname' label="Last Name" />
        <TextInput type="email" name='email' label="Email" />
        <TextInput type="tel" name='mobile' label="Mobile" />
        <TextInput type="text" name='address' label="Address" />
        <TextInput type="text" name='city' label="City" />
        <TextInput type="text" name='pincode' label="Pincode" />
       <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
          label="Country"
        >
          {Object.entries(countries).map(([code, name])=> ({id: code, label: name})).map((item)=>(
            <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
       </Grid>
       <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          onChange={(e)=>setState(e.target.value)}
          label="State"
        >
          {Object.entries(states).map(([code, name])=> ({id: code, label: name})).map((item)=>(
            <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
       </Grid>
       <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Shipping</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          onChange={(e)=>setOption(e.target.value)}
          label="Shipping"
        >
          {options.map((option)=> (
            <MenuItem key={option.id} value={option.id}>{`${option.description} - ${option.price.formatted_with_symbol}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
       </Grid>
      </Grid>
      <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'space-between'}}>
        <Button component={Link} to='/cart' variant='contained' color='error' sx={{marginRight: '1rem'}}>Back to Cart</Button>
        <Button type="submit" variant='contained' >Submit</Button>
      </div>
    </form>}
    </FormProvider>
    </div>
  )
}

export default CheckoutForm
