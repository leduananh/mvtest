import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface VideoItemProps {
    videoId: string;
    title: string;
    sharedBy: string;
    description: string;
}

export const VideoItem: React.FC<VideoItemProps> = ({ videoId, title, sharedBy, description }) => {
    // Generating the src URL with additional parameters for enhanced functionality and security
    // https://youtu.be/1oMgxa32A7g?si=BijYqduJicAsXoOR
    const videoSrc = `https://youtu.be/${videoId}?si=BijYqduJicAsXoORrel=0&modestbranding=1&autohide=1&showinfo=0&playsinline=1`;
    return (
        <Paper elevation={3} sx={{ display: 'flex', margin: 2, overflow: 'hidden' }}>
            <Box
                component="iframe"
                src={videoSrc}
                title="YouTube video player"
                sx={{ width: 480, height: 270 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
            <Box sx={{ padding: 2, flex: 1 }}>
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
