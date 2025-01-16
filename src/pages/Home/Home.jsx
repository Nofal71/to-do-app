import React from 'react'
import useFeedBacks from '../../redux/Providers/FeedBacksProviders'
import { Box, Typography, Stack, Divider, Checkbox, IconButton, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const tasks = [
  { title: "Read a book", time: "08:00 - 09:00", tags: [] },
  { title: "Moodboard Landing Page", time: "11:00 - 13:00", tags: ["Mobal Project"] },
];

const Home = () => {
  const theme = useTheme();
  const date = new Date();
  const { setSnackBar, setAlert, setConfirm, setNewConfirm } = useFeedBacks()

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          Good Morning, Sullivan! 👋
        </Typography>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
          {`Today, ${date.toLocaleString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`}
        </Typography>

      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          p: 3,
          boxShadow: theme.shadows[2],
        }}
      >
        <Stack spacing={2}>
          {tasks.map((task, index) => (
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
              {index < tasks.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;


// <Box p={5} display={'flex'} gap={4}>
//   <Button
//     color='primary'
//     variant='contained'
//     onClick={() => setSnackBar(true, "Snack Opened", () => setAlert("Snack Bar Undo Done ", "info"))} > Open SnackBar with Undo </Button>
//   <Button
//     color='primary'
//     variant='contained'
//     onClick={() => setSnackBar(true, "Snack Opened")} > Open SnackBar </Button>
//   <Button
//     color='primary'
//     variant='contained'
//     onClick={() => setConfirm(true, 'Test Dialogue', 'This is Test Confim Dialogue', [
//       { lable: 'Action 1', sx: { background: 'primary.light' }, variant: 'contained', handler: () => setAlert("Action One Clicked", 'warning') },
//       { lable: 'Action 2', sx: { background: 'primary.light' }, handler: () => setAlert("Action Two Clicked", 'warning') },
//     ])} > Open Confirm </Button>
//   <Button
//     color='primary'
//     variant='contained'
//     onClick={() => setNewConfirm(true, () => {
//       return (
//         <>
//           <Typography>New Confim Dialogue</Typography>
//           <Button onClick={() => setNewConfirm(false)} >Close</Button>
//         </>
//       )
//     })} > Open New Confirm </Button>
// </Box>