import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import rings2 from '../../assets/rings2.jpg';
import './ManagerPage.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadCandidates } from '../../store/user/userActions';

function ManagerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const handleClickMangedUsers = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckingNewMatchmakers = (e) => {
    navigate('/CheckingNews?eventType=newMatchmakers');
  }
  const handleCheckingNewCandidates = (e) => {
    navigate('/CheckingNews?eventType=newCandidates');
  }
  const handleCheckingUnRelevantMatchmakers = (e) => {
    navigate('/CheckingNews?eventType=unrelevantCandidates');
  }

  const handleClick = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "matchMakingClosed":
        navigate('/CloseEngagedPage');
        break;
      case "statistics":
        navigate('/StatisicsClosedMatchMakked');
        break;
      case "mangedUsers":
        navigate('/MangedUsers');
        break;
      case "showMessages":
        navigate('/ShowMessages');
        break;
        case "SearchAndMatch":
          navigate('/SearchAndMatch');
          break;
      default:
        navigate('/login');
    }

  }

  
  //שליפת מועמדים מהשרת 
  useEffect(() => {
    const getCandidatesFromServer = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/api/shiduchim/${currentUser.role}/candidates-cards`, {
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


  return (
    <div id="app">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <div className='actions'>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="matchMakingClosed">שידוכים שנסגרו</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="statistics">סטטיסטיקות שידוכים</Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleClickMangedUsers}
                name="mangedUsers"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}>
                ניהול משתמשים
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem name="checkingUnrelevantMatchmakers" onClick={handleCheckingUnRelevantMatchmakers}>בדיקת מועמדים לא רלוונטיים</MenuItem>
                <MenuItem name="checkingNewCandidates" onClick={handleCheckingNewMatchmakers}>בדיקת שדכנים חדשים</MenuItem>
                <MenuItem name="checkingNewMatchmakers" onClick={handleCheckingNewCandidates}>בדיקת מועמדים חדשים</MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="SearchAndMatch">צפיה בכרטיסי משתמשים</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="showMessages">צפיה בהודעות</Button>
            </Grid>
          </Grid>
        </div>
        <ImageSrc style={{ backgroundImage: `url(${rings2})` }} />
      </Box>
    </div>
  );
}

export default ManagerPage;