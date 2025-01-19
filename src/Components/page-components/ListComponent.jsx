import React, { useState } from 'react'
import { Box, Typography, Stack, Divider, Checkbox, IconButton, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import ToDoForm from '../common/ToDoForm';


const EditTask = ({ task }) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            {open && (
                <ToDoForm open={open} setOpen={setOpen} defaultValue={task} />
            )}
            <IconButton
                onClick={() => {
                    setOpen(true)
                }}
            >
                <Edit />
            </IconButton>
        </>
    )
}

const ListComponent = ({ list }) => {
    const theme = useTheme();
    const location = useLocation()
    return (
        <>
            {
                list?.length !== 0 ? (
                    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                                p: 3,
                                boxShadow: theme.shadows[2],
                            }}
                        >
                            {
                                location.pathname === '/home' && (
                                    <Box sx={{
                                        pb: 4
                                    }}>
                                        <Typography variant='h5' color='primary'>Today</Typography>
                                    </Box>
                                )
                            }
                            <Stack spacing={2}>
                                {list?.map((task, index) => (
                                    <Box key={index}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Checkbox />
                                                <Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: 500,
                                                            color: theme.palette.text.primary,
                                                        }}
                                                    >
                                                        {task.title}
                                                    </Typography>
                                                    {task?.tags.length > 0 && task?.tags.map((tag, index) => (
                                                        <Typography
                                                            variant="caption"
                                                            key={index}
                                                            sx={{
                                                                backgroundColor: theme.palette.primary.light,
                                                                color: theme.palette.primary.contrastText,
                                                                px: 1,
                                                                borderRadius: 1,
                                                                fontSize: '0.75rem',
                                                                mr: 1
                                                            }}
                                                        >
                                                            {tag}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: theme.palette.text.secondary,
                                                    }}
                                                >
                                                    {task.time}
                                                </Typography>
                                                <EditTask task={task} />
                                            </Stack>
                                        </Stack>
                                        {index < list.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Typography align='center' color='text.primary' variant='h6' p={5}>No Data Found</Typography>
                    </>
                )
            }
        </>
    )
}

export default ListComponent
