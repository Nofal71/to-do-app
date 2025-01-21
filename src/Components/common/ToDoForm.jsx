import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Add, Close } from '@mui/icons-material';
import { Icon, InputLabel } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import useList from '../../redux/Providers/ListProviders';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';
import dayjs from 'dayjs';
import { Grid, Box, Typography } from '@mui/material';

export default function ToDoForm({ open, setOpen, defaultValue }) {
    const { addtoData, EditTask } = useList();
    const { setAlert } = useFeedBacks();
    const editValues = {
        task: defaultValue && defaultValue.title,
        tags: defaultValue && defaultValue.tags,
        time: defaultValue && defaultValue.time,
        date: defaultValue && defaultValue.date
    }
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: defaultValue && editValues
    });
    const [tags, setTags] = useState(() =>
        defaultValue ? defaultValue.tags : []
    );
    const tagsRef = useRef();

    const formSubmit = (data) => {
        try {
            if (data.task && tags) {
                !defaultValue ? addList(data) : editList(data);
            } else {
                setAlert('Please complete all fields correctly.', 'error');
            }
        } catch (error) {
            setAlert('Unknown Error!', 'error');
        }
    };

    const addList = (data) => {
        try {
            addtoData(
                {
                    checked: false,
                    title: data.task,
                    time: data.time,
                    date: data.date,
                    tags,
                },
                decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' ')
            );
            setTags([]);
            setAlert('Task Added Successfully', 'success');
            handleClose()
        } catch (error) {
            setAlert('Error adding task', 'error');
        }
    };

    const editList = (data) => {
        try {
            EditTask(
                decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' '),
                {
                    id: defaultValue.id,
                    title: data.task,
                    tags,
                }
            )
            setTags([]);
            setAlert('Task Edited Successfully', 'success');
            handleClose()
        } catch (error) {
            setAlert('Error adding task', 'error');
        }
    };

    const handleAddTag = () => {
        if (tagsRef?.current && tagsRef?.current.value !== '') {
            setTags((prev) => [...prev, tagsRef?.current.value]);
            tagsRef.current.value = '';
        }
    };

    const removeTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
    };


    const handleClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            component={'form'}
            onSubmit={handleSubmit(formSubmit)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', padding: '16px' }}>
                {defaultValue ? 'Edit Task' : 'Add Task'}
            </DialogTitle>
            <DialogContent sx={{ padding: '24px', pt: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel size='large' >Task</InputLabel>
                        <TextField
                            size="small"
                            variant="outlined"
                            fullWidth
                            placeholder={defaultValue ? 'Edit Your Task' : 'Add Your Task...'}
                            sx={{ borderRadius: '8px' }}
                            {...register('task', { required: 'Task is required' })}
                            error={!!errors.task}
                            helperText={errors.task ? errors.task.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel size='large' >Tags</InputLabel>
                        <TextField
                            size="small"
                            variant="outlined"
                            inputRef={tagsRef}
                            fullWidth
                            placeholder='Enter Tags Here...'
                            helperText={'Press + to add Tag'}
                            sx={{ borderRadius: '8px' }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTag()
                                }
                            }}
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
                                            borderRadius: '4px',
                                            mr: 1,
                                            position: 'relative'
                                        }}
                                    >
                                        <Close
                                            onClick={() => removeTag(tag)}
                                            sx={{
                                                height: '.7rem',
                                                width: '.7rem',
                                                display: 'inline-block',
                                                background: 'lightgray',
                                                position: 'absolute',
                                                borderRadius: '25px',
                                                right: -5,
                                                top: -5,
                                                cursor: 'pointer'
                                            }} />
                                        <Typography sx={{ fontSize: '.7rem' }}>{tag}</Typography>
                                    </Box>
                                )),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Select Date For Task"
                                defaultValue={dayjs()}
                                disablePast
                                sx={{ width: '100%' }}
                                {...register('date', { required: 'Date is required' })}
                                error={!!errors.date}
                                helperText={errors.date ? errors.date.message : ''}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Select Time For Task"
                                defaultValue={dayjs()}
                                disablePast
                                sx={{ width: '100%' }}
                                {...register('time', { required: 'Time is required' })}
                                error={!!errors.time}
                                helperText={errors.time ? errors.time.message : ''}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ padding: '12px 24px', justifyContent: 'flex-end' }}>
                <Button
                    color="error"
                    onClick={handleClose}
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        textTransform: 'none',
                        width: '100px',
                        padding: '8px',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        textTransform: 'none',
                        padding: '8px',
                        textWrap: 'nowrap'
                    }}
                >
                    {defaultValue ? 'Save Changes' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
