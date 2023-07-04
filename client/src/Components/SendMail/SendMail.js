import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField/TextField';
import Card from '@mui/material/Card/Card';
import Modal from '@mui/material/Modal';
import { saveMessage } from '../../store/manager/managerActions';
import Header from '../Header/Header';
import './SendMail.css';

export default function SendEmail({show, handleClose}) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.manager);
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState();
    const [message, setMessage] = React.useState({
        subject: '',
        body: ''
    });

    const handleChangeSubject = (e) => {
        setMessage({ ...message, subject: e.target.value });
    }
    const handleChangeBody = (e) => {
        setMessage({ ...message, body: e.target.value });
    }

    const handleSendEmail = () => {
        if (!data.messages) {
            dispatch(saveMessage([{ id: 0, from: "yufi@sjdls", ...message }]));
        } else {
            const messages = data.messages;
            messages.push({ id: messages.length, from: "ndkwn@jklj", ...message });
            // TODO: שמירת ההודעה למנהל
            dispatch(saveMessage(messages));
            handleClose(false);
        }
    }
    return (
        <Modal
            keepMounted
            open={show}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">
            <Card variant="outlined">
                <FormControl>
                    <FormLabel>שליחת מייל למנהל</FormLabel>
                    <TextField
                        label="נושא"
                        name="subject"
                        onChange={handleChangeSubject}
                        variant="outlined"
                        margin="normal" />
                    <Textarea
                        placeholder="הקלד כאן את ההודעה..."
                        onChange={handleChangeBody}
                        minRows={3}
                        endDecorator={
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 'var(--Textarea-paddingBlock)',
                                    pt: 'var(--Textarea-paddingBlock)',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    flex: 'auto',
                                }}
                            >
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    onClick={(event) => setAnchorEl(event.currentTarget)}
                                >
                                    <FormatBold />
                                    <KeyboardArrowDown fontSize="md" />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    size="sm"
                                    placement="bottom-start"
                                    sx={{ '--ListItemDecorator-size': '24px' }}
                                >
                                    {['200', 'normal', 'bold'].map((weight) => (
                                        <MenuItem
                                            key={weight}
                                            selected={fontWeight === weight}
                                            onClick={() => {
                                                setFontWeight(weight);
                                                setAnchorEl(null);
                                            }}
                                            sx={{ fontWeight: weight }}
                                        >
                                            <ListItemDecorator>
                                                {fontWeight === weight && <Check fontSize="sm" />}
                                            </ListItemDecorator>
                                            {weight === '200' ? 'lighter' : weight}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <IconButton
                                    variant={italic ? 'soft' : 'plain'}
                                    color={italic ? 'primary' : 'neutral'}
                                    aria-pressed={italic}
                                    onClick={() => setItalic((bool) => !bool)}
                                >
                                    <FormatItalic />
                                </IconButton>
                                <Button onClick={handleSendEmail} sx={{ ml: 'auto' }}>שלח</Button>
                            </Box>
                        }
                        sx={{
                            minWidth: 300,
                            fontWeight,
                            fontStyle: italic ? 'italic' : 'initial',
                        }}
                    />
                </FormControl>
            </Card>
        </Modal>

    );
}