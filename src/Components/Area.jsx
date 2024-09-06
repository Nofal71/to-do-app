import React, { useState } from 'react'
import InputFeild from './InputFeild'
import { Box, Stack, Typography } from '@mui/material'
import ToDoFeild from './ToDoFeild';

const Area = () => {
    const [input, setInput] = useState();
    const [list, setList] = useState([]);


    const handleClick = () => {
        if (input) {
            setList(prev => [...prev, input]);
            setInput('')
        }
    }

    return (
        <>
            <Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'} padding={'40px'}>
                    <InputFeild
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        handleClick={handleClick}
                    />
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    gap={'10px'}
                    padding={'40px  200px'}
                    sx={{ backgroundColor: 'lightblue', width: 'calc(50%)' }}>
                    {
                        list.length !== 0 ? list.map((data, index) => (
                            <ToDoFeild key={index} data={data} onClick={() => {
                                const newList = list.filter((newData, i) => i !== index)
                                setList(newList)
                            }} />
                        ))
                        : 
                        <Typography variant='h5'>No List Found</Typography>
                    }
                </Box>
            </Stack>
        </>
    )
}

export default Area
