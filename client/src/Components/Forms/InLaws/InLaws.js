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
            defaultValue=""
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item>
          <TextField
            label="טלפון"
            name="fatherInLawPhone"
            defaultValue=""
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item>
          <TextField
            label="עיר"
            name="fatherInLawCity"
            defaultValue=""
            onChange={handleChangeInput}
          />
        </Grid>
      </Grid>
    </div>
  )
}