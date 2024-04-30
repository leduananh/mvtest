import React from "react";
import { VideoItem } from "./videoItem";
import { Pagination } from "@mui/material";

export const VideoItemList: React.FC<{}> = () => {
  return (
    <>
      <VideoItem
        videoId="PMivT7MJ41M"
        title="asdasd"
        description="asdasd"
        sharedBy="asdasdsda"
        key={11111}
      ></VideoItem>
      <VideoItem
        videoId="PMivT7MJ41M"
        title="asdasd"
        description="asdasd"
        sharedBy="asdasdsda"
        key={11111}
      ></VideoItem>

      <Pagination count={10} size="small" />
    </>
  );
};
