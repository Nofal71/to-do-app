import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

const InputFeild = ({ onChange, value, handleClick }) => { 
    return (
        <Stack direction={'row'} spacing={2} padding={'10px'} alignItems={'center'} justifyContent={'center'}>
            <FormatListBulletedRoundedIcon />
            <Typography variant='h6'>To Do List</Typography>
            <TextField
                type='text'
                value={value}
                onChange={onChange} 
                placeholder='Type Something ...'
                multiline
                sx={{ width: '500px' }}
            />
            <Button onClick={handleClick} endIcon={<DownloadDoneIcon />}>Save</Button>
        </Stack>
    )
}

export default InputFeild
