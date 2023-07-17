import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { duration, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactMailTwoToneIcon from '@mui/icons-material/ContactMailTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addCandidateToCart, loadFavoritedCandidates, removeCandidateFromCart } from '../../store/matchMaker/matchMakerActions';
import './SearchedCard.css';
import { useState } from 'react';
import axios from 'axios';
import toast from 'toast-me';
import { addIrelevantCandidate, removeIrelevantCandidate } from './../../store/manager/managerActions';
import { useEffect } from 'react';
import { loadCandidates, removeCandidate } from '../../store/user/userActions';
import { handaleLongDate } from '../../reusableCode/formateDate';

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

    const { candidate } = props;
    const [expanded, setExpanded] = useState(false);
    const [addFavorited, setAddFavorited] = useState(false);
    const [isCheckedToRemove, setIsCheckedToRemove] = useState(false);
    const [deleteCandidate, setDeleteCandiidate] = useState(false);
    const [sendMail, setSendMail] = useState(false);

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);
    const candidates = useSelector((state) => state.user.candidates);
    const filteredCandidates = useSelector((state) => state.user.filteredCandidates);

    const matchMaker = useSelector((state) => state.matchMaker);
    const favoritesIDs = matchMaker.faoritedCandidates;

    const faoritedCands = filteredCandidates.length !== 0 ?
        filteredCandidates.filter(cand => { //אובייקטים של מועמדים בסל
            return favoritesIDs && favoritesIDs.includes(cand._id);
        }) : candidates.filter(cand => {
            return favoritesIDs && favoritesIDs.includes(cand._id);
        });

        
    useEffect(() => {
        setAddFavorited(faoritedCands.includes(candidate));
    }, [favoritesIDs, faoritedCands])

    useEffect(() => {
        if (currentUser.role === "matchmaker") {
            const getFavoritedCandidatesFromServer = async () => {
                try {
                    const resp = await axios.get("http://localhost:5000/api/shiduchim/matchmaker/cart", {
                        headers: { 'x-access-token': currentUser.token }
                    });
                    const data = resp.data;
                    const candidatesIDs = data.candidatesOnCart
                    dispatch(loadFavoritedCandidates(candidatesIDs));
                } catch (error) {
                    console.error('Error retrieving messages:', error);
                }
            }
            getFavoritedCandidatesFromServer();

        }
        else {
            const getCandidatesFromServer = async () => {
                try {
                    const resp = await axios.get(`http://localhost:5000/api/shiduchim/manager/candidates-cards`, {
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
        }
    }, [])


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAddToFavorite = async () => {
        //הוספה לאזור האישי של השדכן
        if (!addFavorited) {
            try {
                const resp = await axios.put(`http://localhost:5000/api/shiduchim/matchmaker/candidates-cards/${candidate._id}`, null, { headers: { 'x-access-token': currentUser.token } })
                if (resp.status === 200) {
                    toast(resp.data.message, { duration: 5000 })
                    dispatch(addCandidateToCart(resp.data.candidatesOnCart))//החזרת מערך מעודכן לאחר הוספה לרידקס

                }
            } catch (error) {
                toast(error.response.data.message, { duration: 5000 })
            }
        }
        else {
            //הסרה מהאזור האישי של השדכן
            try {
                const resp = await axios.delete(`http://localhost:5000/api/shiduchim/matchmaker/cart/${candidate._id}`, { headers: { 'x-access-token': currentUser.token } })
                if (resp.status === 200) {
                    toast(resp.data.message, { duration: 5000 })
                    dispatch(removeCandidateFromCart(resp.data.candidatesOnCart))//החזרת מערך מעודכן לאחר הסרה לרידקס
                    // Update favoritesIDs state
                    const updatedFavoritesIDs = favoritesIDs.filter((id) => id !== candidate._id);
                    dispatch(loadFavoritedCandidates(updatedFavoritesIDs));
                }
            } catch (error) {
                toast(error.response.data.message, { duration: 5000 })
            }

        }
    }


    const handleMarkCandidateToDelete = async () => {
        //שליחת מועמד למחיקה ע"י השדכן
        try {
            const resp = await axios.post(`http://localhost:5000/api/shiduchim/matchmaker/candidates-cards/${candidate._id}`, null, { headers: { 'x-access-token': currentUser.token } })
            if (resp.status === 200) {
                toast(resp.data.message, { duration: 5000 })
                dispatch(addIrelevantCandidate({ ...candidate, pendingDeletion: true }))
                setIsCheckedToRemove(true);
            }
        } catch (error) {
            toast(error.response.data.message, { duration: 5000 })
        }
    }

    const handleDelete = async () => {
        //מחיקת מועמד ע"י המנהל
        try {
            const resp = await axios.delete(`http://localhost:5000/api/shiduchim/manager/candidates-cards/${candidate._id}`, { headers: { 'x-access-token': currentUser.token } })

            if (resp.status === 200) {

                toast(resp.data.message, { duration: 5000 })

                dispatch(removeCandidate(candidate._id)) //מחיקת המועמד ממערך המועמדים
                setDeleteCandiidate(true);
            }
        } catch (error) {
            toast(error.response.data.message, { duration: 5000 })
        }

    }

    const handleSendMail = async () => {
        //שליחת מייל למועמד האם הוא עדיין רלוונטי ע"י המנהל
        try {
            const resp = await axios.post(`http://localhost:5000/api/shiduchim/manager/candidates-cards/${candidate._id}`, null, { headers: { 'x-access-token': currentUser.token } })
            if (resp.status === 200) {
                toast(resp.data.message, { duration: 5000 })
                setIsCheckedToRemove(true);
            }
        } catch (error) {
            toast(error.response.data.message, { duration: 5000 })
        }

        setSendMail(true);
    }


    return (
        <Card sx={{ maxWidth: 345, margin: 2, minWidth: 200, maxWidth: 500 }}>
            <CardHeader
                action={
                    <>
                        {currentUser.role === "matchmaker" &&
                            <>
                                <div>
                                    <IconButton title="הוסף/הסר לאזור האישי" onClick={handleAddToFavorite}>
                                        {addFavorited ? <FavoriteIcon /> :
                                            <FavoriteBorderIcon />}
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton title='שלח מועמד לא רלוונטי למנהל למחיקה' onClick={handleMarkCandidateToDelete}>
                                        {isCheckedToRemove ? <ContactMailTwoToneIcon /> :
                                            <ContactMailIcon />}
                                    </IconButton>
                                </div>
                            </>
                        }
                        {currentUser.role === "manager" &&
                            <>
                                <div>
                                    <IconButton title="שלח מייל אוטומטי למועמד לבדיקת רלוונטיות" onClick={handleSendMail}>
                                        {sendMail ? <ContactMailTwoToneIcon /> :
                                            <ContactMailIcon />}
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton title="הסר מועמד מהמערכת" onClick={handleDelete}>
                                        {deleteCandidate ? <DeleteForeverTwoToneIcon /> :
                                            <DeleteIcon />}
                                    </IconButton>
                                </div>
                            </>
                        }
                    </>
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
                    <Grid container columns={{ md: 12 }}>
                        {candidate.gender && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מין:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.gender}
                            </Typography>
                        </Grid>}
                        {candidate.familyStatus && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מצב משפחתי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.familyStatus}
                            </Typography>
                        </Grid>}
                        {candidate.bornDate && <Grid item xs={2} sm={4} md={4}>
                            <Typography>תאריך לידה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {handaleLongDate(candidate.bornDate.toString())}
                            </Typography>
                        </Grid>}
                        {candidate.city && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עיר:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.city}
                            </Typography>
                        </Grid>}
                        {candidate.countryBirth && <Grid item xs={2} sm={4} md={4}>
                            <Typography>ארץ לידה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.countryBirth}
                            </Typography>
                        </Grid>}
                        {candidate.phone && <Grid item xs={2} sm={4} md={4}>
                            <Typography>טלפון:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.phone}
                            </Typography>
                        </Grid>}
                        {candidate.email && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מייל:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.email}
                            </Typography>
                        </Grid>}
                        {candidate.characters && <Grid item xs={2} sm={4} md={4}>
                            <Typography>תכונות אופי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.characters}
                            </Typography>
                        </Grid>}
                        {candidate.colorSkin && <Grid item xs={2} sm={4} md={4}>
                            <Typography>גוון עור:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.colorSkin}
                            </Typography>
                        </Grid>}
                        {candidate.height && <Grid item xs={2} sm={4} md={4}>
                            <Typography>גובה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {Object.values(candidate.height)}
                            </Typography>
                        </Grid>}
                        {candidate.bodyStracture && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מבנה גוף:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.bodyStracture}
                            </Typography>
                        </Grid>}
                        {candidate.healthCondition && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מצב בריאותי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.healthCondition}
                            </Typography>
                        </Grid>}
                        {candidate.economicSituation && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מצב כלכלי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.economicSituation}
                            </Typography>
                        </Grid>}
                        {candidate.clothingStyle && <Grid item xs={2} sm={4} md={4}>
                            <Typography>סגנון לבוש:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.clothingStyle}
                            </Typography>
                        </Grid>}
                        {candidate.look && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מראה כללי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.look}
                            </Typography>
                        </Grid>}
                        {candidate.headdress && <Grid item xs={2} sm={4} md={4}>
                            <Typography>כיסוי ראש:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.headdress}
                            </Typography>
                        </Grid>}
                        {candidate.sector && <Grid item xs={2} sm={4} md={4}>
                            <Typography>שיוך מגזרי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.sector}
                            </Typography>
                        </Grid>}
                        {candidate.origin && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עידה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.origin}
                            </Typography>
                        </Grid>}
                        {candidate.commitMoney && <Grid item xs={2} sm={4} md={4}>
                            <Typography>התחיבות כספית:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.commitMoney.toString()}
                            </Typography>
                        </Grid>}
                        {candidate.requireMoney && <Grid item xs={2} sm={4} md={4}>
                            <Typography>דרישה כספית:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.requireMoney.toString()}
                            </Typography>
                        </Grid>}
                        {candidate.yeshivaOrSeminar && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מקוםלימודים/עבודה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.yeshivaOrSeminar}
                            </Typography>
                        </Grid>}
                        {candidate.doingToday && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עובד/לומד:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.doingToday}
                            </Typography>
                        </Grid>}
                        {candidate.fatherName && <Grid item xs={2} sm={4} md={4}>
                            <Typography>שם האב:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fatherName}
                            </Typography>
                        </Grid>}
                        {candidate.fatherDoing && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עיסוק האב:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fatherDoing}
                            </Typography>
                        </Grid>}
                        {candidate.motherName && <Grid item xs={2} sm={4} md={4}>
                            <Typography>שם האם:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.motherName}
                            </Typography>
                        </Grid>}
                        {candidate.motherDoing && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עיסוק האם:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.motherDoing}
                            </Typography>
                        </Grid>}
                        {candidate.mozaAv && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מוצא אב:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.mozaAv}
                            </Typography>
                        </Grid>}
                        {candidate.mozaEm && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מוצא אם:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.mozaEm}
                            </Typography>
                        </Grid>}
                        {candidate.siblings && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מס' אחים ואחיות:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.siblings}
                            </Typography>
                        </Grid>}
                        {candidate.parentStatus && <Grid item xs={2} sm={4} md={4}>
                            <Typography>סטטוס הורים:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.parentStatus}
                            </Typography>
                        </Grid>}
                        {candidate.halachaMethod && <Grid item xs={2} sm={4} md={4}>
                            <Typography>שיטה הלכתית:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.halachaMethod}
                            </Typography>
                        </Grid>}
                        <Grid container><Typography variant="h6" component="div">דרישות מבן/בת הזוג:</Typography></Grid>
                        {candidate.drishotSector && <Grid item xs={2} sm={4} md={4}>
                            <Typography>שיוך מגזרי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.drishotSector}
                            </Typography>
                        </Grid>}
                        {candidate.drishotLook && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מראה כללי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.drishotLook}
                            </Typography>
                        </Grid>}
                        {candidate.drishotCharacters && <Grid item xs={2} sm={4} md={4}>
                            <Typography>תכונות אופי:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.drishotCharacters}
                            </Typography>
                        </Grid>}
                        {candidate.drishotFavoriteMoza && <Grid item xs={2} sm={4} md={4}>
                            <Typography>ארץ מוצא מועדף:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.drishotFavoriteMoza}
                            </Typography>
                        </Grid>}
                        {candidate.drishotNotMoza && <Grid item xs={2} sm={4} md={4}>
                            <Typography>לא ממוצא:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.drishotNotMoza}
                            </Typography>
                        </Grid>}
                        {candidate.fromAge && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מגיל:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fromAge.toString()}
                            </Typography>
                        </Grid>}
                        {candidate.mostAge && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עד גיל:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.mostAge.toString()}
                            </Typography>
                        </Grid>}
                        {candidate.fromHeight && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מגובה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {Object.values(candidate.fromHeight)}
                            </Typography>
                        </Grid>}
                        {candidate.mostHeight && <Grid item xs={2} sm={4} md={4}>
                            <Typography>עד גובה:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {Object.values(candidate.mostHeight)}
                            </Typography>
                        </Grid>}
                        <Grid container><Typography variant="h6" component="div">פרטים נוספים:</Typography></Grid>
                        {candidate.casherPhone && <Grid item xs={2} sm={4} md={4}>
                            <Typography>פלאפון כשר:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.casherPhone}
                            </Typography>
                        </Grid>}
                        {candidate.licence && <Grid item xs={2} sm={4} md={4}>
                            <Typography>רשיון:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.licence}
                            </Typography>
                        </Grid>}
                        {candidate.smoking && <Grid item xs={2} sm={4} md={4}>
                            <Typography>מעשן:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.smoking}
                            </Typography>
                        </Grid>}
                        {candidate.recomendedPeople && candidate.recomendedPeople.length >= 1 && <Grid container><Typography variant="h6" component="div">מחותנים:</Typography></Grid>}
                        {candidate.recomendedPeople && candidate.recomendedPeople.length >= 1 && candidate.recomendedPeople.map((recomended, index) => {
                            return (
                                <Grid container key={index}>
                                    <Typography>מחותן {index + 1}:</Typography>
                                    {recomended.recommendName && <Grid item >
                                        <Typography>שם:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {recomended.recommendName}
                                        </Typography>
                                    </Grid>}
                                    {recomended.recommendPhone && <Grid item >
                                        <Typography>טלפון:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {recomended.recommendPhone}
                                        </Typography>
                                    </Grid>}
                                    {recomended.recommendRelative && <Grid>
                                        <Typography>קרבה:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {recomended.recommendRelative}
                                        </Typography>
                                    </Grid>}
                                </Grid>
                            );
                        })}
                        {candidate.inLaws && candidate.inLaws.length >= 1 && <Grid container><Typography variant="h6" component="div">מקורות לבירורים:</Typography></Grid>}
                        {candidate.inLaws && candidate.inLaws.length >= 1 && candidate.inLaws.map((inLaw, index) => {
                            return (
                                <Grid container key={index}>
                                    <Typography>מקור {index + 1}:</Typography>
                                    {inLaw.fatherInLawName && <Grid>
                                        <Typography>שם:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {inLaw.fatherInLawName}
                                        </Typography>
                                    </Grid>}
                                    {inLaw.fatherInLawPhone && <Grid>
                                        <Typography>טלפון:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {inLaw.fatherInLawPhone}
                                        </Typography>
                                    </Grid>}
                                    {inLaw.fatherInLawCity && <Grid>
                                        <Typography>עיר:</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {inLaw.fatherInLawCity}
                                        </Typography>
                                    </Grid>}
                                </Grid>);
                        })}
                        <Grid container><Typography variant="h6" component="div">פרטי ממלא השאלון:</Typography></Grid>
                        {candidate.fillQuestionarieName && <Grid>
                            <Typography>שם ממלא הטופס:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fillQuestionarieName}
                            </Typography>
                        </Grid>}
                        {candidate.fillQuestionariePhone && <Grid item xs={2} sm={4} md={4}>
                            <Typography>טלפון ממלא הטופס:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fillQuestionariePhone}
                            </Typography>
                        </Grid>}
                        {candidate.fillQuestionarieRelative && <Grid item xs={2} sm={4} md={4}>
                            <Typography>קרבה למועמד:</Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {candidate.fillQuestionarieRelative}
                            </Typography>
                        </Grid>}
                    </Grid>
                </CardContent>
            </Collapse >
        </Card >
    );
}