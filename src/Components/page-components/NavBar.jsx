import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Icon, Input, InputAdornment, InputLabel, styled, Switch, TextField } from '@mui/material';
import useFeedBacks from '../../redux/Providers/FeedBacksProviders';
import { motion } from 'framer-motion';
import { Add, Search } from '@mui/icons-material';
import useList from '../../redux/Providers/ListProviders';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const AnimateAppBar = motion(AppBar)

const pages = [];
const settings = ['Reset'];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#003892',
        }),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
        ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
        }),
    },
}));


function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [scale, setScale] = React.useState(true);
    const inputRef = React.useRef()
    const navigator = useNavigate()


    const { toggleTheme, theme_mode, setNewConfirm, setSnackBar, setAlert } = useFeedBacks();
    const { addToList } = useList()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        localStorage.clear()
        navigator('/home')
        window.location.reload()
    };

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setScale(true);
            } else {
                setScale(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AnimateAppBar
            // initial={{ y: -70 }}
            // animate={{ y: 0 }}
            // transition={{ duration: .5, ease: 'easeIn' }}
            position="sticky"
            sx={{
                transform: scale ? "scaleY(1)" : "scaleY(0.85)",
                opacity: !scale ? '.5' : 1,
                transformOrigin: "center top",
                transition: 'opacity .7s ease, border-bottom .7s ease, transform .7s ease',
                height: '60px',
                ":hover": {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ height: '30px' }} disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        To Do List
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {/* Mobile */}
                        To Do
                    </Typography>


                    <Box sx={{ flexGrow: 1, gap: 2, display: { xs: 'none', md: 'flex' }, mx: { md: '1rem' }, alignItems: 'center' }}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Search"
                            variant="outlined"
                            color='primary'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment sx={{ cursor: 'pointer' }} position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Tooltip title='Create New List'>

                            <Button
                                color='primary'
                                variant='contained'
                                onClick={() => setNewConfirm(true, () => {
                                    return (
                                        <Box
                                            component={'form'}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 3
                                            }}>
                                            <Typography color='text.primary' variant='h5'>Add List</Typography>
                                            <InputLabel sx={{ color: 'text.secondary' }} size='small'>Name of List</InputLabel>
                                            <TextField size='small' variant='outlined' inputRef={inputRef} sx={{
                                                flex: 1
                                            }} />
                                            <Stack direction={'row'} spacing={2} sx={{
                                                ml: 'auto'
                                            }}>
                                                <Button color='error' variant='contained' onClick={() => setNewConfirm(false)}>Cancel</Button>
                                                <Button
                                                    variant="contained"
                                                    type='submit'
                                                    onClick={() => {
                                                        if (!inputRef.current || inputRef?.current.value === '') {
                                                            setSnackBar(true, 'Please Fill All Fields...!');
                                                            inputRef.current?.focus()
                                                        } else {
                                                            try {
                                                                addToList(inputRef?.current.value, inputRef?.current.value.toLowerCase());
                                                                setNewConfirm(false)
                                                                setAlert('List Created Successfully', 'success');
                                                            } catch (error) {
                                                                setAlert('Unkown Error!', 'error');
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>

                                            </Stack>
                                        </Box>
                                    )
                                })
                                } >
                                <Add />
                            </Button>
                        </Tooltip>
                    </Box>

                    <MaterialUISwitch sx={{ m: 1 }} size='small' onClick={() => toggleTheme('dark')} defaultChecked={theme_mode == 'dark' ? true : false} />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp">N</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AnimateAppBar>
    );
}
export default NavBar;
