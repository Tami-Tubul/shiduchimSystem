import React from 'react';
import { styled } from '@mui/material/styles';
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
    return (
        <ImageSrc style={{ backgroundImage: `url(${logo})` }} />
    );
};

export default Header;