import { React, useEffect, useState } from "react"
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import { Alert, Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { userLogin } from '../../store/user/userActions';
import './Login.css';
import Header from "../Header/Header";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userType = params.get("user");

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setErrorAfterSubmit(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, value } = event.target;
    if (name === "name" && !/^[a-zA-Z0-9]+$/.test(value.trim())) {
      setFormErrors({ ...formErrors, name: 'Name can only contain letters and numbers' });
    }
    else if (name === "email" && !emailRegex.test(value.trim())) {
      setFormErrors({ ...formErrors, email: 'Invalid Email format' });
    }
    else if (name === "password" && value.trim().length < 8) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
    }
    else {
      switch (name) {
        case "name":
          setFormErrors({ ...formErrors, name: "" });
          break;
        case "email":
          setFormErrors({ ...formErrors, email: "" });
          break;
        case "password":
          setFormErrors({ ...formErrors, password: "" });
          break;
        default:
          setFormErrors({});
      }
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegisterClick = () => {
    navigate('/Register');
    // navigate(`/Register?userType=${userType}`);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (!errors) {
      //Handle form submission
      axios.post("http://localhost:5000/api/shiduchim/auth/login", {
        name: formValues.name,
        email: formValues.email, //אין צורך במייל. בצד שרת מבצע בדיקה רק על שם משתמש וסיסמא
        password: formValues.password
      }).then(resp => {
        if (resp.status === 200) {
          let connectedUser = { ...resp.data.connectedUser, token: resp.data.token }
          dispatch(userLogin(connectedUser));
          if (connectedUser.role === "matchmaker") {
            navigate("/MatchMakerPage")
          }
          else if (connectedUser.role === "admin") {
            navigate("/ManagerPage")
          }
        }
      }).catch(err => {
        setErrorAfterSubmit(err.response.data.message)
      })

    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {

    // Validate name field
    if (!(formValues.name && formValues.name.trim())) {
      setFormErrors({ ...formErrors, name: 'Name is required' });
    }
    else if (!/^[a-zA-Z0-9]+$/.test(formValues.name.trim())) {
      setFormErrors({ ...formErrors, name: 'Name can only contain letters and numbers' });
    }

    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(formValues.email && formValues.email.trim())) {
      setFormErrors({ ...formErrors, email: 'Email is required' });
    } else if (!emailRegex.test(formValues.email.trim())) {
      setFormErrors({ ...formErrors, email: 'Invalid email format' });
    }

    // Validate password field
    if (!(formValues.password && formValues.password.trim())) {
      setFormErrors({ ...formErrors, password: 'Password is required' });

    } else if (formValues.password.trim().length < 8) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
    }
    return (!!formErrors.name || !!formErrors.email || !!formErrors.password || !checked) || !(formValues.name !== "" && formValues.email !== "" && formValues.password !== "");
  };
  const validation = (!!formErrors.name || !!formErrors.email || !!formErrors.password || !checked) || !(formValues.name !== "" && formValues.email !== "" && formValues.password !== "");

  return (
    <>
      <Header />
      <div id="login">
        <Card variant="outlined">
          <Typography variant="h4" component="div">
            {/* {userType && userType === "matchMaker" ? 'כניסת שדכנית' : 'כניסת מועמד/ת'} */}
            כניסה
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container className="container">
              <Grid item>
                <TextField
                  label="שם"
                  name="name"
                  onChange={handleChange}
                  error={formErrors.name}
                  helperText={formErrors.name}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container className="container">
              <Grid item>
                <TextField
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
                  name='password'
                  label='סיסמא'
                  onChange={handleChange}
                  error={Boolean(formErrors.password)}
                  helperText={formErrors.password}
                  required
                  type='password'
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
                <span>המוצר מיועד לשימוש אישי, התמונות לעיניכן
                  בלבד ולא לשימוש גברים או אנשים אחרים
                </span>
              </Grid>
            </Grid>
            {/* <button type="submit">Submit</button> */}
            <Button type="submit" disabled={validation} variant="contained">כניסה</Button>
          </form>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            מעונינת להצטרף למאגר השדכניות?
          </Typography>
          <Button onClick={handleRegisterClick} variant="outlined">להרשמה</Button>

          {errorAfterSubmit && <Alert severity="error">{errorAfterSubmit}</Alert>}

        </Card>
      </div>
    </>
  );
};

export default Login;
