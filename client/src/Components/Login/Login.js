import { React, useState } from "react"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import { Alert, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { userLogin } from '../../store/user/userActions';
import './Login.css';
import Header from "../Header/Header";
import authService from './../../authService';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };


  const handleChange = (event) => {
    setErrorAfterSubmit(null);
    const { name, value } = event.target;
    if (name === "userName" && !/^[a-zA-Z0-9]+$/.test(value.trim())) {
      setFormErrors({ ...formErrors, userName: 'userName can only contain letters and numbers' });
    }
    else if (name === "password" && value.trim().length < 8) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
    }
    else {
      switch (name) {
        case "userName":
          setFormErrors({ ...formErrors, userName: "" });
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
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (!errors) {

      //Handle form submission
      axios.post("http://localhost:5000/api/shiduchim/auth/login", {

        userName: formValues.userName,
        password: formValues.password

      }).then(resp => {

        if (resp.status === 200) {

          let connectedUser = { ...resp.data.connectedUser, token: resp.data.token }
          authService.saveUser(connectedUser);

          dispatch(userLogin(connectedUser));

          if (connectedUser.role === "matchmaker") {
            navigate("/MatchMakerPage")
          }
          else if (connectedUser.role === "manager") {
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

    // Validate userName field
    if (!(formValues.userName && formValues.userName.trim())) {
      setFormErrors({ ...formErrors, userName: 'User Name is required' });
    }
    else if (!/^[a-zA-Z0-9]+$/.test(formValues.userName.trim())) {
      setFormErrors({ ...formErrors, userName: 'User Name can only contain letters and numbers' });
    }

    // Validate password field
    if (!(formValues.password && formValues.password.trim())) {
      setFormErrors({ ...formErrors, password: 'Password is required' });

    } else if (formValues.password.trim().length < 8) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 8 characters long' });
    }
    return (!!formErrors.userName || !!formErrors.password || !checked) || !(formValues.userName !== "" && formValues.password !== "");
  };
  const validation = (!!formErrors.userName || !!formErrors.password || !checked) || !(formValues.userName !== "" && formValues.password !== "");

  return (
    <>
      <Header />
      <div id="login">
        <Card variant="outlined">
          <Typography variant="h4" component="div">
            כניסה
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container className="container">
              <Grid item>
                <TextField
                  label="שם משתמש"
                  name="userName"
                  onChange={handleChange}
                  error={Boolean(formErrors.userName)}
                  helperText={formErrors.userName}
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
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
