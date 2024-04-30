import React, { CSSProperties, ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface ShareVideosBtnProps {
  style?: CSSProperties;
  text?: string;
  toLink?: string;
  children?: ReactNode;
}

export const ShareVideosBtn: React.FC<ShareVideosBtnProps> = ({
  text = "share a video",
  toLink = "/share-youtube",
  style = { padding: 5 },
}) => {
  return (
    <Link to={toLink}>
      <Button style={style}>
        <Typography>{text}</Typography>
      </Button>
    </Link>
  );
};
