import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import useFeedBacks from '../redux/Providers/FeedBacksProviders';

const ThemeConfig = ({ children }) => {
    const { theme_mode } = useFeedBacks();

    const lightThemePalette = {
        mode: 'light',
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        primary: {
            light: '#A8A8A8',
            main: '#B0BEC5',
            dark: '#757575',
            contrastText: '#000000',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    };

    const darkThemePalette = {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1D1D1D',
        },
        primary: {
            light: '#66BB6A',
            main: '#388E3C',
            dark: '#1B5E20',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#B0BEC5',
        },
    };

    const theme = createTheme({
        palette: theme_mode === 'dark' ? darkThemePalette : lightThemePalette,
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme_mode === 'light' ? '#E0E0E0' : '#B0BEC5',
                            borderWidth: '2px',
                        },
                    },
                    notchedOutline: {
                        borderColor: '#B0BEC5',
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: theme_mode === 'dark' ? '#E0E0E0' : '#E0E0E0',
                        '&.Mui-focused': {
                            color: '#fff',
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeConfig;
