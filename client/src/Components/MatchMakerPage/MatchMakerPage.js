import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import rings2 from '../../assets/rings2.jpg';
import './MatchMakerPage.css';
import SendEmail from '../SendMail/SendMail';
import { loadCandidates, userLogin } from '../../store/user/userActions';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../../authService';
import toast from 'toast-me';
import { loadFavoritedCandidates } from '../../store/matchMaker/matchMakerActions';

function MatchMakerPage() {

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [showSendMessagemodal, setShowSendMessageModal] = useState(false);
  // הודעה לבדיקת מועמדים לא רלוונטיים
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => {
    setShowModal(!showModal);
  }
  const handleOpenUnRellevantCandidate = () => {
    navigate('/PersonalArea');
  }


  useEffect(() => {

    //בדיקה האם זה כניסה ראשונית לדף
    const isFirstEnter = window.sessionStorage.getItem("firstEnter");
    if (!isFirstEnter) {
      window.sessionStorage.setItem("firstEnter", true);
      setShowModal(true);
    }
    else {
      setShowModal(false)
    }

    //שליפת מועמדים מהשרת 
    const getCandidatesFromServer = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/api/shiduchim/matchmaker/candidates-cards`, {
          headers: { 'x-access-token': currentUser.token }
        });
        const allCandidates = resp.data.candidates;
        const aproveCandidates = allCandidates.filter(cand => cand.isApproved === true);
        dispatch(loadCandidates(aproveCandidates));
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    }
    getCandidatesFromServer();

  }, [dispatch])

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


  const handleLogout = async () => {
    try {
      let resp = await axios.post("http://localhost:5000/api/shiduchim/auth/logout");
      if (resp.status === 200) {
        sessionStorage.clear();
        dispatch(userLogin(authService.getUser())); //איפוס יוזר מחובר
        dispatch(loadFavoritedCandidates([])); //איפוס אזור אישי של שדכן מחובר
        toast(resp.data.message, { duration: 5000 });
        navigate('/');
      }

    } catch (error) {
      console.error('Error retrieving messages:', error);
    }

  }

  return (
    <>
      <div className='header' style={{ backgroundImage: `url(${logo})` }}  >
        <Button variant="contained" onClick={handleLogout}>
          <LogoutIcon />
          יציאה
        </Button>
      </div>
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
        <SendEmail show={showSendMessagemodal} handleClose={setShowSendMessageModal} />
      </div>
      {showModal && <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          האם ידוע/ה לך על מועמדים לא רלוונטים?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>לא ידוע לי</Button>
          <Button onClick={handleOpenUnRellevantCandidate} autoFocus>
            כן, אני רוצה לעדכן
          </Button>
        </DialogActions>
      </Dialog>
      }
    </>

  );
}

export default MatchMakerPage;
