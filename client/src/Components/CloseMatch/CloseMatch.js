import { React, useState } from "react"
import './CloseMatch.css';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Alert, Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { closedMatched } from '../../store/matchMaker/matchMakerActions';
import Header from "../Header/Header";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { Link } from "react-router-dom";
import { removeCandidate } from './../../store/user/userActions';

const CloseMatch = () => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.currentUser.token);

    const candidates = useSelector((state) => state.user.candidates);
    const bachurNames = candidates.filter(cand => cand.gender === "זכר").map(cand => ({ _id: cand._id, name: cand.firstName + " " + cand.lastName }));
    const bachuraNames = candidates.filter(cand => cand.gender === "נקבה").map(cand => ({ _id: cand._id, name: cand.firstName + " " + cand.lastName }));
    const [valBachur, setValBachur] = useState({}) //ערך בשדה השלמה אוטומטית בחור
    const [valBachura, setValBachura] = useState({}) //ערך בשדה השלמה אוטומטית בחורה
    const [formValues, setFormValues] = useState({}); //ערכים בשאר השדות

    const [successCloseShiduchMessage, setSuccessCloseShiduchMessage] = useState(null);
    const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);
  

    const handleChange = (event) => {
        setErrorAfterSubmit(null)
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        const meorasimObj = { ...formValues, bachurId: valBachur._id, bachuraId: valBachura._id, bachurName: valBachur.name, bachuraName: valBachura.name }

        axios.post("http://localhost:5000/api/shiduchim/matchmaker/closing-match", meorasimObj, {
            headers: { 'x-access-token': token }
        }).then(resp => {
            if (resp.status === 201) {
                
                dispatch(closedMatched(meorasimObj))   //עדכון טבלת מאורסים ברידקס
                dispatch(removeCandidate(meorasimObj.bachurId))//מחיקת בחור מטבלת מועמדים
                dispatch(removeCandidate(meorasimObj.bachuraId))//מחיקת בחורה מטבלת מועמדים

                setSuccessCloseShiduchMessage(`${resp.data.message1}. ${resp.data.message2}. ${resp.data.message3}.`);
                
            }
        }).catch(err => {
            setErrorAfterSubmit(err.response.data.message)
        })
    };

    return (
        <>
            <Header />
            <div id="CloseRegister">
                <Card variant="outlined">
                    <Typography variant="h4" component="div">סגירת שידוך</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Autocomplete
                                    onChange={(event, value) => setValBachur(value)}
                                    disablePortal
                                    name="bachurName"
                                    id="combo-box-bachurNames"
                                    options={bachurNames}
                                    getOptionLabel={(option) => option.name}
                                    sx={{ marginTop: 2, width: 250 }}
                                    renderInput={(params) => <TextField {...params} label=" שם החתן" required />}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="שם האב"
                                    name="bachurFather"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="ישיבה"
                                    name="bachurYeshiva"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="אזור מגורים"
                                    name="bachurCity"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Autocomplete
                                    onChange={(event, value) => setValBachura(value)}
                                    disablePortal
                                    name="bachuraName"
                                    id="combo-box-bachuraNames"
                                    options={bachuraNames}
                                    getOptionLabel={(option) => option.name}
                                    sx={{ marginTop: 2, width: 250 }}
                                    renderInput={(params) => <TextField {...params} label="שם הכלה" required />}

                                />

                            </Grid>
                            <Grid item>
                                <TextField
                                    label="שם האב"
                                    name="bachuraFather"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name='bachuraSeminar'
                                    label='סמינר'
                                    onChange={handleChange}
                                    type='text'
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="אזור מגורים"
                                    name="bachuraCity"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5}>
                            <Grid item>
                                <TextField
                                    label="תאריך סגירת שידוך"
                                    type="date"
                                    name="dateWort"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained">שליחה</Button>
                        {errorAfterSubmit && <Alert severity="error">{errorAfterSubmit}</Alert>}
                    </form>
                    {successCloseShiduchMessage && <Alert severity="success" >
                        {successCloseShiduchMessage}
                        <Link to="/CloseEngagedPage">לצפייה בכרטיסי שידוכים</Link>
                    </Alert>}
                </Card>
            </div>
        </>
    );
};

export default CloseMatch;
