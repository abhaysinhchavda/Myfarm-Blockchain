import React from 'react'
import Switch from '@material-ui/core/Switch';
import style from 'styled-components'
const SwitchContainer=style.div`
display:flex;
align-items:center;
`
const SwitchValue=style.span`
margin-right:8px;
font-weight:600
`
const MySwitch = () => {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(state)
    };
    return (
        <SwitchContainer >
            <Switch
                checked={state.checkedB}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                style={{ margin: 0 }}
            />
            <SwitchValue style={{ marginRight: 8, fontWeight: 600 }}>{state.checkedA==false?"Yes":null}</SwitchValue>
        </SwitchContainer>
    )
}
export default MySwitch