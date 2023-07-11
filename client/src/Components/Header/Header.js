import React from 'react';
import './Header.css';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
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

    const handleGoBack = () => {
        navigate(-1);
    }
    const handleLogout = () => {
        navigate('/');
    }
    const handleBackToHomePage = () => {
        navigate('/ManagerPage');
// navigate('/MatchMakerPage');
    }

    return (
        <>
            <div className='header' style={{ backgroundImage: `url(${logo})` }} onClick={handleBackToHomePage}>
                <div className="actionsButtons">
                    <IconButton onClick={handleLogout}>
                        יציאה
                        <LogoutIcon />
                    </IconButton>
                    <IconButton onClick={handleGoBack}>
                        חזרה
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </div>
            {/* <ImageSrc style={{ backgroundImage: `url(${logo})` }} /> */}
        </>
    );
};

export default Header;