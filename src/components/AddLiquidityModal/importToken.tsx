import React from 'react'
import Style from "styled-components";
import TextField from "@mui/material/TextField";
const TextDiv = Style.div`
   &>.MuiFormControl-root .MuiInputBase-root{
       border-radius:10px
   }
`;
const ImportToken = () => {
    return (
        <div style={{marginTop:'25px'}}>
            <TextDiv>
                <TextField
                    id="standard-basic"
                    placeholder="0x0000"
                    variant="outlined"
                    fullWidth
                    size="small"
                />
            </TextDiv>
        </div>

    )
}
export default ImportToken