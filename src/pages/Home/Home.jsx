import React from 'react'
import { Box, useTheme } from '@mui/material';
import ListComponent from '../../Components/page-components/ListComponent';
import ListHead from '../../Components/page-components/ListHead';

const tasks = {
  list: 'Home',
  data: [
    { title: "Read a book", time: "08:00 - 09:00", tags: [] },
    { title: "Moodboard Landing Page", time: "11:00 - 13:00", tags: ["Mobal Project"] },
  ]
};

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <ListHead />
      <ListComponent list={tasks.data} />
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