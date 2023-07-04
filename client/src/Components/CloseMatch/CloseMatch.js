import { React, useState } from "react"
import './CloseMatch.css';
import FileUpload from 'react-material-file-upload';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import {closedMatched} from '../../store/matchMaker/matchMakerActions';
import Header from "../Header/Header";

const CloseMatch = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.matchMaker);

    const [formValues, setFormValues] = useState({});
    const [files, setFiles] = useState([]);;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(files)
        console.log(formValues);
        if (!data.closedRegisters) {
            dispatch(closedMatched([{ ...formValues, Images: files }]));
        } else {
            const newMatch = { ...formValues, Images: files };
            const closedRegisterList = data.closedRegisters;
            closedRegisterList.push({...newMatch});
            dispatch(closedMatched(closedRegisterList));
            // TODO: שליחת פרטים טופס סגירת שידוך
        }
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
                            <TextField
                                label="שם החתן"
                                name="bachurName"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="שם האב"
                                name="bachurFather"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="גיל"
                                name="ageChatan"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="ישיבה"
                                name="bachurYeshiva"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="אזור מגורים"
                                name="bachurCity"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container spacing={2}>
                        <Grid item>
                            <TextField
                                label="שם הכלה"
                                name="bachuraName"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="שם האב"
                                name="bachuraFather"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="גיל"
                                name="ageCala"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name='bachuraSeminar'
                                label='סמינר'
                                onChange={handleChange}
                                type='text'
                                margin="normal"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="אזור מגורים"
                                name="bachuraCity"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item>
                            <TextField
                                label="תאריך סגירת שידוך"
                                name="dateWort"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                            />
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs} onChange={handleChange}>
                                <DatePicker />
                            </LocalizationProvider> */}
                        </Grid>
                        <Grid item>
                            {/* <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                    name="image"
                                    onChange={handleChange}
                                />
                            </Button> */}
                            <FileUpload value={files} onChange={setFiles} />;
                        </Grid>
                    </Grid>
                    {/* <input
                            accept="image/*"
                            // className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span">
                                Upload
                            </Button>
                        </label> */}
                    {/* <button type="submit">Submit</button> */}
                    <Button type="submit" variant="contained">שליחה</Button>
                </form>
            </Card>
        </div>
        </>
    );
};

export default CloseMatch;
