// src/components/Button/Button.tsx

import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

// Define an interface that extends the MUIButtonProps from Material-UI
interface ButtonPropsExtended extends ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonPropsExtended> = ({
  children,
  variant = "contained",
  color = "primary",
  ...props
}) => {
  return (
    <MUIButton variant={variant} color={color} {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
