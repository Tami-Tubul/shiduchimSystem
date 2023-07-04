import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Container } from '@mui/material';
import Card from '@mui/material/Card/Card';
import Header from '../Header/Header';
import './StatisicsClosedMatchMakked.css';
const data = [
    { argument: 'תשרי', value: 1 },
    { argument: 'חשוון', value: 12 },
    { argument: 'כסלו', value: 3 },
    { argument: 'טבת', value: 5 },
    { argument: 'שבט', value: 0 },
    { argument: 'אדר', value: 1 },
    { argument: 'ניסן', value: 8 },
    { argument: 'איר', value: 5 },
    { argument: 'סיוון', value: 7 },
    { argument: 'תמוז', value: 9 },
    { argument: 'אב', value: 10 },
    { argument: 'אלול', value: 8 }
];
// TODO: לקבל את כל השידוכים שנעשו החודש ולהציג אותם

export const StatisicsClosedMatchMakked = () => (
    <>
        <Header />
        <div className='StatisicsClosedMatchMakked'>
                <Container>
                    <h4>סטטיסטיקות שידוכים</h4>
                    <Paper>
                        <Chart
                            data={data}
                        >
                            <ArgumentAxis />
                            <ValueAxis />

                            <LineSeries valueField="value" argumentField="argument" />
                        </Chart>
                    </Paper>
                </Container>
        </div>
    </>
);
export default StatisicsClosedMatchMakked;