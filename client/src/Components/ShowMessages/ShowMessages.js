import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGridPro, GridActionsCellItem, } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license-pro';
import MyModal from '../Modal/Modal'
import Header from '../Header/Header';
import './ShowMessages.css';
import axios from 'axios';
import { loadMessages } from './../../store/manager/managerActions';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');

export default function ShowMessages() {
    const data = useSelector((state) => state.manager);
    const token = useSelector((state) => state.user.currentUser.token);

    const rows = data.messages ? data.messages.map((message) => ({ ...message, id: message._id })) : [];
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState({});

    const dispatch = useDispatch();

    React.useEffect(() => {
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
    }, []);

    const handleShowMessageClick = (id) => () => {
        console.log('show', id);
        const selected = rows && rows.find((row) => row.id === id);
        setSelectedMessage(selected);
        setShowModal(true);
        // TODO: צפיה ושמירת ההודעה
    };

    const handleDeleteMessageClick = (id) => async () => {
        try {
            const resp = await axios.delete("http://localhost:5000/api/shiduchim/manager/messages/" + id)
            if (resp.status === 200) {
                //dispatch(deleteMessage(id)) //TODO: מחיקת ההודעה 
                alert(resp.status.data.message)
            }
        } catch (error) {
            console.error('Error retrieving messages:', error);
        }
    };

    const handleclose = () => {
        setShowModal(!showModal);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
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
                    {showModal && <MyModal header={selectedMessage.subject} body={selectedMessage.body} show={showModal} handleClose={handleclose} />}
                </div>
            </div>
        </>
    );
}