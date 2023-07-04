import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGridPro, GridActionsCellItem, } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license-pro';
import MyModal from '../Modal/Modal'
import Header from '../Header/Header';
import './ShowMessages.css';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');

export default function ShowMessages() {
    const data = useSelector((state) => state.manager);
    const rows = data.messages ? data.messages : [];
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState({});

    const handleShowMessageClick = (id) => () => {
        console.log('show', id);
        const selected = rows && rows.find((row) => row.id === id);
        setSelectedMessage(selected);
        setShowModal(true);
        // TODO: צפיה ושמירת ההודעה
    };

    const handleDeleteMessageClick = (id) => () => {
        console.log('delete', id)
       //TODO: מחיקת ההודעה 
    };

    const handleclose = () => {
        setShowModal(!showModal);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'from',
            headerName: 'מאת',
            width: 100,
            editable: true,
        },
        {
            field: 'subject',
            headerName: 'נושא',
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