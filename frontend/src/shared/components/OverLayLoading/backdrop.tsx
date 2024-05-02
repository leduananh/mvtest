import React from "react";
import { Backdrop, Box, CircularProgress, Theme, Typography } from "@mui/material";
import _ from "lodash";

export interface OverLayOptions {
  isBlackOut?: boolean;
  showText?: {
    text: string;
    color?: 'black' | 'white';
    anchor?: 'top' | 'bottom';
    isBold?: boolean;
  }
  spinnerColor?: 'black' | 'white' | 'default'
}

interface OverLayLoadingProps {
  open: boolean;
  options?: OverLayOptions
}

const OverLayLoading: React.FC<OverLayLoadingProps> = ({ open, options }) => {
  const overLayStyles: any = { color: "#fff", zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }
  const overLayTextStyles: any = { textWrap: "nowrap" }

  if (options?.isBlackOut) {
    overLayStyles.bgcolor = "black"
  }

  if (!_.isNil(options?.spinnerColor) && options?.spinnerColor !== 'default') {
    overLayStyles.color = options?.spinnerColor === "black" ? "#000000" : "#ffffff";
  }

  if (options?.showText?.color) {
    overLayTextStyles.color = options?.showText?.color === "black" ? "#000000" : "#ffffff";
  }

  if (options?.showText?.isBold) {
    overLayTextStyles.fontWeight = "bolder";
  }
  return (
    <Backdrop sx={overLayStyles} open={open}>
      <Box display='flex' justifyContent='center' alignItems='center' position='relative'>
        <CircularProgress color="inherit" />
        {!_.isEmpty(options?.showText?.text) ? options?.showText?.anchor === 'top' ?
          <Typography position='absolute' bottom='100%' style={overLayTextStyles}>{options?.showText?.text}</Typography>
          : <Typography position='absolute' top='100%' style={overLayTextStyles}>{options?.showText?.text}</Typography> : <></>}
      </Box>
    </Backdrop>
  );
};

export default OverLayLoading;
