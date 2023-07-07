import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './Engaged.css';

const Engaged = ({ closedRegister }) => {

    //צריך להמיר לתאריך עברי 
    const handleDate = () => {
        const dateSTR = closedRegister.dateWort; 
        const date = new Date(dateSTR);
        const hebrewOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const hebrewDateWort = date.toLocaleDateString('he-IL', hebrewOptions);
        return hebrewDateWort;
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image="/static/media/rings2.4df0e580dcfcac85aee3.jpg"
                alt="Meorasim"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <div className='Grid'>
                        <Grid container spacing={2}>
                            <Grid item>
                                <p style={{ fontSize: "larger", fontWeight: 600 }}>{closedRegister.bachurName}</p>
                                <p>בן הרב <span style={{ fontSize: "large" }}>{closedRegister.bachurFather}</span> שליט"א</p>
                                <p>ישיבת {closedRegister.bachurYeshiva}</p>
                                <p>{closedRegister.bachurCity}</p>
                            </Grid>
                            <Grid item>
                                <p style={{ fontSize: "larger", fontWeight: 600 }}>{closedRegister.bachuraName}</p>
                                <p>בת הרב <span style={{ fontSize: "large" }}>{closedRegister.bachuraFather}</span> שליט"א</p>
                                <p>סמינר {closedRegister.bachuraSeminar}</p>
                                <p>{closedRegister.bachuraCity}</p>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <p style={{ fontSize: "larger", fontWeight: 800, color: "#c87009" }}>מאורסים</p>
                            <p>אור ל{handleDate()}</p>
                        </Grid>
                    </div>
                </Typography>
            </CardContent>
        </Card >
    );
};

export default Engaged;

