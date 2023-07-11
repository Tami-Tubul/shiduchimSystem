import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/material/TextField/TextField';
import { saveMessage } from '../../store/manager/managerActions';
import './SendMail.css';
import axios from 'axios';
import { useState } from 'react';
import toast from 'toast-me';
import { Alert } from '@mui/material';

export default function SendEmail({ show, handleClose }) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.currentUser.token);
    const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);

    const [message, setMessage] = useState({
        nameOfSender: '',
        emailofSender: '',
        textMessage: ''
    });

    const handleChangeSubject = (e) => {
        setMessage({ ...message, nameOfSender: e.target.value });
    }
    const addEmoji = (emoji) => () => {
        const newbody = message.textMessage + emoji;
        setMessage({ ...message, textMessage: newbody });
    }

    const handleCloseModal = () => {
        handleClose();
    }

    const handleChangeBody = (e) => {
        setMessage({ ...message, textMessage: e.target.value });
    }

    const handleChangeEmail = (e) => {
        setMessage({ ...message, emailofSender: e.target.value });
    }

    const handleSendEmail = () => {
        axios.post("http://localhost:5000/api/shiduchim/matchmaker/message", message, {
            headers: { 'x-access-token': token }
        }).then(resp => {
            if (resp.status === 201) {
                toast(resp.data.message, { duration: 5000 })
                dispatch(saveMessage(resp.data.newMessage)); //שמירת הודעה ברידקס
                handleClose(false);
            }
        }).catch(err => {
            setErrorAfterSubmit(err.response.data.message)
        })
    }
    return (
        <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <TextField
                    label="שם השולח"
                    name="nameOfSender"
                    onChange={handleChangeSubject}
                    variant="outlined"
                    margin="normal"
                    required
                />
            </DialogTitle>
            <DialogTitle id="alert-dialog-title">
                <TextField
                    label="מייל"
                    name="emailofSender"
                    onChange={handleChangeEmail}
                    variant="outlined"
                    margin="normal"
                    required
                />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Textarea
                        required
                        placeholder="הקלד כאן את גוף ההודעה...."
                        name="textMessage"
                        value={message.textMessage}
                        onChange={handleChangeBody}
                        minRows={2}
                        maxRows={4}
                        startDecorator={
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                                    👍
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('👌')}>
                                    👌
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                                    😍
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('😂')}>
                                    😂
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('😭')}>
                                    😭
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('❤️')}>
                                    ❤️
                                </IconButton>
                            </Box>
                        }
                        endDecorator={
                            <Typography level="body3" sx={{ ml: 'auto' }}>
                                {message.textMessage.length} character(s)
                            </Typography>
                        }
                        sx={{ minWidth: 300 }}
                    />          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>סגור</Button>
                <Button onClick={handleSendEmail} autoFocus>
                    שלח
                </Button>
            </DialogActions>
                {errorAfterSubmit && <Alert severity="error">{errorAfterSubmit}</Alert>}
        </Dialog>
    );
}