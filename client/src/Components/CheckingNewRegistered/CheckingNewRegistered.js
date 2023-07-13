import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license-pro';
import Header from '../Header/Header';
import './CheckingNewRegistered.css';
import { useEffect } from 'react';
import axios from 'axios';
import { deleteNewCandidate, deleteNewMatchMaker, loadIrelevantCandidate, loadNewCandidates, loadNewMatchMakers, removeIrelevantCandidate } from '../../store/manager/managerActions';
import { useLocation } from 'react-router-dom';
import toast from 'toast-me';
import { deleteCandidate } from './../../store/user/userActions';
import ShowCandidate from '../ShowCandidate/ShowCandidate';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowMatchMaker from './../ShowMatchMaker/ShowMatchMaker';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');


export default function CheckingNewRegistered() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const eventType = params.get("eventType");

    const new_candidates = useSelector((state) => state.manager.newCandidates);
    const unrelevantCandidates = useSelector((state) => state.manager.irelevantCandidates);
    //useSelector((state) => state.user.candidates).filter(cand => cand.pendingDeletion === true); //המועמדים שסומנו ע"י השדכן כלא רלוונטיים
    const new_matchmaker = useSelector((state) => state.manager.newMatchmakers);
    const currentUser = useSelector((state) => state.user.currentUser);


    let rows;
    if (eventType === "newMatchmakers") {
        rows = new_matchmaker ? new_matchmaker.map(match => ({ ...match, id: match._id })) : [];
    }
    else if (eventType === "newCandidates") {
        rows = new_candidates ? new_candidates.map(cand => ({ ...cand, id: cand._id })) : [];
    }
    else if (eventType === "unrelevantCandidates") {
        rows = unrelevantCandidates ? unrelevantCandidates.map(irelcand => ({ ...irelcand, id: irelcand._id })) : [];
    }

    const [rowModesModel, setRowModesModel] = React.useState({});
    const [isVisibility, setIsVisibility] = React.useState(false);
    const [selected, setSelected] = React.useState(false);

    const handleVisiblityClick = (id) => () => {
        setIsVisibility(true);
        if (eventType === "newMatchmakers") {
            // חיפוש שדכן לפי ID
            const selectedMatchmaker = new_matchmaker.find(match => match._id === id)
            setSelected(selectedMatchmaker)
        }
        else if (eventType === "newCandidates") {
            // חיפוש מועמד לפי ID
            const selectedCAndidate = new_candidates.find(cand => cand._id === id)
            setSelected(selectedCAndidate)
        }
        else {
            //חיפוש מועמד לא רלוונטי לפי ID
            const selectedirelevantCAndidate = unrelevantCandidates.find(irelcand => irelcand._id === id)
            setSelected(selectedirelevantCAndidate)
        }
    }

    const handleCloseModal = () => {
        setIsVisibility(false);
    }

    const dispatch = useDispatch();


    useEffect(() => {
        //שליפת מועמדים שביצעו הרשמה ולא אושרו ומועמדים שסומנו להסרה ע"י השדכן
        const getNewCandidatesFromServer = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/shiduchim/manager/candidates-cards/`, {
                    headers: { 'x-access-token': currentUser.token }
                });
                const allCandidates = resp.data.candidates;

                const newCandidates = allCandidates.filter(cand => cand.isApproved === false); //שליפת כל המועמדים שנשרמו ולא אושרו
                const irelevantCandidates = allCandidates.filter(cand => cand.pendingDeletion === true); //שליפת מועמדים שסומנו להסרה ע"י השדכן

                dispatch(loadNewCandidates(newCandidates));
                dispatch(loadIrelevantCandidate(irelevantCandidates));


            } catch (error) {
                console.error('Error retrieving messages:', error);
            }
        }

        //שליפת שדכנים שביצעו הרשמה ולא אושרו
        const getNewMatchMakerFromServer = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/shiduchim/manager/matchmakers-cards`, {
                    headers: { 'x-access-token': currentUser.token }
                });
                const allMatchmakers = resp.data.matchmakers;
                const newMatchmakers = allMatchmakers.filter(match => match.isApproved === false); //שליפת כל השדכנים שנרשמו ולא אושרו
                dispatch(loadNewMatchMakers(newMatchmakers));
            } catch (error) {
                console.error('Error retrieving messages:', error);
            }
        }

        getNewCandidatesFromServer();
        getNewMatchMakerFromServer()
    }, [])



    const handleSaveClick = (id) => () => {
        if (eventType === "newCandidates") {
            //אישור מועמד חדש
            // try {
            //     const resp = await axios.put(`http://localhost:5000/api/shiduchim/manager/new-candidates/${id}`, null, { headers: { 'x-access-token': currentUser.token } })
            //     if (resp.status === 201) {
            //         toast(resp.data.message, { duration: 5000 })
            //         dispatch(deleteNewCandidate(id)) //הסרה ממערך מועמדים חדשים
            //     }

            // } catch (error) {
            //     toast(error.response.data.message, { duration: 5000 })
            // }


            axios.put(`http://localhost:5000/api/shiduchim/manager/new-candidates/${id}`, null,
                {
                    headers: { 'x-access-token': currentUser.token }
                }).then(resp => {
                    if (resp.status === 201) {
                        toast(resp.data.message, { duration: 5000 })
                        dispatch(deleteNewCandidate(id)) //הסרה ממערך מועמדים חדשים
                    }
                }).catch(error => {
                    toast(error.response.data.message, { duration: 5000 })
                })
        }

        else if (eventType === "newMatchmakers") {
            //אישור שדכן חדש
            // try {
            //     const resp = axios.put(`http://localhost:5000/api/shiduchim/manager/new-matchmakers/${id}`, null, { headers: { 'x-access-token': currentUser.token } })
            //     if (resp.status === 201) {
            //         toast(resp.data.message, { duration: 5000 })
            //         dispatch(deleteNewMatchMaker(id)) //הסרה ממערך שדכנים חדשים
            //     }
            // } catch (error) {
            //     toast(error.response.data.message, { duration: 5000 })
            // }

            axios.put(`http://localhost:5000/api/shiduchim/manager/new-matchmakers/${id}`, null,
                {
                    headers: { 'x-access-token': currentUser.token }
                }).then(resp => {
                    if (resp.status === 201) {
                        toast(resp.data.message, { duration: 5000 })
                        dispatch(deleteNewMatchMaker(id)) //הסרה ממערך שדכנים חדשים
                    }
                }).catch(error => {
                    toast(error.response.data.message, { duration: 5000 })
                })

        }

    };

    const handleDeleteClick = (id) => () => {

        if (eventType === "newCandidates") {
            //מחיקת מועמד חדש
            axios.delete(`http://localhost:5000/api/shiduchim/manager/new-candidates/${id}`,
                {
                    headers: { 'x-access-token': currentUser.token }
                })
                .then(resp => {
                    if (resp.status === 200) {
                        toast(resp.data.message, { duration: 5000 })
                        dispatch(deleteNewCandidate(id)) //הסרה ממערך מועמדים חדשים
                    }
                }).catch(error => {
                    toast(error.response.data.message, { duration: 5000 })
                })
        }


        else if (eventType === "newMatchmakers") {
            //מחיקת שדכן חדש
            axios.delete(`http://localhost:5000/api/shiduchim/manager/new-matchmakers/${id}`,
                {
                    headers: { 'x-access-token': currentUser.token }
                })
                .then(resp => {
                    if (resp.status === 200) {
                        toast(resp.data.message, { duration: 5000 })
                        dispatch(deleteNewMatchMaker(id)) //הסרה ממערך שדכנים חדשים
                    }
                }).catch(error => {
                    toast(error.response.data.message, { duration: 5000 })
                })
        }


        else { //eventType ==="unrelevantCandidates"

            //מחיקת מועמד לא רלוונטי שסומן ע"י השדכן
            axios.delete(`http://localhost:5000/api/shiduchim/manager/removal-candidates/${id}`,
                {
                    headers: { 'x-access-token': currentUser.token }
                })
                .then(resp => {
                    if (resp.status === 200) {
                        toast(resp.data.message, { duration: 5000 })
                        dispatch(removeIrelevantCandidate(id)) //הסרה ממערך מועמדים להסרה
                        dispatch(deleteCandidate(id)) //הסרה ממערך מועמדים
                    }
                }).catch(error => {
                    toast(error.response.data.message, { duration: 5000 })
                })
        }

    };

    const columns = [
        // { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'שם פרטי',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'שם משפחה',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'מייל',
            width: 110,
            editable: true,
        },
        {
            field: 'city',
            headerName: 'עיר',
            width: 110,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'גיל',
            type: 'number',
            width: 90,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'טלפון',
            width: 110,
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: eventType === "unrelevantCandidates" ? 'מחיקה מהמערכת / צפיה' : 'אישור והוספה למאגר / מחיקה ושליחת הודעה / צפיה',
            width: 500,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const actions = [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<VisibilityIcon />}
                        label="Visibility"
                        onClick={handleVisiblityClick(id)}
                        color="inherit"
                    />,
                ];

                if (eventType !== "unrelevantCandidates") {
                    actions.unshift(
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />
                    );
                }

                return actions;
            },

        }
    ];

    return (
        <>
            <Header />
            <div className='CheckingNewRegistered'>
                <h4>{eventType === "newMatchmakers" ? 'בדיקת שדכניות חדשות' : eventType === "newCandidates" ? 'בדיקת מועמדים חדשים' : 'בדיקת מועמדים לא רלונטיים'}</h4>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGridPro
                        rows={rows ? rows : []}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                    />
                </Box>
            </div>
            <Dialog
                open={isVisibility}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5" component="div">
                        {`${selected.firstName} ${selected.lastName}`}
                    </Typography>

                </DialogTitle>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" component="div">
                        {`גיל:${selected.age}`}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {eventType !== "newMatchmakers" ? <ShowCandidate show={isVisibility} handleClose={handleCloseModal} candidate={selected} /> :
                         <ShowMatchMaker show={isVisibility} handleClose={handleCloseModal} matchMaker={selected}/> }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>סגור</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}