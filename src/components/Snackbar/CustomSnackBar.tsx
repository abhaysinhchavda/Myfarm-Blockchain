import React from "react";
import MiniSnackBar from ".";
import {
  useCloseSnackBar,
  useStatusSnackBar,
} from "../../store/application/hooks";

export const CustomSnackBar = () => {
  const { open, message, severity } = useStatusSnackBar();
  const closeSnackbar = useCloseSnackBar();

  return (
    <>
      <MiniSnackBar
        open={open}
        message={message}
        severity={severity}
        handleClose={() => closeSnackbar()}
      />
    </>
  );
};
