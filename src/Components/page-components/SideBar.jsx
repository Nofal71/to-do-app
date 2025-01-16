import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const List = [
    { text: 'Home', path: '/' },
    { text: 'Completed', path: '/completed' },
    { text: 'ToDo', path: '/todo' },
];

const SideBarAnimate = motion(Box)

const SideBar = () => {
    const location = useLocation();

    return (
        <SideBarAnimate
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeIn' }}
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
                {List.map((li, index) => (
                    <Typography
                        key={index}
                        component={Link}
                        to={li.path}
                        sx={{
                            textDecoration: 'none',
                            color: location.pathname === li.path ? 'primary.main' : 'text.primary',
                            backgroundColor: location.pathname === li.path ? 'secondary.light' : 'transparent',
                            px: 2,
                            py: 1,
                            borderRadius: '10px',
                            fontSize: '1rem',
                            ":hover": {
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        {li.text}
                    </Typography>
                ))}
            </Stack>
        </SideBarAnimate>
    );
};

export default SideBar;
