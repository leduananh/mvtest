

import React from 'react';
import { VideoItem } from '../../features/videos';
import { Pagination } from '@mui/material';

export const HomePage: React.FC = () => {
    return (
        <div className='page-container' style={{padding: '0 20%', overflowY: 'hidden'}}>
            <VideoItem videoId='PMivT7MJ41M' title='asdasd' description='asdasd' sharedBy='asdasdsda' key={11111}></VideoItem>
            <VideoItem videoId='PMivT7MJ41M' title='asdasd' description='asdasd' sharedBy='asdasdsda' key={11111}></VideoItem>

            <VideoItem videoId='PMivT7MJ41M' title='asdasd' description='asdasd' sharedBy='asdasdsda' key={11111}></VideoItem>

            <VideoItem videoId='PMivT7MJ41M' title='asdasd' description='asdasd' sharedBy='asdasdsda' key={11111}></VideoItem>
            <Pagination count={10} size="small" />

        </div>
    );
};
