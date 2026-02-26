import { Button } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import List from "@material-ui/core/List";

import Switch from "@material-ui/core/Switch";
import TextField from "@mui/material/TextField";
import * as React from "react";
// import { filterTokens } from '../../../hooks/Filtter'
import { useEffect, useState } from "react";
import Style from "styled-components";
import ManageList from "./Sub-Compoent/Managetokenlist";


const ImportButton = Style(Button)`
  background: #6338BC;
  border:unset;
  margin-top:1rem;
  margin-bottom:1rem;
  border-radius: 15px;
  width:100%;
   
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
const TextDiv = Style.div`
   &>.MuiFormControl-root .MuiInputBase-root{
       border-radius:10px
   }
`;
const ManageTokenList = () => {

 
  const [tokenList, setTokenList] = useState([]);


  const [MainToken, setMainToken] = useState();
  
  const [TokenUrl, setUrl] = useState();
 
  const [FinalData, setFinalData] = useState([])

  const [Show, setShow] = useState(false)
  const MyTokenList = [];


  const [state, setState] = React.useState({});
  const [checked, setChecked] = React.useState(true);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  // const Name=""
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, TokenList, id) => {
    if(event.target.checked)
    {
      setState({ ...state, [event.target.id]: event.target.checked });
    }
    
    
    console.log(id)
    setTokenList(tokenList.concat(TokenList))
    getUnique(TokenList, "symbol")

  };

  useEffect(() => {
    const TokenList = JSON.parse(localStorage.getItem("Token"))
    setFinalData(FinalData.concat(TokenList))
  

  }, []);
  const GetDataLocalData = () => {

    const TokenList = JSON.parse(localStorage.getItem("Token"))
    setFinalData(FinalData.concat(TokenList))

    setShow(false)


  }
  const getUnique = (array, key) => {
    if (typeof key !== "function") {
      const property = key;
      key = function (item) {
        return item[property];
      };
    }
    return Array.from(
      array
        .reduce(function (map, item) {
          const k = key(item);
          if (!map.has(k)) map.set(k, item);
          return map;
        }, new Map())
        .values()
    );
  };
  
  const FetchToken = (e) => {
    setUrl(e.target.value);
    fetch(e.target.value)
      .then((res) => res.json())
      .then((res) => setMainToken(res));
  };
  const ImportToken = () => {
    const MyArray = []
    fetch(TokenUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        MyTokenList.push(res)
        MyTokenList.map((tk) => {
          console.log(tk.name)
          if (!MyArray.includes(tk.name)) {

            setShow(true)
            localStorage.setItem("Token", JSON.stringify(MyTokenList))
          }
          else {
            alert('lodded')
          }
        })
       });

  };
  
  return (
    <>
    {
      Show ?
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {Object.entries(MainToken).map(([key, value]) => {
                if (key == "logoURI") {
                  if (value.toString().substring(0, 4) === "ipfs") {
                    return (
                      <img
                        src={`https://ipfs.io/ipfs/${value
                          .toString()
                          .slice(7)}`}
                        width={30}
                        style={{ marginRight: "1rem" }}
                      />
                    );
                  } else {
                    return (
                      <img
                        src={value.toString()}
                        width={30}
                        style={{ marginRight: "1rem" }}
                      />
                    );
                  }
                }
              })}
            </div>
            <div>
              <div>
                {Object.entries(MainToken).map(([key, value]) => {
                  if (key == "name") {
                    return (
                      <div style={{ fontSize: 15, fontWeight: 700 }}>
                        {value}
                      </div>
                    );
                  }

                })}
              </div>
              <div style={{ fontSize: 13 }}>
                <a href={TokenUrl}>{TokenUrl}</a>
              </div>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1px', paddingLeft: '23px', paddingRight: '23px', paddingBottom: '1px', color: 'rgb(218, 45, 43)', background: 'rgba(218, 45, 43, 0.2)', borderRadius: 15 }}>
            <h3>Import at your own risk</h3>
            <h4>By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.</h4>
            <h4>If you purchase a token from this list, you may not be able to sell it back.</h4>
            <h4>  <Checkbox
              checked={checked}
              onChange={handleChange1}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />I understand</h4>
          </div>

          <ImportButton onClick={GetDataLocalData}>Import</ImportButton>
        </div>
        :
        <div style={{ marginTop: "25px" }}>
          <TextDiv>
            <TextField
              id="standard-basic"
              placeholder="https:// or ipfs:// or ENS name"
              variant="outlined"
              value={TokenUrl}
              fullWidth
              onChange={FetchToken}
              size="small"
            />
          </TextDiv>{" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 18,
            }}
          >
            {MainToken ? (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {Object.entries(MainToken).map(([key, value]) => {
                    if (key == "logoURI") {
                      if (value.toString().substring(0, 4) === "ipfs") {
                        return (
                          <img
                            src={`https://ipfs.io/ipfs/${value
                              .toString()
                              .slice(7)}`}
                            width={30}
                            style={{ marginRight: "1rem" }}
                          />
                        );
                      } else {
                        return (
                          <img
                            src={value.toString()}
                            width={30}
                            style={{ marginRight: "1rem" }}
                          />
                        );
                      }
                    }
                  })}
                  {Object.entries(MainToken).map(([key, value]) => {
                    if (key == "name") {
                      return (
                        <div style={{ fontSize: 15, fontWeight: 700 }}>
                          {value}
                        </div>
                      );
                    }
                  })}
                </div>
                <StyledButton onClick={ImportToken}>Import</StyledButton>
                {/* <StyledButton onClick={GetDataLocalData}>Done</StyledButton> */}
              </>
            ) : null}
          </div>
          <List style={{ height: 295, overflow: "auto" }}>
     
            {FinalData ? (
              FinalData.map((tk, index) => {
                return (
                  <ManageList
                    TokenName={tk.name}
                    TokenImage={`https://ipfs.io/ipfs/${tk.logoURI.toString().slice(7)}`}
                    key={index}
                    ThemeText="white"
                    ThemeColor='rgb(0, 148, 236)'
                    TotalToken={tk.tokens.length + ' ' + 'Tokens'}
                  >
                    <Switch
                      checked={!!state[index]}
                      onChange={(e) => handleChange(e, tk.tokens, index)}
                      color="primary"
                      id={index.toString()}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </ManageList>
                )
              })

            ) : (
              <h3 style={{ textAlign: "center", color: "grey" }}>
                Import Token List
              </h3>
            )}
          </List>
        </div>
    }

  </>
  );
};
export default ManageTokenList;
