import React from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

export const VideoShareForm: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 5
                }}
            >
                <Typography variant="h6" sx={{ alignSelf: 'flex-start', mb: 2 }}>
                    Share Videos
                </Typography>
                <TextField
                    label="Share Videos"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth>
                    Share
                </Button>
            </Box>
        </Container>
    );
};
