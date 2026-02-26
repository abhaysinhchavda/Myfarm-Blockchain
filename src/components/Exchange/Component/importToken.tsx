import React, { useState } from 'react'
import Style from "styled-components";
import TextField from "@mui/material/TextField";
import TokenList from '../../../constants/TokenList.json'
import { Button } from "@material-ui/core";
const TextDiv = Style.div`
   &>.MuiFormControl-root .MuiInputBase-root{
       border-radius:10px
   }
`;
const StyledButton = Style(Button)`
  background: #6338BC;
  border:unset;
  border-radius: 5px;
   margin-left: 0.5rem;
   padding:4px 10px;
  letter-spacing:2px;
  text-indent:5px;
  box-shadow:0 8px 16px rgb(99 56 188 / 13%);
  text-transform: capitalize;
  
  color: white;
  &: hover {
    background: #6338BC;
  }
  
`;
const TokenContainer = Style.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`
const TokenDetail = Style.div`
display: flex;
align-items: center;
`
const ImportToken = () => {
    const [Adress, setAdress] = useState()
    const TokenSearch = (e) => {
        setAdress(e.target.value)
    }
    return (
        <div style={{ marginTop: '25px' }}>
            <TextDiv>
                <TextField
                    id="standard-basic"
                    placeholder="0x0000"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={TokenSearch}
                />
            </TextDiv>
            {
                TokenList.filter(tk => tk.address === Adress).map((tk, index) => {
                    return (
                        <TokenContainer key={index}>
                            <TokenDetail>
                                <img
                                    src={tk.logoURI}
                                    width={30}
                                    style={{ marginRight: "1rem" }}
                                />
                                <div style={{ fontSize: 15, fontWeight: 700 }}>
                                    {tk.name}
                                </div>
                            </TokenDetail>
                            <StyledButton >Import</StyledButton>
                        </TokenContainer>
                    )
                })
            }
        </div>

    )
}
export default ImportToken