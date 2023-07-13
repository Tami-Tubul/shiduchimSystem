import React from 'react';
import './Header.css';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../../assets/logo.png';


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
    const url = window.location.href;
    const isLoggedInPage = url === 'http://localhost:3000/Register' || url === 'http://localhost:3000/login' || url === 'http://localhost:3000/FillQuestionnaire';
    const handleGoBack = () => {
        navigate(-1);
    }
    const handleLogout = () => {
        navigate('/login');
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