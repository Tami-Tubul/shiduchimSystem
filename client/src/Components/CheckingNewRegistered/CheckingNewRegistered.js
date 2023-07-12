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
import { deleteNewCandidate, deleteNewMatchMaker, loadNewCandidates, loadNewMatchMakers } from '../../store/manager/managerActions';
import { useLocation } from 'react-router-dom';
import toast from 'toast-me';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');


export default function CheckingNewRegistered() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const eventType = params.get("eventType");

    const new_candidates = useSelector((state) => state.manager.newCandidates);
    const unrelevantCandidates = useSelector((state) => state.user.candidates).filter(cand => cand.pendingDeletion === true); //המועמדים שסומנו ע"י השדכן כלא רלוונטיים
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
    const dispatch = useDispatch();


    useEffect(() => {
        //שליפת מועמדים שביצעו הרשמה ולא אושרו
        const getNewCandidatesFromServer = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/shiduchim/manager/candidates-cards/`, {
                    headers: { 'x-access-token': currentUser.token }
                });
                const allCandidates = resp.data.candidates;
                const newCandidates = allCandidates.filter(cand => cand.isApproved === false); //שליפת כל המועמדים שנשרמו ולא אושרו
                dispatch(loadNewCandidates(newCandidates));
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
            //אישור מועמד
            axios.put(`http://localhost:5000/api/shiduchim/manager/new-candidates/${id}`,{
                headers: { 'x-access-token': currentUser.token }
            }).then(resp => {
                if (resp.status === 201) {
                    toast(resp.data.message, { duration: 5000 })
                }
                dispatch(deleteNewCandidate(id)) //הסרה ממערך מועמדים חדשים
            }).catch(err => {
                toast(err.response.data.message, { duration: 5000 })
            })
        }

        else if (eventType === "newMatchmakers") {
            //אישור שדכן 
            axios.put(`http://localhost:5000/api/shiduchim/manager/new-matchmakers/${id}`, {
                headers: { 'x-access-token': currentUser.token }
            }).then(resp => {
                if (resp.status === 201) {
                    toast(resp.data.message, { duration: 5000 })
                }
                dispatch(deleteNewMatchMaker(id)) //הסרה ממערך שדכנים חדשים
            }).catch(err => {
                toast(err.response.data.message, { duration: 5000 })
            })
        }

    };

    const handleDeleteClick = (id) => () => {

        if (eventType === "newCandidates") {
            //מחיקת מועמד
            axios.delete(`http://localhost:5000/api/shiduchim/manager/new-candidates/${id}`,{
                headers: { 'x-access-token': currentUser.token }
            }).then(resp => {
                if (resp.status === 200) {
                    toast(resp.data.message, { duration: 5000 })
                }
                dispatch(deleteNewCandidate(id)) //הסרה ממערך מועמדים חדשים
            }).catch(err => {
                toast(err.response.data.message, { duration: 5000 })
            })
        }

        else if (eventType === "newMatchmakers") {
            //מחיקת שדכן 
            axios.delete(`http://localhost:5000/api/shiduchim/manager/new-matchmakers/${id}`, {
                headers: { 'x-access-token': currentUser.token }
            }).then(resp => {
                if (resp.status === 200) {
                    toast(resp.data.message, { duration: 5000 })
                }
                dispatch(deleteNewMatchMaker(id)) //הסרה ממערך שדכנים חדשים
            }).catch(err => {
                toast(err.response.data.message, { duration: 5000 })
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
            headerName: 'אישור והוספה למאגר/מחיקה ושליחת הודעה',
            width: 500,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
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
        </>
    );
}