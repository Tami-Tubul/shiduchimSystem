import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

export default function InLaws(props) {
  const handleChangeInput = (e) => {
    props.handleChange(e);
  }
  return (
    <div className='addContainer'>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="שם"
            name="fatherInLawName"
            defaultValue={(props && props.data && props.back && props.data.fatherInLawName) ? props.data.fatherInLawName : ""}
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item>
          <TextField
            label="טלפון"
            name="fatherInLawPhone"
            defaultValue={(props && props.data && props.back && props.data.fatherInLawPhone) ? props.data.fatherInLawPhone : ""}
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item>
          <TextField
            label="עיר"
            name="fatherInLawCity"
            defaultValue={(props && props.data && props.back && props.data.fatherInLawCity) ? props.data.fatherInLawCity : ""}
            onChange={handleChangeInput}
          />
        </Grid>
      </Grid>
    </div>
  )
}