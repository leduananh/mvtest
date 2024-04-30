import { useSnackbar, OptionsWithExtraProps } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface AlertOptions {
  type?: AlertType;
  autoHideDuration?: number;
  isIncludeCloseBtn?: boolean;
}

type ShowAlertFn = (msg: string, options?: AlertOptions) => void;

export enum AlertType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

interface Alert {
  showAlert: ShowAlertFn;
}

const useAlert = (): Alert => {
  const snackBar = useSnackbar();

  const showAlert: ShowAlertFn = (
    msg,
    options = { type: AlertType.Success, autoHideDuration: 1500, isIncludeCloseBtn: true },
  ) => {
    const snackBarOpt: OptionsWithExtraProps<AlertType> = {
      variant: options.type,
      autoHideDuration: options.autoHideDuration,
    };
    if (options.isIncludeCloseBtn) {
      snackBarOpt.action = (key) => {
        return (
          <IconButton
            size="small"
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => snackBar.closeSnackbar(key)}
          >
            <Close fontSize="small" />
          </IconButton>
        );
      };
    }
    snackBar.enqueueSnackbar(msg, snackBarOpt);
  };

  return { showAlert };
};

export default useAlert;
