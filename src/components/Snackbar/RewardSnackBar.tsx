import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface IsProps {
    open: boolean
    message: string
    severity: "error" | "info" | "success" | "warning";
    handleClose: () => void
}

const RewardSnackbar = ({ open, message, severity, handleClose }: IsProps) => {


  

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>


        </Stack>
    );
}
export default RewardSnackbar