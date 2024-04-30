import React, { CSSProperties, ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../app/config";

interface ShareVideosBtnProps {
  style?: CSSProperties;
  text?: string;
  toLink?: string;
  children?: ReactNode;
}

export const ShareVideosBtn: React.FC<ShareVideosBtnProps> = ({
  text = "share a video",
  toLink = config.ROUTES.VIDEO_SHARE,
  style = {},
}) => {
  return (
    <Link to={toLink}>
      <Button style={style}>
        <Typography style={{ textWrap: "nowrap" }}>{text}</Typography>
      </Button>
    </Link>
  );
};
