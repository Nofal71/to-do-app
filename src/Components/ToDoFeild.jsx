import { Box, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const ToDoFeild = ({ data, onClick }) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [isDone, setIsDone] = useState(false);

    const markAsDone = () => {
        setIsDone(!isDone);
    }


    return (
        <>
            <Box className="slideInDown"
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                boxShadow={'2px 2px 8px black'}
                maxWidth={'500px'}
                minWidth={'500px'}
                padding={'10px'}
                sx={{
                    backgroundColor: isDone ? 'lightgreen' : '#ff6b6b'
                }}>
                <Checkbox onClick={markAsDone} {...label
                } sx={{ padding: '10px' }} value={isDone} />
                <Typography
                    padding={'10px'}
                    variant='subtitle2'
                    flexGrow={1}
                    sx={{
                        maxWidth: '500px',
                        textDecoration: isDone ? 'line-through' : 'none',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal'
                    }}
                >
                    {data && data}
                </Typography>
                <CloseIcon onClick={onClick} sx={{ padding: '10px', ":hover": { cursor: 'pointer', backgroundColor: 'lightgray' } }} />
            </Box >

        </>
    )
}

export default ToDoFeild
