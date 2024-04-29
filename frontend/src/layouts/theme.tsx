import React from 'react';
import { Container, Box, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Define any custom types here if needed, for now we use a basic approach
interface LayoutProps {
    children: React.ReactNode;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        text: {
            secondary: '#ffffff',
        },
    },
});
export default theme