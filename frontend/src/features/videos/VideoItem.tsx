import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface VideoItemProps {
    videoId: string;
    title: string;
    sharedBy: string;
    description: string;
}

export const VideoItem: React.FC<VideoItemProps> = ({ videoId, title, sharedBy, description }) => {
    // Correct the src URL for iframe embedding
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Paper sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, margin: 2, overflow: 'hidden' }}>
            <Box
                component="iframe"
                src={videoSrc}
                title="YouTube video player"
                sx={{
                    flex: { xs: '1', md: '0' },
                    height: { xs: 180, md: 'auto' },
                    width: { xs: '100%', md: 320 }
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
            <Box sx={{ padding: 2, flex: { xs: 'auto', md: 5 }, marginLeft: { xs: 0, md: 2 } }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    Shared by {sharedBy}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                    Description
                </Typography>
                <Typography variant="body2">{description}</Typography>
            </Box>
        </Paper>
    );
};
