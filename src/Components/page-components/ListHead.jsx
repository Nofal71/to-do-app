import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system'
import React, { useEffect, useRef } from 'react'
import useList from '../../redux/Providers/ListProviders';
import { useLocation } from 'react-router-dom';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';
import { Add } from '@mui/icons-material';

const ListHead = () => {
    const theme = useTheme();
    const date = new Date();
    const { addtoData, currentList } = useList()
    const { setNewConfirm, setSnackBar, setAlert } = useFeedBacks()
    const inputRef = useRef()
    const location = useLocation()

    return (
        <>
            <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    Good Morning, Sullivan! 👋
                </Typography>
                <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                    {`Today, ${date.toLocaleString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`}
                </Typography>

                <Box>
                    <Button
                        color='primary'
                        variant='contained'
                        sx={{
                            mt: 6
                        }}
                        onClick={() => setNewConfirm(true, () => {
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3
                                    }}>
                                    <Typography color='text.primary' variant='h5'>Add Task</Typography>
                                    <InputLabel sx={{ color: 'text.secondary' }} size='small'>Task</InputLabel>
                                    <TextField size='small' variant='outlined' inputRef={inputRef} sx={{
                                        flex: 1
                                    }} />
                                    <Stack direction={'row'} spacing={2} sx={{
                                        ml: 'auto'
                                    }}>
                                        <Button color='error' variant='contained' onClick={() => setNewConfirm(false)}>Cancel</Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                if (!inputRef.current || inputRef?.current.value === '') {
                                                    setSnackBar(true, 'Please Fill All Fields...!');
                                                    inputRef.current?.focus()
                                                } else {
                                                    try {
                                                        addtoData({ title: inputRef?.current.value, time: "08:00 - 09:00", tags: [] }, decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' '))
                                                        setNewConfirm(false)
                                                        setAlert('Task Added Successfully', 'success');
                                                    } catch (error) {
                                                        setAlert('Unkown Error!', 'error');
                                                    }
                                                }
                                            }}
                                        >
                                            Add
                                        </Button>

                                    </Stack>
                                </Box>
                            )
                        })} >
                        <Add />
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default ListHead
