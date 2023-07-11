import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Container } from '@mui/material';
import Header from '../Header/Header';
import './StatisicsClosedMatchMakked.css';
import { useSelector } from 'react-redux';
import { convertDateToHebrew } from '../../reusableCode/formateDate';


const data = [
    { argument: 'תשרי', value: 0 },
    { argument: 'חשוון', value: 0 },
    { argument: 'כסלו', value: 0 },
    { argument: 'טבת', value: 0 },
    { argument: 'שבט', value: 0 },
    { argument: 'אדר', value: 0 },
    { argument: 'ניסן', value: 0 },
    { argument: 'אייר', value: 0 },
    { argument: 'סיוון', value: 0 },
    { argument: 'תמוז', value: 0 },
    { argument: 'אב', value: 0 },
    { argument: 'אלול', value: 0 }
];

// TODO: לקבל את כל השידוכים שנעשו החודש ולהציג אותם

const StatisicsClosedMatchMakked = () => {

    const closedRegisters = useSelector((state) => state.matchMaker.closedRegisters);
    const datesArr = closedRegisters && closedRegisters.map(x => convertDateToHebrew(x.dateWort)) //מערך תאריכי שידוכים
   
    const allMonthArr = datesArr.map(m => m.split(" ")[3].replace(/ב/, '')) // מערך חודשי שידוכים
    console.log(allMonthArr);

    allMonthArr.forEach((value) => { //מעבר על כל החודשים שנעשו בהם שידוכים והלאת הערך ב1
        const monthIndex = data.findIndex((month) => month.argument === value);
        if (monthIndex !== -1) {
          data[monthIndex].value += 1;
        }
      });
 
    return (
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
    )
};

export default StatisicsClosedMatchMakked;