import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useLocation } from "react-router-dom"
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGridPro,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid-pro';
import { deleteRegister } from '../../store/user/userActions';
import { LicenseInfo } from '@mui/x-license-pro';
import Header from '../Header/Header';
import './CheckingNewRegistered.css';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');


const handleSaveClick = (id) => () => {
    // TODO: שמירת המועמד/השדכן בדאטה בייס וכן עדכון ברידקס של רשימת המועמדים
    console.log('save',id)
};

const handleDeleteClick = (id) => () => {
    // TODO: מחיקת המועמד השדכן שנרשם בדאטבה בייס כולל עדכון ברידדקס
    console.log('delete', id)
};



const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
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
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'area',
        headerName: 'עיר',
        type: 'number',
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
        type: 'number',
        width: 110,
        editable: true,
    },
    // {
    //     field: "delete",
    //     headerName: "מחיקה ושליחת הודעה לנרשם",
    //     sortable: false,
    //     width: 190,
    //     disableClickEventBubbling: true,

    //     renderCell: (params) => {
    //         return (
    //             <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
    //                 <IconButton aria-label="favorite" onClick={(params) => handleDeleteRegister(params)}>
    //                     <DeleteIcon />
    //                 </IconButton>
    //             </div>
    //         );
    //     }
    // },
    // {
    //     field: "add",
    //     headerName: "אישור והוספה למאגר",
    //     sortable: false,
    //     width: 140,
    //     disableClickEventBubbling: true,
    //     renderCell: (params) => {
    //         return (
    //             <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
    //                 <IconButton aria-label="favorite" onClick={handleAddRegister}>
    //                     <DeleteIcon />
    //                 </IconButton>
    //             </div>
    //         );
    //     }
    // },
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

export default function CheckingNewRegistered() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userType = params.get("userType");
    const data = useSelector((state) => state.user);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const rows = data.registers;
    // const rows = data.registers.filter((register) => register.userType === "candidate");

    const [rowModesModel, setRowModesModel] = React.useState({});

    return (
        <>
        <Header />
        <div className='CheckingNewRegistered'>
            <h4>{userType && userType === "matchMaker" ? 'בדיקת שדכניות חדשות' : 'בדיקת מועמדים חדשים'}</h4>
            <Box sx={{ height: 400, width: '100%' }}>
                {/* <div className='actions'>
                    <IconButton aria-label="delete" onClick={handleAddRegister}>
                        <span>מחיקה ושליחת הודעה לנרשם</span>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="add" onClick={handleAddRegister}>
                        <span>אישור והוספה למאגר</span>
                        <PersonAddAlt1Icon />
                    </IconButton>
                </div> */}
                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                /> */}
                <DataGridPro
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    // onRowModesModelChange={handleRowModesModelChange}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
                // slots={{
                //     toolbar: EditToolbar,
                // }}
                // slotProps={{
                //     toolbar: { setRows, setRowModesModel },
                // }}
                />
            </Box>
        </div>
        </>
    );
}