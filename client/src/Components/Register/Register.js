import { React, useState } from "react"
import axios from "axios";
import './Register.css';
import { useSearchParams, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import { Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Header from '../Header/Header';
import { addRegister } from '../../store/user/userActions';


const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [formValues, setFormValues] = useState({
        lastName: '',
        email: '',
        firstName: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const [registerd, setRegisterd] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userType = params.get("userType");

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { name, value } = event.target;
        if (name === "firstName" && !/^[a-zA-Z]+$/.test(value.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name can only contain letters' });
        } else if (name === "lastName" && !/^[a-zA-Z]+$/.test(value.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name can only contain letters' });
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
            if (!user.registers) {
                dispatch(addRegister([{ ...formValues, id: 0 }]));
            } else {
                const newRegister = { ...formValues, id: user.registers.length };
                const registeredList = user.registers;
                registeredList.push({ ...newRegister });
                dispatch(addRegister(registeredList));
            }
            // Handle form submission
            // axios.post("/localhost:27017/shiduchim/login", {
            //     name: formValues.name,
            //     email: formValues.email,
            //     password: formValues.password,
            //     checked: checked
            // })
            //     .then(res => { 
            //         console.log(res);
            //         dispatch(saveUser(res.data));
            //         setRegisterd(true)
            //     })
            //     .catch(err => console.log(err)).navigate('/FillQuestionnaire')
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = () => {

        // Validate firstName field
        if (!(formValues.firstName && formValues.firstName.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name is required' });
        }
        else if (!/^[a-zA-Z]+$/.test(formValues.firstName.trim())) {
            setFormErrors({ ...formErrors, firstName: 'Name can only contain letters' });
        }
        // Validate lastName field
        if (!(formValues.lastName && formValues.lastName.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name is required' });
        }
        else if (!/^[a-zA-Z]+$/.test(formValues.lastName.trim())) {
            setFormErrors({ ...formErrors, lastName: 'Name can only contain letters' });
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
                        {/* {userType === "matchMaker"? 'רישום שדכנית': 'רישום מועמד'} */}
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
                                    name="area"
                                    onChange={handleChange}
                                    error={formErrors.area}
                                    helperText={formErrors.area}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        {/* <FormControl onChange={handleChange} value={formValues.password} sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl> */}
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
                    </form>
                </Card>
                {registerd && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    נרשמת בהצלחה! פרטיך נבדקים במערכת, במידה והתקבלת תקבלי סיסמא למייל. לצפייה בכרטיסי שידוכים
                </Typography>}
            </div>
        </>
    );
};

export default Register;
