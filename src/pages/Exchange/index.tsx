import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
// import ModalRejected from "./TransactionRejected";
// import { useTokenlist } from '../../store/Token/hooks'
// import TransactionSuccessful from "./TransactionSuccessful";
import { Fetcher } from "@uniswap/sdk";
// import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import React from "react";
import Card from "../../components/Exchange/Component/Card";
import Header from "../../components/Exchange/Component/Header";
import TokenDropDonw from '../../components/Exchange/Component/TokenDropdown';
// import Pay from "./Pay";
// import Receive from "./Receive";
import BreadCrumb from "../../components/PageHeader";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2rem",
    "& > *": {
      // margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  AllowButton: {
    background: "#6338bc",
    color: "white",
    width: "93%",
    height: 54,
    marginTop: "4rem",
    borderRadius: 10,
    boxShadow: "4px 3px 14px 2px rgb(103 58 183 / 58%)",
    "&:hover": {
      background: "#6338bc",
    },
  },
  AllowButton2: {
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
  TolerenceMainDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "2.5rem",
    marginRight: "2.5rem",
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  TolerenceDetailDiv: {
    display: "flex",
    alignItems: "center",
  },
  swapButton: {
    background: "#6338bc",
    color: "white",
    width: "93%",
    height: 54,
    marginTop: "1rem",
    marginBottom: "2rem",
    borderRadius: 10,
    boxShadow: "4px 3px 14px 2px rgb(103 58 183 / 58%)",
    "&:hover": {
      background: "#6338bc",
    },
  },
  swapDiv: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
}));

const Exchange = () => {


  // To be used when need to show transaction successful message
  // const [SuccessModal, setSuccessModal] = useState({
  //     modal:false
  // })

  // const [RejectedModal, setRejectedModal] = useState({
  //   modal: false,
  // });

 
  // const Token = useTokenlist()
 
  const chainId = 1;
  const tokenAddress = "0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd";
 
  const Token = Fetcher.fetchTokenData(chainId, tokenAddress);
  console.log(Token)
 
  //To be used for transaction successful modal
  // const handleCallback = () => {
  //     setSuccessModal({...SuccessModal, modal:false})
  // }

  // const handleCallback = () => {
  //       setRejectedModal({...RejectedModal, modal:false})
  //   }

  
  const classes = useStyles();
  // const [Swap, setSwap] = useState(true);
  // const MyToken = []
  // const Exchabge = () => {
  //   setSwap(!Swap);
  //   MyToken.push(Token)
  //   console.log(MyToken)
  // };
  return (
    <>
      <BreadCrumb
        title="Swap"
        content="Trade tokens in an instant with order routing from the best exchanges"
        hasShowSwitch={false}
      />
      <div className={classes.root}>
        <Card showWrapper={false}>
          <Header />
          <Divider />
         <TokenDropDonw/>
         
         

          {/* <Button
                        className={classes.swapButton}
                        onClick={() => setSuccessModal({ ...SuccessModal, modal: true })}
                    >
                        Swap
                    </Button> */}
        </Card>
      </div>

      {/* // To be used when need to show transaction successful message */}
      {/* <TransactionSuccessful
              open = {SuccessModal.modal}
              parentCallback = {handleCallback}
            /> */}

      {/* <ModalRejected open={RejectedModal.modal} parentCallback={handleCallback} /> */}

     
    </>
  );
};
export default Exchange;

