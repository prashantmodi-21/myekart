import { Grid, TextField} from '@mui/material';
import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
const CustomTextField = ({name, label}) => {
    const {control} = useFormContext()
  return (
    <Grid item xs={12} sm={6}>
    <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} label={label} required/>}
    />
    </Grid>
  )
}

export default CustomTextField
