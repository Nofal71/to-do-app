import React, { useRef } from 'react';
import { Button, TextField, Typography } from '@mui/material';
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

    const location = useLocation();
    const theme = useTheme();
    const date = new Date();
    const { addtoData } = useList();
    const { setNewConfirm, setSnackBar, setAlert } = useFeedBacks();

    return (
        <Box mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                Welcome User! 👋
            </Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                {`Today, ${date.toLocaleString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`}
            </Typography>

            {location.pathname !== '/home' && (
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mt: 6 }}
                        onClick={() =>
                            setNewConfirm(true, () => {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Typography color="text.primary" variant="h5">
                                            Add Task
                                        </Typography>
                                        <Stack direction={'column'} spacing={3}>
                                            <Stack direction={'column'} spacing={2}>
                                                <TextField
                                                    label="Task"
                                                    size="small"
                                                    variant="outlined"
                                                    inputRef={taskRef}
                                                    sx={{ flex: 1 }}
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

                                        <Stack direction="row" spacing={2} sx={{ ml: 'auto', mt: 3 }}>
                                            <Button color="error" variant="contained" onClick={() => setNewConfirm(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    if (!taskRef.current || taskRef.current.value === '') {
                                                        setSnackBar(true, 'Please Fill All Fields...!');
                                                        taskRef.current?.focus();
                                                    } else {
                                                        console.log(dateRef?.current.value, 'date');
                                                        try {
                                                            addtoData(
                                                                {
                                                                    title: taskRef?.current.value,
                                                                    time: timeRef?.current.value,
                                                                    tags: [],
                                                                },
                                                                decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' ')
                                                            );
                                                            setNewConfirm(false);
                                                            setAlert('Task Added Successfully', 'success');
                                                        } catch (error) {
                                                            setAlert('Unknown Error!', 'error');
                                                        }
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Stack>
                                    </Box>
                                );
                            })
                        }
                    >
                        <Add />
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ListHead;
