import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/system';
import ToDoForm from '../common/ToDoForm';

const ListHead = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const date = new Date();

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
                    <ToDoForm open={openDialog} setOpen={setOpenDialog} />
                </Box>
            )}
        </Box>
    );
};

export default ListHead;
