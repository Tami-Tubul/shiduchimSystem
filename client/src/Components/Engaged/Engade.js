import React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Engaged.css';
import { convertDateToHebrew } from '../../reusableCode/formateDate';

const Engaged = ({ closedRegister }) => {


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
                        <Grid container className='bottom-grid'>
                            <p style={{ fontSize: "larger", fontWeight: 800, color: "#c87009" }}>מאורסים</p>
                            <p>אור ל{convertDateToHebrew(closedRegister.dateWort)}</p>
                        </Grid>
                    </div>
                </Typography>
            </CardContent>
        </Card >
    );
};

export default Engaged;

