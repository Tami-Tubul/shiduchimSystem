import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import SearchedCard from '../SearchedCard/SearchedCard';
import Header from '../Header/Header';
import './PersonalArea.css';
import { useEffect } from 'react';
import axios from 'axios';
import { loadFavoritedCandidates } from '../../store/matchMaker/matchMakerActions';

export default function PersonalArea(props) {

    const userStore = useSelector((state) => state.user);
    const candidates = userStore.candidates;
    const faoritedCandidatesIDs = useSelector((state) => state.matchMaker.faoritedCandidates);


    const faoritedCandidatesList = candidates.filter(cand => {
       return faoritedCandidatesIDs.map(favorite => favorite === cand._id)
    })

    const dispatch = useDispatch();

    useEffect(() => {
        const getFavoritedCandidatesFromServer = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/shiduchim/matchmaker/cart", {
                    headers: { 'x-access-token': userStore.currentUser.token }
                });
                const data = resp.data;
                const candidatesIDs = data.candidatesOnCart
                dispatch(loadFavoritedCandidates(candidatesIDs));
            } catch (error) {
                console.error('Error retrieving messages:', error);
            }
        }
        getFavoritedCandidatesFromServer();
    }, [])

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
