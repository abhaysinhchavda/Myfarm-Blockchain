import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { Fragment } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
  handleClose: () => void;
}

const MiniSnackBar = ({
  open,
  message,
  severity,
  handleClose,
}: SnackbarProps) => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        message={message}
        key={0}
        autoHideDuration={5000}
        onClose={() => handleClose()}
        className="mySnack"
      >
        <Alert severity={severity} sx={{ width: "90%" }} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default MiniSnackBar;
