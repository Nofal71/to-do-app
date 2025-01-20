import React, { useEffect, useState } from 'react'
import { Box, Typography, Stack, Divider, Checkbox, IconButton, useTheme, Tooltip, Button, DialogTitle, DialogContent, Dialog, DialogActions, Collapse } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import ToDoForm from '../common/ToDoForm';
import useList from '../../redux/Providers/ListProviders';
import { motion } from 'framer-motion';
import { TransitionGroup } from 'react-transition-group';

const MotionAnimate = motion(Divider)
// const MotionBox = motion(Box)

const DeleteDialogue = ({ taskId, open, setOpen }) => {
    const { DeleteTask } = useList()
    const location = useLocation()

    const handleDelete = () => {
        DeleteTask(decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' '), taskId)
        handleClose()
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', padding: '16px' }}>
                Delete Task
            </DialogTitle>
            <DialogContent sx={{ padding: '24px', pt: 10 }}>
                Are You Sure To Delete This Task...!
            </DialogContent>
            <DialogActions sx={{ padding: '12px 24px', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} variant='contained'>Cancel</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
            </DialogActions>
        </Dialog>
    )

}

const EditTask = ({ task }) => {

    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    return (
        <>
            {openEdit && (
                <ToDoForm open={openEdit} setOpen={setOpenEdit} defaultValue={task} />
            )}
            {openDelete && (
                <DeleteDialogue taskId={task.id} open={openDelete} setOpen={setOpenDelete} />
            )}
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
            }}>
                <IconButton sx={{ zIndex: '99', }}
                    onClick={() => {
                        setOpenEdit(true)
                    }}
                >
                    <Edit />
                </IconButton>

                <IconButton sx={{ zIndex: '99', }}
                    onClick={() => {
                        setOpenDelete(true)
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
        </>
    )
}

const ListComponent = ({ list }) => {
    const theme = useTheme();
    const location = useLocation()
    const { setMarkAsDone } = useList()

    return (
        <>
            {
                list?.length !== 0 ? (
                    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh', position: 'relative' }}>
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
                                    <Box sx={{ pb: 4 }}>
                                        <Typography variant='h5' color='primary'>Today</Typography>
                                    </Box>
                                )
                            }
                            <Stack spacing={2}>
                                <TransitionGroup>
                                    {list?.map((task, index) => (
                                        <Collapse key={index}>
                                            <Box sx={{ position: 'relative' }} >
                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        {
                                                            location.pathname !== '/home' && (
                                                                <Tooltip title={task.checked ? 'Mark As To Do' : 'Mark As Done'}>
                                                                    <Checkbox
                                                                        sx={{ zIndex: '99' }}
                                                                        checked={task?.checked}
                                                                        onChange={() => {
                                                                            setMarkAsDone(decodeURIComponent(location.pathname.slice(1)).replace(/%20/g, ' '), task?.id)
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            )
                                                        }
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
                                                            {
                                                                task.checked && (
                                                                    <>
                                                                        <MotionAnimate
                                                                            initial={{ scaleX: 0, width: 0 }}
                                                                            animate={{ scaleX: 1, width: 'auto' }}
                                                                            key={task.checked}
                                                                            transition={{
                                                                                duration: 1.5,
                                                                                repeatType: "loop",
                                                                                ease: "easeInOut",
                                                                            }}
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                top: location.pathname === '/home' ? 7 : 16,
                                                                                left: -25,
                                                                                right: -25,
                                                                                py: .5,
                                                                                backgroundColor: '#6c757d',
                                                                                zIndex: '200',
                                                                                borderRadius: '5px',
                                                                                height: 6,
                                                                                transformOrigin: 'left',
                                                                            }}
                                                                        />
                                                                        <Box sx={{
                                                                            position: 'absolute',
                                                                            top: 0,
                                                                            left: 0,
                                                                            right: 0,
                                                                            bottom: 0,
                                                                            background: 'transparent',
                                                                            zIndex: '98',
                                                                        }} />
                                                                    </>
                                                                )
                                                            }
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
                                                        {
                                                            location.pathname !== '/home' && (
                                                                <EditTask task={task} />
                                                            )
                                                        }
                                                    </Stack>
                                                </Stack>
                                                {index < list.length - 1 && (
                                                    <MotionAnimate
                                                        sx={{ my: 2 }}
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{ duration: 1, ease: "easeInOut" }}
                                                    />
                                                )}
                                            </Box>
                                        </Collapse>
                                    ))}
                                </TransitionGroup>
                            </Stack>
                        </Box>
                    </Box>
                ) : (
                    <Typography align='center' color='text.primary' variant='h6' p={5}>No Data Found</Typography>
                )
            }
        </>
    )
}

export default ListComponent;
