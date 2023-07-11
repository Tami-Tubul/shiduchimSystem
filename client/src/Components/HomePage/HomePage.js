import React, {  useEffect} from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import wedding1 from '../../assets/wedding1.png';
import './HomePage.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadMeorasim } from '../../store/matchMaker/matchMakerActions';


function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getShiduchimFromServer = async () => { //שליפת שידוכים שנסגרו בדף הבית כדי שיהיה ניתן להציג אותם גם בסטטיסטיקות וגם בדף שידוכים שנסגרו בלי לפנות פעמיים לשרת
        try {
            const resp = await axios.get("http://localhost:5000/api/shiduchim/public/meorasim-cards");
            const data = resp.data;
            dispatch(loadMeorasim(data.meorasim));
        } catch (error) {
            console.error('Error retrieving messages:', error);
        }
    }
    getShiduchimFromServer();
}, [dispatch]);


  //   const ref = useRef(null);
  //   const [height, setHeight] = useState(144)

  //   const myStyle={
  //     marginTop:(ref.current && ref.current.clientHeight && window.innerHeight - ref.current.clientHeight),
  //     fontSize:'50px',
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  // };

  // console.log('window.innerHeight',window.innerHeight);
  // console.log('innerWidth',window.innerWidth);
  // useEffect(() => {
  //   if (ref && ref.current && ref.current.clientHeight) {
  //     console.log('called')

  //   }
  //   setHeight(ref.current.clientHeight)
  //     console.log(height)
  //   console.log('useEffect', {
  //     ref,
  //     current: ref.current,
  //     clientHeight: ref.current.clientHeight,
  //   })

  // }, [height])

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

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
      // case "candidateLogin":
      //   navigate('/login?user=candidate');
      //   break;
      case "matchMakerLogin":
        navigate('/login');
        break;
      case "fillQuestionarie":
        navigate('/FillQuestionnaire');
        break;
      default:
        navigate('/login');
    }

    // redirect("/login");
  }

  return (
    <div id="app">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <div className='actions'>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="matchMakingClosed">שידוכים שנסגרו</Button>
            </Grid>
            {/* <Grid item>
                <Button variant="contained" onClick={handleClick} name="candidateLogin">התחברות מועמד</Button>
            </Grid> */}
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="matchMakerLogin">התחברות</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClick} name="fillQuestionarie">מילוי שאלון רישום</Button>
            </Grid>
          </Grid>        </div>
        <ImageSrc style={{ backgroundImage: `url(${wedding1})` }} />
      </Box>
      {/* <img src={wedding1} style={{marginTop: '144px'}} alt="wedding-background-image" /> */}
      {/* <Container maxWidth="lg">
        <ul>
          <li>
            <Link to="/register">הירשם</Link>
          </li>
          <li>
            <Link to="/login">התחברות</Link>
          </li>
          <li>
            <Link to="/fillQuestionnaire">שאלון רישום</Link>
          </li>
        </ul>
        <SearchAndMatch />
      </Container> */}
    </div>
  );
}

export default HomePage;
