import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Token from '../../assets/V2/Images/tk1.png'
import useStyles from './FlipStyle'
const SelectBox = () => {
    const classes = useStyles()
    return (
        <div className={classes.selectBoxWrappewr}>
            <FormControl style={{ width: '100%' }}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Label
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value=""
                    displayEmpty

                >
                    <MenuItem value="" >
                        <div className={classes.MenuWrapper}>
                            <img src={Token} width={30} />&nbsp;&nbsp;<em>value</em>
                        </div>
                    </MenuItem>

                </Select>

            </FormControl>
        </div>
    )
}
export default SelectBox