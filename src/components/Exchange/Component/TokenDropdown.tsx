import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Style from "styled-components";
// import { TokenList } from '@uniswap/token-lists'
import Modal from "../../Modal/index";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
// import { filterTokens } from '../../../hooks/Filtter'
import { useState, useEffect } from "react";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { useTokenlist } from '../../../store/lists/hooks'
import List from "@material-ui/core/List";
import TokenList from "./Sub-Compoent/Tokenlist";
import ContentLoader from "../../ContentLoader";
import ManageTab from "./Managetab";
import ManageList from "./Sub-Compoent/Managetokenlist";
// import Switch from "@material-ui/core/Switch";
import TokenList2 from "../../../constants/TokenList.json";
import { ClipLoader } from "react-spinners";
import { useBalance } from '../../../store/balance/hooks'
import Balance from "./Balance";
import { useWeb3React } from "@web3-react/core";
import { Allow } from "../../../hooks/AllowUnifarmToken";
import AmmModal from "../../../pages/Exchange/AmmModal";
import { useOpenWalletPopUp } from "../../../store/application/hooks";
import Wrapper from "./Wrapper";
import Toggle from "react-toggle";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import { UseSwapTokens } from '../../../hooks/useSwapTokens';
import { useApplicationUserState } from "../../../store/user/hooks";
import { useSwapSlipAmount } from "../../../store/application/hooks";
import * as chains from "../../../constants/chain";
import { getDefaultRPCProvider } from '../../../utilities/provider';

import { Contract } from "@ethersproject/contracts";
import RouterABI from "../../../constants/ABI/UNIFARMROUTER.json";
import TokenABI from "../../../constants/ABI/ERC20.json";
import { ethers } from 'ethers';
import { getDecimals } from '../../../hooks/useSwapTokens';
// import { useFetchBalance } from "../../../store/balance/hooks";

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
const InputDiv = Style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left:1rem;
    @media only screen and (max-width: 600px) {
        margin-bottom:1.5rem;
        margin-left:0rem;
        margin-top:20px;
      }
    `;

const TokenContainer2 = Style.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;
const TokenDetail = Style.div`
display: flex;
align-items: center;
`;
const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  ClearAllLink: {
    color: 'blue',
    "&:hover": {
      cursor: 'pointer'
    }
  },
  mobileLinkDiv: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "1.5rem",
    },
  },
  linkDiv: {
    fontSize: 13,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      marginTopL: 15,
    },
  },
  TolerenceMainDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "2.5rem",
    marginRight: "2.5rem",
    marginTop: "1rem",
    width: "87%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  TolerenceDetailDiv: {
    display: "flex",
    alignItems: "center",
  },
  inputtext: {
    width: 265,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  swapButton: {
    color: "#6338bc",
    fontSize: 20,
  },
  AllowButton: {
    background: "#6338bc",
    color: "white",
    width: "93%",
    height: 54,
    marginTop: "4rem",
    borderRadius: 10,
    textTransform: "capitalize",
    boxShadow: "4px 3px 14px 2px rgb(103 58 183 / 58%)",
    "&:hover": {
      background: "#6338bc",
    },
  },
  AllowButton2: {
    background: "#6338bc",
    color: "white",
    width: "91%",
    height: 54,
    marginTop: "2rem",
    marginBottom: "1rem",
    borderRadius: 10,
    boxShadow: "4px 3px 14px 2px rgb(103 58 183 / 58%)",
    "&:hover": {
      background: "#6338bc",
    },
  },
  AmountBtn: {
    background: "#E0E0E0",
    color: "#A9A9A9",
    width: "93%",
    height: 54,
    marginTop: "1rem",
    marginBottom: "2rem",
    borderRadius: 10,
    textTransform: "capitalize",
    "&:hover": {
      background: "#6338bc",
    },
  },
  swapButton2: {
    background: "#E0E0E0",
    color: "#A9A9A9",
    width: "93%",
    height: 54,
    marginTop: "1rem",
    marginBottom: "2rem",
    borderRadius: 10,
    textTransform: "capitalize",
    "&:hover": {
      background: "#6338bc",
    },
  },
  swapButton3: {
    background: "#6338bc",
    color: "white",
    width: "93%",
    height: 54,
    marginTop: "2rem",
    marginBottom: "1rem",
    borderRadius: 10,
    boxShadow: "4px 3px 14px 2px rgb(103 58 183 / 58%)",
    "&:hover": {
      background: "#6338bc",
    },
  },
  SwapDiv: {
    display: "flex",
    marginTop: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      paddingLeft: 15,
      paddingRight: 15,
      width: "100%",
    },
  },
}));

// interface IsTokendropdown {
//   title: string;

// }

const TokenDropDown = () => {
  const { library } = useWeb3Provider();
  const [Open, setOpen] = React.useState(false);
  const [Manage, setManage] = React.useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [Lodded, SetLodded] = useState(false);
  const [ShowImport, setShowImport] = useState(true);
  const [Amount, setAmount] = useState(true);
  const [FinalSubToken, setFinalSubToken] = useState([]);
  const [SubTokenList, setSubTokenList] = useState([]);
  const [SubTokenConfirm, setSubTokenConfirm] = useState(false);
  const [MainToken, setMainToken] = useState();
  const [FillterShow, setFillter] = useState(false);
  const [Name, setName] = useState();
  const [img, setImage] = useState();
  const [img2, setImage2] = useState();
  const [Name2, setName2] = useState();
  const [No, setNo] = useState();
  const [TokenUrl, setUrl] = useState();
  const [index1, setIndex] = useState();
  const [FinalData, setFinalData] = useState([]);
  const [ShowList, setShowList] = useState(true);
  const [Show, setShow] = useState(false);
  const [FilteerValue, setFiltter] = useState();
  const [swap, setSwap] = useState(false);
  const MyTokenList = [];
  const [SelectToken, setSelectToken] = useState(true);
  const { active, account } = useWeb3React();
  const [state, setState] = React.useState({});
  const [checked, setChecked] = React.useState(true);
  const [swapOpen, setSwapOpen] = React.useState(false);
  const [SubLodded, setSubLodded] = useState(false);
  const [Delete, setDelete] = useState(false);
  const BalanceList = useTokenlist()
  const myBalanceList = useBalance()
  const { appChainId } = useApplicationUserState();
  const [Pay, setPay] = useState({
    index: 0,
    symbol: "",
    address: "",
    exchange: 1,
    balance: 0,
    usd: 0,
    amount: 0
  });
  const [Receive, setReceive] = useState({
    index: 0,
    symbol: "",
    address: "",
    exchange: 1,
    balance: 0,
    usd: 0,
    amount: 0
  })
  const [AmmModaler, setAmmModaler] = useState({
    modal: false,
    addedValue: false,
    unstake: true,
    sucess: false,
    error: false,
    loder: false,
    reward: false,
    msg: <div></div>,
    stakMsg: "",
    transactionStatus: "initial",
  });
  const slipAmount = useSwapSlipAmount();
  const [Adress, setAdress] = useState();
  const TokenSearch = (e) => {
    setAdress(e.target.value);
    setShowImport(true);
    for (var i = 0; i < FinalSubToken.length; i++) {
      if (FinalSubToken[i].address == e.target.value) {
        setSubLodded(true);
      }
    }
  };
  const ClearAll = () => {
    alert('hello')
    FinalSubToken.splice(0, FinalSubToken.length)
    setDelete(true)
    if (Delete) {
      return FinalSubToken;
    }
    return () => setDelete(false);
  }
  const DeleteToken = (item) => {
    setDelete(true)
    if (item !== -1) {
      FinalSubToken.splice(item, 1);
    }
    if (Delete) {
      return FinalSubToken;
    }
    return () => setDelete(false);
  };
  const provider = getDefaultRPCProvider();
  const amm = () => {
    const routerAddress = chains.routerAddress.get(appChainId);
    const amount = Pay.amount
    const { address: payAddress } = Pay;
    const { address: receiveAddress } = Receive;
    console.log('useSwapTokens...........', payAddress);
    console.log('amount:', amount)
    UseSwapTokens(
      payAddress,
      receiveAddress,
      amount.toString(),
      routerAddress,
      account,
      library
    )
      .then(() => {
        console.log("OK!")
        setAmmModaler({ ...AmmModaler, loder: false, unstake: false });
        setAmmModaler({
          ...AmmModaler,
          sucess: true,
          unstake: false,
          reward: true,
          transactionStatus: "submitted",
          msg: <div>Transaction has been submitted successfully</div>,
        });
      })
      .catch((e) => {
        console.log('error=======>:', e);
        setAmmModaler({
          modal: false,
          addedValue: false,
          unstake: true,
          sucess: false,
          error: false,
          loder: false,
          reward: false,
          msg: <div></div>,
          stakMsg: "",
          transactionStatus: "initial",
        })
      });
    setAmmModaler({ ...AmmModaler, loder: true, unstake: false });
  };
  const open = useOpenWalletPopUp();
  const addIt = () => {
    setAmmModaler({ ...AmmModaler, addedValue: true });
  };
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const AllowUnifarm = () => {
    setSwapOpen(true);
  };
  const SwapChange = () => {
    setPay({
      ...Receive
    })
    setReceive({
      ...Pay
    })
    setSwap(!swap);
  };
  const GetTokenValue = React.useCallback(() => {
    setTokenList(getUnique(tokenList.concat(BalanceList), "symbol"));

    Promise.all([
      fetch(
        "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link"
      ),
      fetch(
        "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://defi.cmc.eth.link"
      ),
    ])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        if (data) {
          setFinalData(getUnique(FinalData.concat(data), "name"));
        }

      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }, [BalanceList,tokenList,FinalData])
  React.useEffect(() => {

    GetTokenValue()
  }, [GetTokenValue]);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    TokenList,
    id
  ) => {
    setState({ ...state, [event.target.id]: event.target.checked });
    console.log(id);
    if (TokenList) {
      setTokenList(getUnique(tokenList.concat(TokenList), "symbol"));
    }

  };
  const SearchToken = (e) => {
    setFillter(true);
    setFiltter(e.target.value);
  };
  const SearchValue = () => {
    return (
      <List style={{ height: 220, overflow: "auto" }}>
        {tokenList.map((tk, index) => {
          if (
            tk.symbol.toLowerCase().includes(FilteerValue) ||
            tk.symbol.toUpperCase().includes(FilteerValue)
          ) {
            return (
              <TokenList
                value={<ClipLoader size={20} color="#6338BC" />}
                tokentitle={tk.symbol}
                fullname={tk.name}
                key={index}
                tokenImage={tk.logoURI}
                click={() => TokenName(tk.symbol, tk.logoURI, index)}
                select={index1 == index ? true : false}
              />
            );
          }
        })}
      </List>
    );
  };
  const FinalTokenValue = React.useCallback(() => {
    const TokenList = JSON.parse(localStorage.getItem("Token"));
    if (TokenList) {
      setFinalData(getUnique(FinalData.concat(TokenList), "name"));
    }
    const TokenList2 = JSON.parse(localStorage.getItem("SubToken"));
    if (TokenList2) {
      setFinalSubToken(getUnique(FinalSubToken.concat(TokenList2), "name"));
    }
  }, [FinalData, FinalSubToken])
  useEffect(() => {
    FinalTokenValue()

  }, [FinalTokenValue]);
  const GetDataLocalData = () => {
    const TokenList = JSON.parse(localStorage.getItem("Token"));
    setFinalData(FinalData.concat(TokenList));
    setShow(false);
    setMainToken(null);
    setUrl(null);
    console.log(setSubTokenList);
  };
  const GetSubLocalData = () => {
    const TokenList = JSON.parse(localStorage.getItem("SubToken"));
    if (TokenList) {
      setFinalSubToken(getUnique(FinalSubToken.concat(TokenList), "symbol"));
      setSubTokenConfirm(false);
      setShowImport(false);
    }


    console.log(setSubTokenList);
  };
  const OpenLink = (url) => {
    window.open(`https://etherscan.io/address/${url}`)
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
  const TokenName = async (name, img, index) => {
    console.log("myBalanceList:", myBalanceList)
    const currentToken = myBalanceList.tokens[index];
    let formattedCurrentBalance = 0;
    try {
      const instance = new Contract(chains.routerAddress.get(appChainId), RouterABI, library.getSigner());
      const wethAddress = await instance.WETH();
      console.log('wethAddress:', wethAddress)
      if (currentToken.toUpperCase() === wethAddress.toUpperCase()) {
        const balanceRaw = await provider.getBalance(account);
        formattedCurrentBalance = Number(ethers.utils.formatEther(balanceRaw));
      } else {
        const token = new Contract(currentToken, TokenABI, library.getSigner());
        const tokenDecimals = await getDecimals(token);
        formattedCurrentBalance = Number(myBalanceList.balances[index]) * 10 ** (-tokenDecimals);
      }
    } catch (err) {
      console.log('err=>', err)
    }
    const exchange = tokenList[index].price;
    const symbol = tokenList[index].symbol;
    if (No == 1) {
      setName(name);
      setImage(img);
      setOpen(false);
      setIndex(index);
      setPay({
        ...Pay,
        index,
        balance: formattedCurrentBalance,
        usd: formattedCurrentBalance * exchange,
        exchange,
        address: myBalanceList.tokens[index],
        symbol
      })
      setSelectToken(false);
    } else {
      setName2(name);
      setImage2(img);
      setOpen(false);
      setIndex(index);
      setReceive({
        ...Receive,
        index,
        balance: formattedCurrentBalance,
        usd: formattedCurrentBalance * exchange,
        exchange,
        address: myBalanceList.tokens[index],
        symbol
      })
      setSelectToken(false);
    }
  };
  const FetchToken = (e) => {
    setUrl(e.target.value);
    fetch(e.target.value)
      .then((res) => res.json())
      .then((res) => {
        SetLodded(false);
        if (FinalData.length > 0) {
          for (var i = 0; i < FinalData.length; i++) {
            if (FinalData[i].name == res.name) {
              SetLodded(true);
            }
          }
        }
        setMainToken(res);
      });
  };
  const ImportToken = () => {
    const MyArray = [];
    fetch(TokenUrl)
      .then((res) => res.json())
      .then((res) => {
        MyTokenList.push(res);
        MyTokenList.map((tk) => {
          if (!MyArray.includes(tk.name)) {
            setShow(true);
            localStorage.setItem("Token", JSON.stringify(MyTokenList));
          } else {
            alert("lodded");
          }
        });
      });
  };

  const ImportSubToken = (
    address,
    chainId,
    name,
    symbol,
    decimals,
    logoURI
  ) => {
    setSubTokenConfirm(true);
    setShowList(false);
    const MyArray = [];
    SubTokenList.push({
      address: address,
      chainId: chainId,
      name: name,
      symbol: symbol,
      decimals: decimals,
      logoURI: logoURI,
    });
    SubTokenList.map((tk) => {
      if (!MyArray.includes(tk.name)) {
        localStorage.setItem("SubToken", JSON.stringify(SubTokenList));
      } else {
        alert("lodded");
      }
    });
  };
  const MySwap = (id) => {
    if (active) {
      setOpen(true), setNo(id), setFillter(false);
    }
  };
  const handleExchangeValues = (target: any, p: number, r: number, flag: boolean) => {
    const updatedReceiveAmount = flag ? Number(target) * r / p : Number(target) * p / r;
    return updatedReceiveAmount;
  }
  const PayOnchange = (e) => {
    setAmount(false);
    setSelectToken(true);
    setPay({
      ...Pay,
      amount: e.target.value
    });
    setReceive({
      ...Receive,
      amount: handleExchangeValues(e.target.value, Pay.exchange, Receive.exchange, false)
    })
  };
  const ReceiveOnchange = (e) => {
    setPay({
      ...Pay,
      amount: handleExchangeValues(e.target.value, Pay.exchange, Receive.exchange, true)
    })
    setReceive({
      ...Receive,
      amount: e.target.value
    })
    setAmount(false);
  };
  const getExchangeString = () => {
    if (tokenList && tokenList.length !== 0 && Pay.index !== Receive.index) {
      const payExchange = tokenList[Pay.index].price;
      const receiveExchange = tokenList[Receive.index].price;
      const receive = payExchange / receiveExchange;
      const result = `1${tokenList[Pay.index].symbol} = ${receive} ${tokenList[Receive.index].symbol}`;
      return result;
    } else {
      return "";
    }

  }
  const classes = useStyles();
  // console.log('tokenList:', tokenList)
  // console.log('Swap:', swap)
  console.log('Pay:', Pay);
  console.log('Receive:', Receive)
  return (
    <Box sx={{ minWidth: 120 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {swap ? (
          <div className={classes.SwapDiv}>
            <Button onClick={() => MySwap(2)} className={classes.dropdownBtn}>
              <DropContainer>
                <TokenContainer>
                  {img2 ? (
                    <img
                      src={img2 ? img2 : null}
                      width="20"
                      style={{ marginBottom: "2px", marginRight: "5px" }}
                    />
                  ) : null}

                  {Name2 ? Name2 : <div>Receive</div>}
                </TokenContainer>
                <ArrowDropDownIcon />
              </DropContainer>
            </Button>
            <InputDiv>
              {/* Pay */}
              {Pay.index !== 0 && <Balance mainBalance={Pay.balance} secondaryBalance={Pay.usd} />}
              <TextField
                id="standard-basic"
                value={Pay.amount}
                placeholder="0.0"
                variant="standard"
                className={classes.inputtext}
                onChange={PayOnchange}
              />
            </InputDiv>
          </div>
        ) : (
          <div
            style={{ display: "flex", marginTop: swap ? "1.5rem" : "1.5rem" }}
            className={classes.SwapDiv}
          >
            <Button onClick={() => MySwap(1)} className={classes.dropdownBtn}>
              <DropContainer>
                <TokenContainer>
                  {img ? (
                    <img
                      src={img ? img : null}
                      width="20"
                      style={{ marginBottom: "2px", marginRight: "5px" }}
                    />
                  ) : null}

                  {Name ? Name : <div>Pay</div>}
                </TokenContainer>
                <ArrowDropDownIcon />
              </DropContainer>
            </Button>
            <InputDiv>
              {/* Pay */}
              {Pay.index !== 0 && <Balance mainBalance={Pay.balance} secondaryBalance={Pay.usd} />}
              <TextField
                id="standard-basic"
                value={Pay.amount}
                variant="standard"
                placeholder="0.0"
                className={classes.inputtext}
                onChange={PayOnchange}
              />
            </InputDiv>
          </div>
        )}
        <IconButton onClick={SwapChange} style={{ marginTop: "1.5rem" }}>
          <SwapVerticalCircleIcon
            className={classes.swapButton}
            style={{ fontSize: 50 }}
          />
        </IconButton>
        {swap ? (
          <div className={classes.SwapDiv}>
            <Button onClick={() => MySwap(1)} className={classes.dropdownBtn}>
              <DropContainer>
                <TokenContainer>
                  {img ? (
                    <img
                      src={img ? img : null}
                      width="20"
                      style={{ marginBottom: "2px", marginRight: "5px" }}
                    />
                  ) : null}

                  {Name ? Name : <div>Pay</div>}
                </TokenContainer>
                <ArrowDropDownIcon />
              </DropContainer>
            </Button>
            <InputDiv>
              {/* Receive */}
              {Receive.index !== 0 && <Balance mainBalance={Receive.balance} secondaryBalance={Receive.usd} />}
              <TextField
                id="standard-basic"
                value={Receive.amount}
                variant="standard"
                placeholder="0.0"
                className={classes.inputtext}
                onChange={ReceiveOnchange}
                disabled
              />
            </InputDiv>
          </div>
        ) : (
          <div className={classes.SwapDiv}>
            <Button onClick={() => MySwap(2)} className={classes.dropdownBtn}>
              <DropContainer>
                <TokenContainer>
                  {img2 ? (
                    <img
                      src={img2 ? img2 : null}
                      width="20"
                      style={{ marginBottom: "2px", marginRight: "5px" }}
                    />
                  ) : null}

                  {Name2 ? Name2 : <div>Receive</div>}
                </TokenContainer>
                <ArrowDropDownIcon />
              </DropContainer>
            </Button>
            <InputDiv>
              {/* Receive */}
              {Receive.index !== 0 && <Balance mainBalance={Receive.balance} secondaryBalance={Receive.usd} />}
              <TextField
                id="standard-basic"
                value={Receive.amount}
                variant="standard"
                placeholder="0.0"
                className={classes.inputtext}
                disabled
                onChange={ReceiveOnchange}
              />
            </InputDiv>
          </div>
        )}
        {Pay.index !== 0 && Receive.index !== 0 && <Tolerence value={(slipAmount * Receive.amount / 100).toFixed(12)} exchangeString={getExchangeString()} />}
        {active ? (
          Amount ? (
            <div style={{ width: "100%" }}>
              <Button
                className={classes.AmountBtn}
                onClick={() => Allow()}
                disabled
              >
                Enter The Amount
              </Button>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <Button className={classes.AllowButton} onClick={AllowUnifarm}>
                {SelectToken ? "Select Token" : `Allow UniFarm to use ${Name}`}
              </Button>
              <Button
                className={swapOpen ? classes.swapButton3 : classes.swapButton2}
                onClick={() => setAmmModaler({ ...AmmModaler, modal: true })}
                disabled={swapOpen ? false : true}
              >
                Swap
              </Button>
            </div>
          )
        ) : (
          <div style={{ width: "100%" }}>
            <Button className={classes.AllowButton2} onClick={open}>
              {" "}
              Connect Wallet{" "}
            </Button>
          </div>
        )}

        {SelectToken == false ? (
          <Wrapper
            Recieved="38.72 Matic"
            Price="0.25%"
            Network="$120.00"
            Exchange="38.72 Matic"
          />
        ) : null}
      </div>

      <AmmModal
        title="Swap Confirmation"
        close={() => setAmmModaler({
          modal: false,
          addedValue: false,
          unstake: true,
          sucess: false,
          error: false,
          loder: false,
          reward: false,
          msg: <div></div>,
          stakMsg: "",
          transactionStatus: "initial",
        })}
        open={AmmModaler.modal}
        unstake={AmmModaler.unstake}
        stakMsg={AmmModaler.stakMsg}
        sucsess={AmmModaler.sucess}
        error={AmmModaler.error}
        msg={AmmModaler.msg}
        loder={AmmModaler.loder}
        addedValue={AmmModaler.addedValue}
        clickUnstake={amm}
        transactionStatus={AmmModaler.transactionStatus}
        click={() => setAmmModaler({ ...AmmModaler, modal: false })}
        class="PoolModal"
        clickAddIt={addIt}
        reward={AmmModaler.reward}
        value1={`${Pay.amount + Pay.symbol}`}
        value2={`${Receive.amount + Receive.symbol}`}
      />
      <Modal
        open={Open}
        title={
          Manage ? (
            <ManageTitle>
              <IconButton>
                <ArrowBackIcon
                  style={{ marginRight: "0.5rem", color: "black" }}
                  onClick={() => setManage(false)}
                />
              </IconButton>
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
                  Show ? (
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
                        <div className={classes.mobileLinkDiv}>
                          <div>
                            {Object.entries(MainToken).map(([key, value]) => {
                              if (key == "name") {
                                return (
                                  <div
                                    style={{ fontSize: 15, fontWeight: 700 }}
                                  >
                                    {value}
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <div className={classes.linkDiv}>
                            <a href={TokenUrl}>{TokenUrl}</a>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "3rem",
                          paddingTop: "1px",
                          paddingLeft: "23px",
                          paddingRight: "23px",
                          paddingBottom: "1px",
                          color: "rgb(218, 45, 43)",
                          background: "rgba(218, 45, 43, 0.2)",
                          borderRadius: 15,
                        }}
                      >
                        <h3>Import at your own risk</h3>
                        <h4>
                          By adding this list you are implicitly trusting that
                          the data is correct. Anyone can create a list,
                          including creating fake versions of existing lists and
                          lists that claim to represent projects that do not
                          have one.
                        </h4>
                        <h4>
                          If you purchase a token from this list, you may not be
                          able to sell it back.
                        </h4>
                        <h4>
                          {" "}
                          <Checkbox
                            checked={checked}
                            onChange={handleChange1}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          I understand
                        </h4>
                      </div>

                      <ImportButton onClick={GetDataLocalData}>
                        Import
                      </ImportButton>
                    </div>
                  ) : (
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
                            {Lodded ? (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {Object.entries(MainToken).map(
                                    ([key, value]) => {
                                      if (key == "logoURI") {
                                        if (
                                          value.toString().substring(0, 4) ===
                                          "ipfs"
                                        ) {
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
                                    }
                                  )}
                                  {Object.entries(MainToken).map(
                                    ([key, value]) => {
                                      if (key == "name") {
                                        return (
                                          <div
                                            style={{
                                              fontSize: 15,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {value}
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                                <div
                                  style={{ fontWeight: 700, color: "green" }}
                                >
                                  Loaded
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {Object.entries(MainToken).map(
                                    ([key, value]) => {
                                      if (key == "logoURI") {
                                        if (
                                          value.toString().substring(0, 4) ===
                                          "ipfs"
                                        ) {
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
                                    }
                                  )}
                                  {Object.entries(MainToken).map(
                                    ([key, value]) => {
                                      if (key == "name") {
                                        return (
                                          <div
                                            style={{
                                              fontSize: 15,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {value}
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                                <StyledButton onClick={ImportToken}>
                                  Import
                                </StyledButton>
                              </>
                            )}
                          </>
                        ) : null}
                      </div>
                      <List style={{ height: 295, overflow: "auto" }}>
                        {FinalData ? (
                          FinalData.map((tk, index) => {
                            return (
                              <ManageList
                                TokenName={tk.name}
                                TokenImage={`https://ipfs.io/ipfs/${tk.logoURI
                                  .toString()
                                  .slice(7)}`}
                                key={index}
                                ThemeText={!!state[index] ? "white" : "black"}
                                ThemeColor={
                                  !!state[index]
                                    ? "rgb(0, 148, 236)"
                                    : "rgb(237, 238, 242)"
                                }
                                TotalToken={tk.tokens.length + " " + "Tokens"}
                              >
                                <Toggle
                                  id={index.toString()}
                                  defaultChecked={!!state[index]}
                                  onChange={(e) =>
                                    handleChange(e, tk.tokens, index)
                                  }
                                  icons={{
                                    checked: "On",
                                    unchecked: "Off",
                                  }}
                                />
                                {/* <Switch
                                  checked={!!state[index]}
                                  onChange={(e) => handleChange(e, tk.tokens, index)}
                                  color="primary"
                                  id={index.toString()}
                                  inputProps={{ "aria-label": "primary checkbox" }}
                                /> */}
                              </ManageList>
                            );
                          })
                        ) : (
                          <h3 style={{ textAlign: "center", color: "grey" }}>
                            Import Token List
                          </h3>
                        )}
                      </List>
                    </div>
                  )
                }
                Token={
                  <div style={{ marginTop: "25px" }}>
                    {SubTokenConfirm ? (
                      <>
                        {TokenList2.filter((tk) => tk.address === Adress).map(
                          (tk, index) => {
                            return (
                              <TokenContainer2 key={index}>
                                <TokenDetail>
                                  <img
                                    src={tk.logoURI}
                                    width={30}
                                    style={{ marginRight: "1rem" }}
                                  />
                                  <div
                                    style={{ fontSize: 15, fontWeight: 700 }}
                                  >
                                    {tk.name}
                                  </div>
                                </TokenDetail>
                              </TokenContainer2>
                            );
                          }
                        )}
                        <div
                          style={{
                            textAlign: "center",
                            paddingTop: "1px",
                            paddingLeft: "23px",
                            paddingRight: "23px",
                            paddingBottom: "1px",
                            color: "rgb(218, 45, 43)",
                            background: "rgba(218, 45, 43, 0.2)",
                            borderRadius: 15,
                          }}
                        >
                          <h3>Import at your own risk</h3>
                          <h4>
                            By adding this list you are implicitly trusting that
                            the data is correct. Anyone can create a list,
                            including creating fake versions of existing lists
                            and lists that claim to represent projects that do
                            not have one.
                          </h4>
                          <h4>
                            If you purchase a token from this list, you may not
                            be able to sell it back.
                          </h4>
                          <h4>
                            <Checkbox
                              checked={checked}
                              onChange={handleChange1}
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                            I understand
                          </h4>
                        </div>

                        <ImportButton onClick={GetSubLocalData}>
                          Import
                        </ImportButton>
                      </>
                    ) : (
                      <>
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

                        {ShowImport
                          ? TokenList2.filter(
                            (tk) => tk.address === Adress
                          ).map((tk, index) => {
                            return (
                              <TokenContainer2 key={index}>
                                <TokenDetail>
                                  <img
                                    src={tk.logoURI}
                                    width={30}
                                    style={{ marginRight: "1rem" }}
                                  />
                                  <div
                                    style={{ fontSize: 15, fontWeight: 700 }}
                                  >
                                    {tk.name}
                                  </div>
                                </TokenDetail>
                                {SubLodded ? (
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: "green",
                                    }}
                                  >
                                    Loaded
                                  </div>
                                ) : (
                                  <StyledButton
                                    onClick={() =>
                                      ImportSubToken(
                                        tk.address,
                                        tk.chainId,
                                        tk.name,
                                        tk.symbol,
                                        tk.decimals,
                                        tk.logoURI
                                      )
                                    }
                                  >
                                    Import
                                  </StyledButton>
                                )}
                              </TokenContainer2>
                            );
                          })
                          : null}
                        {
                          FinalSubToken ?
                            <div style={{ marginTop: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontWeight: 700, fontSize: 18 }}>
                                {FinalSubToken.length} Custome Tokens
                              </span>
                              <span className={classes.ClearAllLink} onClick={ClearAll}>Clear All</span>
                            </div>
                            : null
                        }
                        <List style={{ height: 295, overflow: "auto" }}>
                          {FinalSubToken ? (
                            FinalSubToken.map((tk, index) => {
                              return (
                                <ManageList
                                  TokenName={tk.name}
                                  TokenImage={tk.logoURI}
                                  key={index}
                                  ThemeText="white"
                                  ThemeColor="rgb(0, 148, 236)"
                                  TotalToken=""
                                >

                                  <IconButton style={{ width: 10, height: 10 }} onClick={() => DeleteToken(index)}>
                                    <DeleteOutlineIcon style={{ color: 'white' }} />
                                  </IconButton>
                                  &nbsp;&nbsp;
                                  <IconButton style={{ width: 10, height: 10 }} onClick={() => OpenLink(tk.address)}>
                                    <OpenInNewIcon style={{ color: 'white' }} />
                                  </IconButton>

                                </ManageList>
                              );
                            })
                          ) : (
                            <h3 style={{ textAlign: "center", color: "grey" }}>
                              Import Token List
                            </h3>
                          )}
                        </List>
                      </>
                    )}
                  </div>
                }
              />
              {ShowList ? null : null}
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
                  onChange={SearchToken}
                />
              </TextDiv>
              <Suggetion>
                <h3>Common Bases{index1}</h3>
                <div style={{ display: "flex" }}>
                  <SuggetionToken>Matic</SuggetionToken>
                  <SuggetionToken>Eth</SuggetionToken>
                </div>
              </Suggetion>
              <>
                {FillterShow ? (
                  SearchValue()
                ) : tokenList.length > 0 ? (
                  <List style={{ height: 220, overflow: "auto" }}>
                    {

                      tokenList.map((tk, index) => {
                        // console.log("tk.logoURI:",tk.logoURI)
                        return (
                          <>

                            <TokenList
                              value={<ClipLoader size={20} color="#6338BC" />}
                              tokentitle={tk.symbol}
                              fullname={tk.name}
                              key={index}
                              tokenImage={tk.icon
                                // tk.logoURI
                                //   ? tk.logoURI.toString().substring(0, 4) === "ipfs"
                                //     ? `https://ipfs.io/ipfs/${tk.logoURI
                                //       .toString()
                                //       .slice(7)}`
                                //     : tk.logoURI
                                //   : tk.logoURI
                              }
                              click={() => TokenName(tk.symbol, tk.icon, index)}
                              select={index1 == index ? true : false}
                            />
                          </>
                        );
                      })}
                  </List>
                ) : (
                  <LoderContainer>
                    <ContentLoader color="#6338BC" message="" />
                  </LoderContainer>
                )}
              </>

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
export default TokenDropDown;
interface IsTolerence {
  value: any;
  exchangeString: string,
}
const Tolerence = ({ value, exchangeString }: IsTolerence) => {
  const classes = useStyles();
  return (
    <div className={classes.TolerenceMainDiv}>
      <div>Slippage Tolerance : {value}</div>
      <div className={classes.TolerenceDetailDiv}>
        <span>{exchangeString}</span>
        <SwapHorizIcon />
      </div>
    </div>
  );
};
