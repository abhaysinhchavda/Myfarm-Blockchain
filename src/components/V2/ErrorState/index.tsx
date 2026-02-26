import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
interface IsErrorState {
    show: boolean
    error: string
}
const ErrorState = ({ show, error }: IsErrorState) => {
    const useStyle = makeStyles(() =>
        createStyles({
            MainDiv: {
                display: 'flex',
                alignItems: 'center',
                color: 'red',
                justifyContent: 'center',
                marginTop: '1rem',
                marginBottom: '0.5rem'
            }

        })
    );

    const classe = useStyle();
    return (
        <>
            {
                show ?
                    <div className={classe.MainDiv}>
                        <ErrorOutlineIcon />
                        &nbsp;
                        <span>{error}</span>
                    </div>
                    : null
            }
        </>
    )
}
export default ErrorState