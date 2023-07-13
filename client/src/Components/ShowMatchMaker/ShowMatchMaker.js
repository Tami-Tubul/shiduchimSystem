import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ShowCandidate.css';

export default function ShowMatchMaker(props) {
    const { matchMaker } = props;
 
    return (
                <Card sx={{ maxWidth: 345, margin: 2, minWidth: 200, maxWidth: 500 }}>
                    <CardContent>
                        <Grid container columns={{ md: 12 }}>                           
                            {matchMaker.city && <Grid item xs={2} sm={4} md={4}>
                                <Typography>עיר:</Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {matchMaker.city}
                                </Typography>
                            </Grid>}
                            {matchMaker.phone && <Grid item xs={2} sm={4} md={4}>
                                <Typography>טלפון:</Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {matchMaker.phone}
                                </Typography>
                            </Grid>}
                            {matchMaker.email && <Grid item xs={2} sm={4} md={4}>
                                <Typography>מייל:</Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {matchMaker.email}
                                </Typography>
                            </Grid>}
                        </Grid>
                    </CardContent>
                </Card >
    );
}