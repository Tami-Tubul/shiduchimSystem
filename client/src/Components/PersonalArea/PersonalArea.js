import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import SearchedCard from '../SearchedCard/SearchedCard';
import Header from '../Header/Header';
import './PersonalArea.css';
import { useEffect } from 'react';
import axios from 'axios';
import { loadFavoritedCandidates } from '../../store/matchMaker/matchMakerActions';
import { useState } from 'react';

export default function PersonalArea(props) {

    const userStore = useSelector((state) => state.user);
    const candidates = userStore.candidates;
    const faoritedCandidatesIDs = useSelector((state) => state.matchMaker.faoritedCandidates);

    const faoritedCandidatesList = candidates.filter(cand => {
        return faoritedCandidatesIDs && faoritedCandidatesIDs.includes(cand._id);
    });


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
