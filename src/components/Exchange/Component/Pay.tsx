import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import * as React from "react";
import Style from "styled-components";
// import { TokenList } from '@uniswap/token-lists'
import Modal from "../../Modal/index";
// import { filterTokens } from '../../../hooks/Filtter'
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import List from "@material-ui/core/List";
import TokenList from "./Sub-Compoent/Tokenlist";
import ContentLoader from "../../ContentLoader";
import ManageTab from './Managetab'
import ManageList from "./Sub-Compoent/Managetokenlist";
import Switch from "@material-ui/core/Switch";
import CustomeToken from "./importToken";


const ManageTitle = Style.div`
display:flex;
align-items:center
`;
const DropContainer = Style.div`
display: flex;
    /* justify-content: flex-start; */
    width: 100%;
    justify-content: space-between;
`;
const TokenContainer = Style.div`
display: flex;
    align-items: center;
`;
const Suggetion = Style.div`
display:flex;
flex-direction:column;
`;
const TextDiv = Style.div`
   &>.MuiFormControl-root .MuiInputBase-root{
       border-radius:10px
   }
`;
const SuggetionToken = Style.div`
margin-right: 1rem;
  padding: 7px;
  border-radius: 20px;
  border: 1px solid #673AB7;
  width:80px;
  text-align:center;
  color:#673AB7;
  margin-bottom:1rem
}
`;
const LoderContainer = Style.div`
    display: flex;
    align-items: center;
    height: 221px;
    justify-content: center;
`;
const ManageButton = Style.button`
background: #6338BC;
  border-radius: 10px;
  border: 2px solid #6338BC;
  color: white;
  
  padding: 0.25em 1em;
  height:40px;
  width:100%;
  margin-top:3rem;
  margin-bottom:1rem;
  box-shadow: 4px 3px 14px 2px rgb(103 58 183 / 58%);
  &:hover {
      cursor:pointer
  }`;
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
const useStyles = makeStyles(() => ({
  dropdownBtn: {
    borderBottom: "1px solid #949494",
    borderRadius: 0,
    textTransform: "capitalize",
    width: 153,
    textAlign: "left",
    "&>.MuiButton-label": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
}));


 const TokenDropDown = () => {
  const [Open, setOpen] = React.useState(false);
  const [Manage, setManage] = React.useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [Lodded,SetLodded]=useState(false)

  const [Name, setName] = useState("Your Pay");
  const [MainToken, setMainToken] = useState();
  const [img, setImage] = useState();
  const [TokenUrl, setUrl] = useState();
  const [index1, setIndex] = useState();
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
    if (event.target.checked) {
      setState({ ...state, [event.target.id]: event.target.checked });
      console.log(id)
      setTokenList(getUnique(tokenList.concat(TokenList), "symbol"))
      
    }
 };

  useEffect(() => {
    
    const TokenList = JSON.parse(localStorage.getItem("Token"))
    if (TokenList) {
      setFinalData(getUnique(FinalData.concat(TokenList), "name"))
      }
}, []);
  const GetDataLocalData = () => {

    const TokenList = JSON.parse(localStorage.getItem("Token"))
    setFinalData(FinalData.concat(TokenList))
    setShow(false)
    setMainToken(null)
    setUrl(null)



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
  const TokenName = (name, img, index) => {
    setName(name);
    setImage(img);
    setOpen(false);
    setIndex(index);
  };
  const FetchToken = (e) => {
  
    setUrl(e.target.value);
    fetch(e.target.value)
      .then((res) => res.json())
      .then((res) => {
        SetLodded(false)
        if(FinalData.length>0)
         {
          for(var i=0;i<FinalData.length;i++)
          {
            if(FinalData[i].name==res.name)
            {
              SetLodded(true)
            }
            
          }
         }
         setMainToken(res)
        
      });
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
        // localStorage.setItem("Token", JSON.stringify(MyTokenList))
        // MyTokenList.map((tk)=>{
        //   if(!MyTokenList2.includes(tk.name))
        //   {
        //     MyTokenList2.push(MyTokenList)
        //     localStorage.setItem("Token", JSON.stringify(MyTokenList2))
        //   }
        //   else
        //   {
        //     alert('lodded')
        //   }

        // })


      });

  };

  const classes = useStyles();

  return (
    <Box sx={{ minWidth: 120, marginRight: "1rem" }}>
      <Button onClick={() => setOpen(true)} className={classes.dropdownBtn}>
      <DropContainer>
            {/* {props.title} */}
            <TokenContainer>
              {img ? (
                <img
                  src={img ? img : null}
                  width="20"
                  style={{ marginBottom: "2px", marginRight: "5px" }}
                />
              ) : null}

        <div>{Name}</div>
            </TokenContainer>
            <ArrowDropDownIcon />
          </DropContainer>
      </Button>

      <Modal
        open={Open}
        title={
          Manage ? (
            <ManageTitle>
              <ArrowBackIcon
                style={{ marginRight: "0.5rem" }}
                onClick={() => setManage(false)}
              />
              Manage
            </ManageTitle>
          ) : (
            <div style={{ marginLeft: 9 }}>Select Token</div>
          )
        }
        close={() => {
          return setOpen(false), setManage(false);
        }}
        headerClass="Token-header"
        className="Token-Dilog"
      >
        <div>

          {Manage ? (
            <>
              <ManageTab
                Manage={
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
                          {
                            Lodded?
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
                            <div style={{fontWeight:700,color:'green'}}>Loaded</div>
                            </>
                            :
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
                            </>
                          }
                            
                           
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
                Token={<CustomeToken />}
              />


            </>
          ) : (
            <>
              <TextDiv>
                <TextField
                  id="standard-basic"
                  placeholder="Search"
                  variant="outlined"
                  fullWidth
                  size="small"
                 
                />
              </TextDiv>
              <Suggetion>
                <h3>Common Bases{index1}</h3>
                <div style={{ display: "flex" }}>
                  <SuggetionToken>Matic</SuggetionToken>
                  <SuggetionToken>Eth</SuggetionToken>
                </div>
              </Suggetion>
              {tokenList.length > 0 ? (
                <List style={{ height: 220, overflow: "auto" }}>
                  {tokenList.map((tk, index) => {
                    return (
                      <TokenList
                        value={0}
                        tokentitle={tk.symbol}
                        fullname={tk.name}
                        key={index}
                        tokenImage={tk.logoURI}
                        click={() => TokenName(tk.symbol, tk.logoURI, index)}
                        select={index1 == index ? true : false}
                      />
                    );
                  })}
                </List>
              ) : (
                <LoderContainer>
                  <ContentLoader color="#6338BC" message="" />
                </LoderContainer>
              )}

              <ManageButton onClick={() => setManage(true)}>
                Manage Token List
              </ManageButton>
            </>
          )}
        </div>
      </Modal>
    </Box>
  );
};
export default TokenDropDown