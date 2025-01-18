import { Icon, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useList from '../../redux/Providers/ListProviders';
import { Edit, Save } from '@mui/icons-material';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';


const SideBarAnimate = motion(Box)

const SideBar = () => {
    const location = useLocation();
    const navigator = useNavigate()
    const listInput = useRef(null)
    const { setSnackBar } = useFeedBacks()
    const { currentList, editListName } = useList()
    const [isEditing, setEdit] = useState(false)
    const [selectedIndex, setIndex] = useState(null)

    return (
        <SideBarAnimate
            // initial={{ opacity: 0, x: -500 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 1, ease: 'easeIn' }}
            sx={{
                position: 'fixed',
                top: '60px',
                left: 0,
                width: '20%',
                height: 'calc(100vh - 60px)',
                backgroundColor: 'background.paper',
                boxShadow: 3,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                py: 3,
                overflowY: 'auto',
            }}
        >
            <Stack direction="column" spacing={2} sx={{ px: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.secondary' }}>
                    List
                </Typography>
                {currentList && currentList.map((li, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') === li.path ? 'primary.main' : 'text.primary',
                            backgroundColor: decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') === li.path ? selectedIndex !== index && 'secondary.light' : 'transparent',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            py: 1,
                            px: 2,
                            ":hover": {
                                backgroundColor: isEditing && selectedIndex !== index ? 'primary.light' : !isEditing && 'primary.light',
                                color: decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') === li.path && 'text.primary'
                            },
                        }}>

                        {isEditing && selectedIndex === index ? (
                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={li.name}
                                inputRef={listInput}
                                color="primary"
                                placeholder="Edit List Name"
                                InputProps={{
                                    endAdornment: (
                                        <Icon
                                            sx={{
                                                cursor: 'pointer',
                                                ":hover": { color: 'primary.main' }
                                            }}
                                            onClick={() => {
                                                if (listInput?.current.value === '') {
                                                    listInput?.current.focus()
                                                    setSnackBar(true, 'Please Add List Name')
                                                    return
                                                }
                                                setIndex(null)
                                                setEdit(false)
                                                editListName(li.name, listInput?.current.value)
                                            }}
                                        >
                                            <Save />
                                        </Icon>
                                    ),
                                }}
                            />
                        ) : (
                            <Typography
                                onClick={() => {
                                    decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') !== li.path && navigator(`/${li.path}`)
                                    setEdit(false)
                                }}
                                sx={{
                                    fontSize: '1rem',
                                    flex: 1
                                }}
                            >
                                {li.name}
                            </Typography>
                        )}

                        {
                            isEditing && selectedIndex !== index ? (
                                <Icon
                                    onClick={() => {
                                        if (isEditing) {
                                            setSnackBar(true, 'Please Save Previous Feild First')
                                            return
                                        }
                                        setIndex(index)
                                        setEdit(prev => !prev)
                                    }}
                                    sx={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        ":hover": {
                                            backgroundColor: 'primary.dark',
                                            borderRadius: '10px'
                                        }
                                    }}>
                                    <Edit />
                                </Icon>
                            ) : !isEditing && li.name !== 'Home' && (
                                <Icon
                                    onClick={() => {
                                        setIndex(index)
                                        setEdit(prev => !prev)
                                    }}
                                    sx={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        ":hover": {
                                            color: 'white',
                                            backgroundColor: 'primary.dark',
                                            borderRadius: '10px'
                                        }
                                    }}>
                                    <Edit />
                                </Icon>
                            )
                        }
                    </Box>
                ))}
            </Stack>
        </SideBarAnimate >
    );
};

export default SideBar;
