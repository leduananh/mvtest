import React, { useEffect } from "react";
import { VideoItem } from "./videoItem";
import { Pagination } from "@mui/material";
import usePaginateVideos from "./usePaginateVideos";
import config from "../../app/config";
import { AlertType, useAlert } from "../../shared/hooks";
import { OverLayLoading } from "../../shared/components/OverLayLoading";
import _ from "lodash";

export const VideoItemList: React.FC<{}> = () => {
  const { apiError, isLoading, paginateVideo, setVideoPage } = usePaginateVideos()
  const { showAlert } = useAlert()
  
  const isShowVideos = _.isNil(apiError) && paginateVideo?.data && !_.isEmpty(paginateVideo?.data)
  
  useEffect(() => {
    setVideoPage({ page: 1, per_page: config.COMMON.PAGINATE.per_page })
  }, [])

  useEffect(() => {
    if (!_.isNil(apiError)) {
      showAlert("Can't load youtube share clip for now, reload or try it later thanks!!!", { type: AlertType.Error });
    }
  }, [apiError]);

  return (<>
    <OverLayLoading open={isLoading} />

    {isShowVideos && paginateVideo?.data.map(video => {
      return (
        <VideoItem
          videoId={video.attributes.videoId}
          title={video.attributes.title}
          description={video.attributes.description}
          sharedBy={video.attributes.sharedBy}
          key={video.id}
        ></VideoItem>
      )
    })}

    {isShowVideos && <Pagination count={paginateVideo?.meta?.total_pages} />}

  </>);
};
