import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGridPro, GridActionsCellItem, } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license-pro';
import MyModal from '../Modal/Modal'
import Header from '../Header/Header';
import './ShowMessages.css';
import axios from 'axios';
import { deleteMessage, loadMessages } from './../../store/manager/managerActions';
import { useEffect } from 'react';
import { handaleLongDate } from '../../reusableCode/formateDate';
import { useState } from 'react';
import toast from 'toast-me';


LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');


export default function ShowMessages() {
    const messages = useSelector((state) => state.manager.messages);
    const token = useSelector((state) => state.user.currentUser.token);

    const rows = messages ? messages.map((message) => ({ ...message, id: message._id })) : [];
   
    const [rowModesModel, setRowModesModel] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const getMessagesFromServer = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/shiduchim/manager/messages", {
                    headers: { 'x-access-token': token }
                });
                const data = resp.data;
                dispatch(loadMessages(data.messages));
            } catch (error) {
                console.error('Error retrieving messages:', error);
            }
        }
        getMessagesFromServer();
    }, [dispatch]);

    const handleShowMessageClick = (messageID) => () => {
        const selectedMsg = rows && rows.find((mesg) => mesg.id === messageID);
        setSelectedMessage(selectedMsg);
        setShowModal(true);
    };

    const handleDeleteMessageClick = (messageID) => async () => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את ההודעה?")) {
            try {
                const resp = await axios.delete("http://localhost:5000/api/shiduchim/manager/messages/" + messageID, {
                    headers: { 'x-access-token': token }
                })
                if (resp.status === 200) {
                    dispatch(deleteMessage(messageID))
                    toast(resp.data.message, { duration: 5000 })
                }
            } catch (error) {
                console.error('Error retrieving messages:', error);
            }
        }
    };

    const handleclose = () => {
        setShowModal(!showModal);
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'nameOfSender',
            headerName: 'מאת',
            width: 100,
            editable: true,
        },
        {
            field: 'emailofSender',
            headerName: 'מייל השולח/ת',
            width: 100,
            editable: true,
        },
        {
            field: 'textMessage',
            headerName: 'גוף ההודעה',
            width: 100,
            editable: true,
        },
        {
            field: 'dateOfSending',
            headerName: 'תאריך שליחה',
            width: 100,
            editable: true,
            valueGetter: (params) => handaleLongDate(params.row.dateOfSending),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'צפיה בהודעה/מחיקה ושליחת הודעה',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<VisibilityIcon />}
                        label="Visibility"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleShowMessageClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteMessageClick(id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return (
        <>
            <Header />
            <div className='FillQuestionarie'>
                <div className='CheckingNewRegistered'>
                    <h4>צפיה בהודעות</h4>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGridPro
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                        />
                    </Box>
                    {showModal && <MyModal header={selectedMessage.nameOfSender} body={selectedMessage.textMessage} show={showModal} handleClose={handleclose} />}
                </div>
            </div>
        </>
    );
}