import React from 'react'
import { Box, Typography, Stack, Divider, Checkbox, IconButton, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ListComponent = ({ list }) => {
    const theme = useTheme();
    return (
        <>
            {
                list?.length !== 0  ? (
                    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                                p: 3,
                                boxShadow: theme.shadows[2],
                            }}
                        >
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
                                                    {task.tags.length > 0 && (
                                                        <Stack direction="row" spacing={1} mt={0.5}>
                                                            {task.tags.map((tag, tagIndex) => (
                                                                <Typography
                                                                    key={tagIndex}
                                                                    variant="caption"
                                                                    sx={{
                                                                        backgroundColor: theme.palette.primary.light,
                                                                        color: theme.palette.primary.contrastText,
                                                                        px: 1,
                                                                        borderRadius: 1,
                                                                        fontSize: '0.75rem',
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </Typography>
                                                            ))}
                                                        </Stack>
                                                    )}
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
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
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
