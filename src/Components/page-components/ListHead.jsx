import React, { useRef, useState } from 'react';
import {
    Button,
    Icon,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import { Add } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation } from 'react-router-dom';
import useList from '../../redux/Providers/ListProviders';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';
import dayjs from 'dayjs';

const ListHead = () => {
    const taskRef = useRef(null);
    const dateRef = useRef(null);
    const timeRef = useRef(null);
    const tagsRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const date = new Date();
    const { addtoData } = useList();
    const { setSnackBar, setAlert } = useFeedBacks();

    const addList = () => {
        if (!taskRef.current || taskRef.current.value === '' || tagsRef.current.value) {
            tagsRef.current.value ? setSnackBar(true, 'Add Tag ...!') : setSnackBar(true, 'Please Fill All Fields...!');
            taskRef.current?.focus();
        } else {
            try {
                addtoData(
                    {
                        title: taskRef?.current.value,
                        time: timeRef?.current.value,
                        tags,
                    },
                    decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' ')
                );
                setTags([]);
                setOpenDialog(false);
                setAlert('Task Added Successfully', 'success');
            } catch (error) {
                setAlert('Unknown Error!', 'error');
            }
        }
    };

    const handleAddTag = () => {
        if (tagsRef?.current && tagsRef?.current.value !== '') {
            setTags((prev) => [...prev, tagsRef?.current.value]);
            tagsRef.current.value = '';
        }
    };

    return (
        <Box mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                Welcome User! 👋
            </Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                {`Today, ${date.toLocaleString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleString(
                    'en-US',
                    { month: 'long' }
                )}, ${date.getFullYear()}`}
            </Typography>
            {location.pathname !== '/home' && (
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mt: 6 }}
                        onClick={() => setOpenDialog(true)}
                    >
                        <Add />
                    </Button>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogContent>
                            <Stack direction={'column'} spacing={3}>
                                <Stack direction={'column'} spacing={2}>
                                    <TextField
                                        label="Task"
                                        size="small"
                                        variant="outlined"
                                        inputRef={taskRef}
                                        sx={{ flex: 1 }}
                                    />
                                    <TextField
                                        label="Tags"
                                        size="small"
                                        variant="outlined"
                                        inputRef={tagsRef}
                                        sx={{ flex: 1 }}
                                        InputProps={{
                                            endAdornment: (
                                                <Icon
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ':hover': { color: 'primary.main' },
                                                    }}
                                                    onClick={handleAddTag}
                                                >
                                                    <Add />
                                                </Icon>
                                            ),
                                            startAdornment: tags.map((tag, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        display: 'inline-grid',
                                                        placeItems: 'center',
                                                        background: 'lightGreen',
                                                        color: 'black',
                                                        px: 1,
                                                        mr: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '.7rem' }}>{tag}</Typography>
                                                </Box>
                                            )),
                                        }}
                                    />
                                </Stack>
                                <Stack direction={'column'} spacing={2}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Select Date For Task"
                                            defaultValue={dayjs()}
                                            inputRef={dateRef}
                                            disablePast
                                            orientation="landscape"
                                            sx={{ width: '100%' }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack direction={'column'} spacing={2}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Select Time For Task"
                                            defaultValue={dayjs()}
                                            inputRef={timeRef}
                                            disablePast
                                            sx={{ width: '100%' }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" variant="contained" onClick={addList}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </Box>
    );
};

export default ListHead;
