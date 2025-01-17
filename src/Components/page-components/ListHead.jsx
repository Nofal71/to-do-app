import { Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import React, { useRef, useState } from 'react';
import useList from '../../redux/Providers/ListProviders';
import { useLocation } from 'react-router-dom';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';
import { Add } from '@mui/icons-material';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

const ListHead = () => {
    const [taskDate, setTaskDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [taskTime, setTaskTime] = useState('08:00');

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
                                        <InputLabel sx={{ color: 'text.secondary' }} size="small">
                                            Task
                                        </InputLabel>
                                        <TextField size="small" variant="outlined" inputRef={taskRef} sx={{ flex: 1 }} />
                                        <InputLabel sx={{ color: 'text.secondary' }} size="small">
                                            Date
                                        </InputLabel>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                readOnly
                                                value={taskDate.toDateString()}
                                                inputRef={dateRef}
                                                sx={{ flex: 1 }}
                                            />
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => setCalendarOpen((prev) => !prev)}
                                            >
                                                {calendarOpen ? 'Close Calendar' : 'Open Calendar'}
                                            </Button>
                                        </Stack>
                                        {calendarOpen && (
                                            <Box sx={{ position: 'absolute', zIndex: 999 }}>
                                                <Calendar
                                                    onChange={(newDate) => {
                                                        setTaskDate(newDate);
                                                        setCalendarOpen(false);
                                                    }}
                                                    value={taskDate}
                                                />
                                            </Box>
                                        )}
                                        <InputLabel sx={{ color: 'text.secondary' }} size="small">
                                            Time
                                        </InputLabel>
                                        <TimePicker
                                            value={taskTime}
                                            onChange={setTaskTime}
                                            disableClock={true}
                                            clearIcon={null}
                                            clockIcon={null}
                                            format="HH:mm:ss"
                                            className="time-picker"
                                        />
                                        <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
                                            <Button color="error" variant="contained" onClick={() => setNewConfirm(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    if (
                                                        !taskRef.current ||
                                                        taskRef.current.value === '' ||
                                                        !dateRef.current.value ||
                                                        !timeRef.current.value
                                                    ) {
                                                        setSnackBar(true, 'Please Fill All Fields...!');
                                                        taskRef.current?.focus();
                                                    } else {
                                                        try {
                                                            addtoData(
                                                                {
                                                                    title: taskRef.current.value,
                                                                    time: taskTime,
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
