import React from 'react';
import './Header.css';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../../assets/logo.png';
import axios from 'axios';
import toast from 'toast-me';
import { userLogin } from '../../store/user/userActions';
import authService from './../../authService';
import { useDispatch } from 'react-redux';


const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundRepeat: 'no-repeat'
});

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const url = window.location.href;
    const isLoggedInPage = url === 'http://localhost:3000/Register' || url === 'http://localhost:3000/login' || url === 'http://localhost:3000/FillQuestionnaire';
    const handleGoBack = () => {
       if(isLoggedInPage){ //ינווט לדף הבית מעמודי הרשמה,התחברות ושאלון מועמד
        navigate("/");
       }
       else{
        navigate(-1);
       }
    }
    const handleLogout = async () => {
        try {
            let resp = await axios.post("http://localhost:5000/api/shiduchim/auth/logout");
            if (resp.status === 200) {
                sessionStorage.clear();
                dispatch(userLogin(authService.getUser()));
                toast(resp.data.message, { duration: 5000 });
                navigate('/login');
            }

        } catch (error) {
            console.error('Error retrieving messages:', error);
        }

    }
    const handleBackToHomePage = () => {
        navigate('/ManagerPage');
        // navigate('/MatchMakerPage');
    }

    return (
        <>
            <div className='header' style={{ backgroundImage: `url(${logo})` }} >
                <div className="actionsButtons">
                    <Grid container spacing={2}>
                        {!isLoggedInPage && <Grid item>
                            <Button variant="contained" onClick={handleLogout}>
                                <LogoutIcon />
                                יציאה
                            </Button>
                        </Grid>}
                        <Grid item>
                            <Button variant="contained" onClick={handleGoBack}>
                                חזרה
                                <ArrowBackIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            {/* <ImageSrc style={{ backgroundImage: `url(${logo})` }} /> */}
        </>
    );
};

export default Header;