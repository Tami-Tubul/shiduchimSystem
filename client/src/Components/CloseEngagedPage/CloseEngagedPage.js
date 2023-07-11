import { useSelector } from 'react-redux';
import { Card, Grid } from '@mui/material';
import Engaged from '../Engaged/Engade';
import Header from '../Header/Header';
import './CloseEngagedPage.css';


const CloseEngagedPage = () => {
    const data = useSelector((state) => state.matchMaker);

    return (
        <>
            <Header />
            <div className='closeEngagedPage'>
                <Grid container spacing={3}>
                    {data && Array.isArray(data.closedRegisters) && data.closedRegisters.map((closedRegister) => {
                        return (<Grid item key={closedRegister._id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <Engaged closedRegister={closedRegister} />
                            </Card>
                        </Grid>);
                    })}
                </Grid>
            </div>
        </>
    );
};

export default CloseEngagedPage;