import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Ethx from "../../assets/images/others/ethx.png";
import { ClipLoader } from "react-spinners";
import Verified from "../../assets/images/others/verified.png";
import Checkbox from "@mui/material/Checkbox";
import { useOpenWalletPopUp } from "../../store/application/hooks";
import { useWeb3React } from "@web3-react/core";
import variable from "../../assets/stylesheet/Governance.module.scss";
import { Button } from "@material-ui/core";
import { Theme as Theme1 } from "@material-ui/core/styles";

const IconWrapperFlexBox = styled.div`
  display: flex;
  margin-top: -1.5rem;
`;

const StyledButton = styled(Button)<{
  status: boolean;
  amountOfTokens: string;
  disabler: boolean;
}>`
  background: ${(props) =>
    props.amountOfTokens.length < 42 ||
    props.amountOfTokens.length > 42 ||
    props.disabler
      ? "#E0E0E0"
      : `${variable.background}`};
  border: unset;
  border-radius: 10px;
  margin-left: 2rem;
  padding: 9px 13px;
  letter-spacing: 2px;
  text-indent: 5px;
  box-shadow: ${(props) =>
    props.amountOfTokens.length < 42 ||
    props.amountOfTokens.length > 42 ||
    props.disabler
      ? ""
      : "0px 7px 18px -2px rgba(103, 58, 183, 0.56)"};
  text-transform: capitalize;
  color: ${(props) =>
    props.amountOfTokens.length < 42 ||
    props.amountOfTokens.length > 42 ||
    props.disabler
      ? "#A9A9A9"
      : `${variable.buttonText} !important`};
  &: hover {
    background: ${(props) =>
      props.amountOfTokens.length < 42 ||
      props.amountOfTokens.length > 42 ||
      props.disabler
        ? "#E0E0E0"
        : "#6338bc"};
  }
  width: 50%;
  display: flex;

  margin-top: ${(props) => (props.status === true ? "5px" : "25px")};
  @media screen and (max-width: 1200px) and (min-width: 850px) {
    margin-left: 15rem;
  }
  @media screen and (max-width: 850px) and (min-width: 600px) {
    margin-left: 10rem;
  }
  @media screen and (max-width: 600px) {
    margin-left: 10rem;
  } ;
`;

interface CreateProposalProps {
  parentCallback: any;
}

interface State {
  amount: string;
  tokenContractAddress: any;
  amountOfTokens: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: "90%",
    },
  },
};

const names = ["Ethereum", "Polygon", "Binance Smart Chain"];

const CreateProposal = (props: CreateProposalProps) => {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [value, setValue] = React.useState(0);

  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChanger = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setVerified(false);
    setTokenValue(false);
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [values, setValues] = React.useState<State>({
    amount: "",
    tokenContractAddress: "",
    amountOfTokens: "",
  });

  const [disabled, setDisabled] = React.useState(true);
  const [errormessage, seterrormessage] = React.useState("");
  const [errormessage2, seterrormessage2] = React.useState("");
  const [errormessage3, seterrormessage3] = React.useState("");
  const [tokenValue, setTokenValue] = React.useState(false);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) {
        seterrormessage("Please enter name of proposal");
      } else if (event.target.value.length > 0) {
        seterrormessage("");
      }
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChanged =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length < 42) {
        seterrormessage2("Please enter token contract address");
        setVerified(false);
        setTokenValue(false);
        setLoading(false);
      } else if (event.target.value.length > 0) {
        seterrormessage2("");
      }
      setValues({ ...values, [prop]: event.target.value });
      if (event.target.value.length === 42) {
        setLoading(true);
        setVerified(true);
        setLoading(false);
        setTokenValue(true);
      } else if (event.target.value.length > 42) {
        seterrormessage2("Please enter valid token contract address");
        setVerified(false);
        setTokenValue(false);
        setLoading(false);
      }
    };

  const handleChangest =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) {
        seterrormessage3("Please enter amount");
        setDisabled(true);
      } else if (event.target.value.length > 0) {
        seterrormessage3("");
        setDisabled(false);
      }

      if (event.target.value[0] === "-" || event.target.value[0] === "0") {
        seterrormessage3("Please enter positive value greater than zero");
        setDisabled(true);
      }
      setValues({ ...values, [prop]: event.target.value });
    };

  const useStyles = makeStyles((theme1: Theme1) => ({
    paperClass: {
      width: "107%",
      height:
        personName.length === 0
          ? "242px"
          : values.tokenContractAddress === "" ||
            values.tokenContractAddress.length > 42 ||
            values.tokenContractAddress.length < 42
          ? "380px"
          : "430px",
      marginTop: "20px",
    },
    title: {
      position: "relative",
      top: "16px",
      left: "16px",
      textAlign: "left",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "29px",

      textTransform: "uppercase",

      color: "#212121",
    },
    tabber: {
      marginLeft: "-8px",
      [theme1.breakpoints.down("xs")]: {
        marginLeft: "0px",
      },
    },
    tabPanel: {
      position: "relative",
      top: "-40px",
      left: "-10px",
    },
    tokenImage: {
      position: "relative",
      left: "-46%",
      [theme1.breakpoints.down("xs")]: {
        left: "-42%",
      },
    },
    wltoken: {
      position: "relative",
      left: "-38%",
      top: "-10px",
      fontFamily: "Inter",
      fontStyle: " normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "24px",

      color: "#616161",
      [theme1.breakpoints.down("xs")]: {
        left: "-30%",
      },
    },
    tokenName: {
      position: "relative",
      left: "-40%",
      top: "-50px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "17px",
      lineHeight: "21px",
      [theme1.breakpoints.down("xs")]: {
        left: "-32%",
      },
    },
    tokenNetwork: {
      position: "relative",
      left: "-38%",
      top: "-10px",
      fontFamily: "Inter",
      fontStyle: " normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      [theme1.breakpoints.down("xs")]: {
        left: "-28%",
      },
    },
    cloader: {
      position: "relative",
      top: "-17%",
      right: "-42%",
    },
    verified: {
      position: "relative",
      top: "-19%",
      right: "-42%",
    },
    paperClass2: {
      width: "107%",
      height: "228px",
    },
    checkbox: {
      position: "relative",
      left: "-44%",
      top: "20px",
    },
    rewardVoters: {
      display: "flex",
      marginTop: "-12px",
      marginLeft: "65px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px",

      letterSpacing: "0.15px",

      color: "rgba(0, 0, 0, 0.87)",
      [theme1.breakpoints.down("xs")]: {
        marginLeft: "44px",
      },
    },
    totalBalance: {
      position: "relative",
      top: "10px",
      left: "-31%",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
      color: "#616161",
      [theme1.breakpoints.down("xs")]: {
        left: "-130px",
      },
    },
    tabs: {
      [theme1.breakpoints.down("xs")]: {
        width: "90px",
        fontSize: "10px",
      },
    },
    formHelperText: {
      color: "red",
    },
    tokenCont: {
      position: "relative",
      top: "-50px",
    },
  }));

  const handleCallback = () => {
    props.parentCallback("Homepage");
  };
  const { active } = useWeb3React();
  const open = useOpenWalletPopUp();

  const classes = useStyles();
  const [verified, setVerified] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconWrapperFlexBox>
        <IconButton onClick={handleCallback}>
          <ArrowBackIosIcon style={{ fontSize: 18, color: "black" }} />
        </IconButton>
      </IconWrapperFlexBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={7}>
          <Paper className={classes.paperClass}>
            {/* <div className={classes.title}>Create Proposal</div> */}

            <FormControl
              sx={{ m: 1, width: "93%", top: "20px", left: "-3px" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Proposal Name
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange("amount")}
              />
              <FormHelperText id="component-error-text" error>
                {errormessage}
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: "94%", marginTop: "40px" }}>
              <InputLabel id="demo-multiple-name-label">
                On which blockchain do you issue your token
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                style={{ textAlign: "left" }}
                onChange={handleChanger}
                input={
                  <OutlinedInput label="On which blockchain do you issue your token" />
                }
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.tabber}>
              <Tabs
                value={value}
                onChange={handleChanges}
                aria-label="scrollable force tabs example"
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
              >
                {personName.map((items, index) => {
                  return (
                    <Tab
                      key={index}
                      label={items}
                      {...a11yProps(index)}
                      className={classes.tabs}
                    />
                  );
                })}
              </Tabs>
            </div>

            <div className={classes.tabPanel}>
              {personName.map((items, index) => {
                return (
                  <TabPanel value={value} index={index} key={items}>
                    <FormControl
                      sx={{ m: 1, width: "99%", top: "20px", left: "0px" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="standard-adornment-amount">
                        Please enter token contract address
                      </InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        value={values.tokenContractAddress}
                        onChange={handleChanged("tokenContractAddress")}
                      />
                      <FormHelperText id="component-error-text" error>
                        {errormessage2}
                      </FormHelperText>
                    </FormControl>
                  </TabPanel>
                );
              })}
            </div>

            {loading ? (
              <span className={classes.cloader}>
                <ClipLoader size={25} loading={loading} color="black" />
              </span>
            ) : null}

            {verified ? (
              <span className={classes.verified}>
                {" "}
                <img src={Verified} />{" "}
              </span>
            ) : null}

            {tokenValue ? (
              <div className={classes.tokenCont}>
                <div className={classes.wltoken}>Whitelisted Token</div>
                <div className={classes.tokenImage}>
                  <img src={Ethx} />{" "}
                </div>
                <span className={classes.tokenNetwork}>Ethereum</span>
                <div className={classes.tokenName}>ETH</div>
              </div>
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Paper className={classes.paperClass2}>
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                color: "#6338BC",
                "&.Mui-checked": {
                  color: "#6338BC",
                },
              }}
              className={classes.checkbox}
            />
            <div className={classes.rewardVoters}>
              Reward voters if the proposal is passed
            </div>
            {checked ? (
              <div className={classes.totalBalance}>
                Total Balance:146542.2656
              </div>
            ) : null}

            <FormControl
              sx={{ m: 1, width: "90%", top: "0px", left: "-3px" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-amount">
                Enter total number of tokens in reward pools
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amountOfTokens}
                onChange={handleChangest("amountOfTokens")}
                type="number"
              />
              <FormHelperText id="component-error-text" error>
                {errormessage3}
              </FormHelperText>
            </FormControl>
            {active ? (
              <StyledButton
                status={checked}
                amountOfTokens={values.tokenContractAddress}
                disabled={disabled}
                disabler={disabled}
              >
                Create{" "}
              </StyledButton>
            ) : (
              <StyledButton
                status={checked}
                onClick={open}
                amountOfTokens="filled"
                disabler={disabled}
              >
                Connect Wallet
              </StyledButton>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProposal;
