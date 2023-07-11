import { React, useState } from "react"
import axios from "axios";
import './Register.css';
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import { Alert, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Header from '../Header/Header';

const Register = () => {
    const [formValues, setFormValues] = useState({
        lastName: '',
        email: '',
        firstName: '',
    });
    const [formErrors, setFormErrors] = useState({});
    // const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(null);
    const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);
  

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };
    const handleChange = (event) => {
        setErrorAfterSubmit(null)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { name, value } = event.target;
        if (name === "firstName" && !/^[\u0590-\u05FF]+$/.test(value.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name can only contain hebrew letters' });
        } else if (name === "lastName" && !/^[\u0590-\u05FF]+$/.test(value.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name can only contain hebrew letters' });
        }
        else if (name === "email" && !emailRegex.test(value.trim())) {
            setFormErrors({ ...formErrors, email: 'Invalid Email format' });
        }
        else {
            switch (name) {
                case "firstName":
                    setFormErrors({ ...formErrors, firstName: "" });
                    break;
                case "lastName":
                    setFormErrors({ ...formErrors, lastName: "" });
                    break;
                case "email":
                    setFormErrors({ ...formErrors, email: "" });
                    break;
                default:
                    setFormErrors({});
            }
        }
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (!errors) {

            //אחרי הרשמה צריך לעשות דיספטש למערך שדכנים חדשים
            // Handle form submission
            axios.post("http://localhost:5000/api/shiduchim/public/register-matchmaker", {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                age: formValues.age,
                phone: formValues.phone,
                livingPlace: formValues.livingPlace
            })
                .then(resp => {
                    if (resp.status === 201) {
                        setSuccessRegistrationMessage(resp.data.message);
                    }
                })
                .catch(err => {
                    setErrorAfterSubmit(err.response.data.message)
                })
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = () => {

        // Validate firstName field
        if (!(formValues.firstName && formValues.firstName.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name is required' });
        }
        else if (!/^[\u0590-\u05FF]+$/.test(formValues.firstName.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name can only contain hebrew letters' });
        }
        // Validate lastName field
        if (!(formValues.lastName && formValues.lastName.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name is required' });
        }
        else if (!/^[\u0590-\u05FF]+$/.test(formValues.lastName.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name can only contain hebrew letters' });
        }

        // Validate email field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(formValues.email && formValues.email.trim())) {
            setFormErrors({ ...formErrors, email: 'Email is required' });
        } else if (!emailRegex.test(formValues.email.trim())) {
            setFormErrors({ ...formErrors, email: 'Invalid email format' });
        }

        return (!!formErrors.firstName || !!formErrors.email || !!formErrors.lastName || !checked) || !(formValues.firstName !== "" && formValues.email !== "" && formValues.lastName !== "");
    };
    const validation = (!!formErrors.firstName || !!formErrors.email || !!formErrors.lastName || !checked) || !(formValues.firstName !== "" && formValues.email !== "" && formValues.lastName !== "");
    return (
        <>
            <Header />
            <div id="Register">
                <Card variant="outlined">
                    <Typography variant="h4" component="div">
                        הרשמה
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    required
                                    label="שם פרטי"
                                    name="firstName"
                                    onChange={handleChange}
                                    error={formErrors.firstName}
                                    helperText={formErrors.firstName}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    required
                                    label="שם משפחה"
                                    name="lastName"
                                    onChange={handleChange}
                                    error={formErrors.lastName}
                                    helperText={formErrors.lastName}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    label="גיל"
                                    type="number"
                                    name="age"
                                    onChange={handleChange}
                                    error={formErrors.age}
                                    helperText={formErrors.age}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    required
                                    label="מייל"
                                    name="email"
                                    onChange={handleChange}
                                    error={formErrors.email}
                                    helperText={formErrors.email}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    label="אזור מגורים"
                                    name="livingPlace"
                                    onChange={handleChange}
                                    error={formErrors.livingPlace}
                                    helperText={formErrors.livingPlace}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                   
                        <Grid container className="container">
                            <Grid item>
                                <TextField
                                    name='phone'
                                    label='טלפון'
                                    onChange={handleChange}
                                    error={Boolean(formErrors.phone)}
                                    helperText={formErrors.phone}
                                    required
                                    type='text'
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container className="container">
                            <Grid item>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleCheck}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <span>הנני מתחייבת לעמוד בתקנון השדכניות ומתחייבת
                                    שלא להשתמש בנתונים שלא לצורך השידוכים</span>
                            </Grid>
                        </Grid>
                        {/* <button type="submit">Submit</button> */}
                        <Button type="submit" disabled={validation} variant="contained">הרשמה</Button>
                        {errorAfterSubmit && <Alert severity="error">{errorAfterSubmit}</Alert>}

                    </form>
                    {successRegistrationMessage && <Alert severity="success" >
                    {successRegistrationMessage}
                    <Link to="/CloseEngagedPage">לצפייה בכרטיסי שידוכים</Link>
                </Alert>}
                </Card>
              
            </div>
        </>
    );
};

export default Register;
