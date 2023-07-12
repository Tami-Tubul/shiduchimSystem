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
                        name="recommendName"
                        defaultValue={(props && props.data && props.back && props.data.recommendName) ? props.data.recommendName : ""}
                        onChange={handleChangeInput}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="טלפון"
                        name="recommendPhone"
                        defaultValue={(props && props.data && props.back && props.data.recommendPhone)? props.data.recommendPhone : ""}
                        onChange={handleChangeInput}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="קרבה"
                        name="recommendRelative"
                        defaultValue={(props && props.data && props.back && props.data.recommendRelative) ?  props.data.recommendRelative: ""}
                        onChange={handleChangeInput}
                    />
                </Grid>
            </Grid>
        </div>
    )
}