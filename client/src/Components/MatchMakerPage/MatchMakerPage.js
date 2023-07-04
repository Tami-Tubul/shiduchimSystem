import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import rings2 from '../../assets/rings2.jpg';
import './MatchMakerPage.css';
import SendEmail from '../SendMail/SendMail';

function MatchMakerPage() {
  const navigate = useNavigate();
  const [showSendMessagemodal, setShowSendMessageModal] = useState(false);
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });


  const handleClick = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "matchMakingClosed":
        navigate('/CloseEngagedPage');
        break;
      case "personalArea":
        navigate('/PersonalArea');
        break;
      case "ClosedMatched":
        navigate('/CloseMatch');
        break;
      case "sendMessages":
        // navigate('/SendEmail');
        setShowSendMessageModal(true);
        break;
        case "showMessages":
        navigate('/SearchAndMatch');
        break;
      default:
        navigate('/login');
    }
  }

  return (
    <div id="app">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <div className='actions'>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="matchMakingClosed">שידוכים שנסגרו</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="personalArea">אזור אישי</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="ClosedMatched">הודעת סגירת שידוך</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="sendMessages">שליחת הודעה למנהל</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="showMessages">צפיה בכטיסי משתמשים</Button>
            </Grid>
          </Grid>
        </div>
        <ImageSrc style={{ backgroundImage: `url(${rings2})` }} />
      </Box>
      <SendEmail show={showSendMessagemodal} handleClose={setShowSendMessageModal}/>
    </div>
  );
}

export default MatchMakerPage;
