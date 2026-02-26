import React from 'react'
import TextField from '@material-ui/core/TextField';
import useStyles from './FlipStyle'
const TextValue = () => {
    const classes = useStyles()
    return (
        <div className={classes.TextWrapper}>
            <span>Balance:0(-$0.00)</span>
            <TextField id="standard-basic" placeholder='0.0' inputProps={{ min: 0, style: { textAlign: 'right' } }} />
            <a href="#" style={{ fontWeight: 'bold' }}>Max</a>
        </div>
    )
}
export default TextValue