import { React, useState } from "react"
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchedCard from "../SearchedCard/SearchedCard";
import data from "../../data";
import './SearchAndMatch.css';
import Header from "../Header/Header";
const SearchAndMatch = () => {
    const [formValues, setFormValues] = useState({});
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const hanleGoBack = () => {
        navigate(-1);
    }
    const handleSubmit = () => {
        // TODO: שליחת פרטי סינון מועמדים 
        let matched = [];
        let counter = 0;
        data.map((person) => {
            Object.keys(formValues).map((property) => {
                if (person[property] === formValues[property]) {
                    counter = counter + 1;
                }
                if (property === "fromAge" || property === "tillAge") {
                    if (parseInt(person.age) >= parseInt(formValues.fromAge) && parseInt(person.age) <= parseInt(formValues.tillAge)) {
                        counter = counter + 1;
                    }
                }
                if (property === "fromHeight" || property === "tillHeight") {
                    if (parseInt(person.height) >= parseInt(formValues.fromHeight) && parseInt(person.height) <= parseInt(formValues.tillHeight)) {
                        counter = counter + 1;
                    }
                }
            });
            if (counter === Object.keys(formValues).length) {
                matched.push({ ...person })
                setMatches(matched);
            }
            counter = 0;
        });
    }


    return (
        <>
            <Header />
            <div className="searchAndMatchPage">
                <Typography variant="h4" component="div">
                    חיפוש ומציאת התאמות
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextField
                                label="שיוך מגזרי"
                                name="sectoralAssociation"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="מגיל"
                                name="fromAge"
                                type="number"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='עד גיל'
                                name='tillAge'
                                type="number"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='מעמד(עובד/לומד)'
                                name='Status'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='מגובה'
                                name='fromHeight'
                                onChange={handleChange}
                                type="number"
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='עד גובה'
                                name='tillHeight'
                                onChange={handleChange}
                                type='number'
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='מראה כללי'
                                name='generalLook'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='גוון עור'
                                name='skinTone'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='ארץ לידה'
                                name='countryBorn'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='ארץ מוצא מועדף'
                                name='preferedCountry'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='לא ממוצא'
                                name='noOrigin'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='עיר'
                                name='city'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='תכונות אופי'
                                name='characteristics'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='כיסוי ראש'
                                name='headDress'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label='מצב בריאותי'
                                name='healthCondition'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        {/* <Grid container> */}
                        <Grid item>
                            <TextField
                                label='שיטה הלכתית'
                                name='HalachicMethod'
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button id="filter" onClick={handleSubmit} variant="contained">סנן</Button>
                    </Grid>
                </form>
            </div>
            <Grid container>
                {matches && matches.map((person) => <SearchedCard candidate={person} />)}
            </Grid>
        </>
    );
}
export default SearchAndMatch;