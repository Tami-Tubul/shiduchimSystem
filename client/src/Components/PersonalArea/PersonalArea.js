import * as React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import SearchedCard from '../SearchedCard/SearchedCard';
import Header from '../Header/Header';
import './PersonalArea.css';
import { useEffect } from 'react';
import  axios  from 'axios';

export default function PersonalArea(props) {
   
    const token = useSelector((state) => state.user.currentUser.token);

    const matchMaker = useSelector((state) => state.matchMaker);
    const faoritedCandidatesList = matchMaker.faoritedCandidates;
  
    //const dispatch = useDispatch();

   useEffect(() => {
    const getFavoritedCandidatesFromServer = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/api/shiduchim/matchmaker/cart", {
                headers: { 'x-access-token': token }
            });
            const data = resp.data;
            const candidatesID = data.candidatesOnCart //מערך של ID של מועמדים של השדכן
            //const favoritesCandidatesArr = //לחפש לפי ID את המועמדים שלו ולשמור ברידקס
           // dispatch(loadFavoritesCandidates(favoritesCandidatesArr)); //TODO: צריך לכתוב פונקציה ברידקס
        } catch (error) {
            console.error('Error retrieving messages:', error);
        }
    }
    getFavoritedCandidatesFromServer();
   },[token])

    return (
        <>
            <Header />
            <div className='personalArea'>
                <Grid container spacing={2} >
                    {faoritedCandidatesList && faoritedCandidatesList.map((candidate) => {
                        return (
                            <Grid item>
                                <SearchedCard candidate={candidate} />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </>
    );
};
