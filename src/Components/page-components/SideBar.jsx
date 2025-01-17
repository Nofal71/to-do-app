import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useList from '../../redux/Providers/ListProviders';



const SideBarAnimate = motion(Box)

const SideBar = () => {
    const location = useLocation();
    const navigator = useNavigate()
    const { currentList } = useList()

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
                    <Typography
                        key={index}
                        onClick={() => {
                            decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') !== li.path && navigator(`/${li.path}`)
                        }}
                        sx={{
                            color: decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') === li.path ? 'primary.main' : 'text.primary',
                            backgroundColor: decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') === li.path ? 'secondary.light' : 'transparent',
                            px: 2,
                            py: 1,
                            borderRadius: '10px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            ":hover": {
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        {li.name}
                    </Typography>
                ))}
            </Stack>
        </SideBarAnimate>
    );
};

export default SideBar;
