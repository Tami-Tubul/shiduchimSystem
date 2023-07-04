import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addFavoritedCandidate } from '../../store/matchMaker/matchMakerActions';
import './SearchedCard.css';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SearchedCard(props) {
    const dispatch = useDispatch();
    const matchMaker = useSelector((state) => state.matchMaker);
    const { candidate } = props;
    const moreDetails = { ...candidate, firstName: "", lastName: "", age: "" }
    const [expanded, setExpanded] = React.useState(false);
    const [addFavorited, setAddFavorited] = React.useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddToFavorite = () => {
        // TODO: שמירת מועמד באזור אישי של שדכנית
        console.log('props', props);
        console.log(matchMaker)
        const favoritedList = matchMaker.faoritedCandidates;
        const isExist = favoritedList && favoritedList.find((favorited) => {
            return (favorited.firstName === candidate.firstName && favorited.lastName === candidate.lastName)
        });
        if (!isExist) {
            if (!favoritedList)
                dispatch(addFavoritedCandidate([candidate]));
            else {
                favoritedList.push(candidate);
                dispatch(addFavoritedCandidate(favoritedList));
            }
        } else {
            const newFavoritedList = favoritedList.filter((fovorited) => (favoritedList.firstName !== candidate.firstName && fovorited.lastName !== candidate.lastName))
            dispatch(addFavoritedCandidate(newFavoritedList));
        }
        setAddFavorited(!isExist);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2, minWidth: 200, maxWidth: 300 }}>
            <CardHeader
                action={
                    <IconButton aria-label="favorite" onClick={handleAddToFavorite}>
                        {addFavorited ? <FavoriteIcon /> :
                            <FavoriteBorderIcon />}
                    </IconButton>
                }
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {`${candidate.firstName} ${candidate.lastName}`}
                </Typography>
                <Typography variant="h6" component="div">
                    {`גיל:${candidate.age}`}
                </Typography>
            </CardContent>
            {/* <CardActions disableSpacing>
                        <div className='button'>
                            <Button size="small" onClick={handleShowMore} >
                                <Typography variant="h4" color="text.secondary">
                                    {showMore ? '-' : '+'}
                                </Typography>
                            </Button>
                        </div>
                    </CardActions> */}
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {Object.values(moreDetails).map((property) => {
                        return (<Typography sx={{ fontSize: 14 }} color="text.secondary">
                            {property}
                        </Typography>);
                    })}
                </CardContent>
            </Collapse>
        </Card>
    );
}