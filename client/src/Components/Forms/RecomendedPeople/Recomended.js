import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

export default function Recomended(props) {
    const handleChangeInput = (e) => {
        props.handleChange(e);
    }
    return (
        <div className='addContainer'>
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        label="שם"
                        name="RecommendName"
                        //defaultValue={(props && props.data )? props.data.RecommendName: ""}
                        onChange={handleChangeInput}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="טלפון"
                        name="RecommendPhone"
                        //defaultValue={props && props.data && props.data.RecommendPhone}
                        onChange={handleChangeInput}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="קרבה"
                        name="RecommendRelative"
                        // defaultValue={props && props.data && props.data.RecommendRelative}
                        onChange={handleChangeInput}
                    />
                </Grid>
            </Grid>
        </div>
    )
}