import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import SearchedCard from '../SearchedCard/SearchedCard';
import Header from '../Header/Header';
import './PersonalArea.css';

export default function PersonalArea(props) {
    const matchMaker = useSelector((state) => state.matchMaker);
    const faoritedCandidatesList = matchMaker.faoritedCandidates;
    console.log(faoritedCandidatesList)
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
