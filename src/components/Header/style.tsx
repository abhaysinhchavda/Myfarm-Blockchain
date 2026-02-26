import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ButtonColor } from "../../constants";

const drawerWidth = 215;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toggleGroup: {
      "&>.MuiToggleButton-root.Mui-selected": {
        color: "#401395",
        backgroundColor: "transparent !important",
      },
      "&>.MuiButtonBase-root": {
        padding: "0px !important",
        border: "0px !important",
        marginRight: "1rem",
        color: "rgb(0 0 0 / 57%)",
      },
    },
    tCirc: {
      width: "136px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 33,
      left: "19px",
    },
    tValue: {
      width: "133px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 33,
      left: "188px",
    },
    tSup: {
      width: "120px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 75,
      left: "19px",
    },
    tSValue: {
      width: "133px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 75,
      left: "188px",
    },
    ufarmPrice: {
      width: "215px",
      height: "23px",
      position: "absolute",
      left: "44px",
      top: "80px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "24px",
      textAlign: "center",
    },
    mc: {
      width: "120px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 117,
      left: "19px",
    },
    mcvalue: {
      width: "133px",
      height: "23px",
      position: "absolute",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#2E2E2E",
      top: 117,
      left: "148px",
      textAlign: "right",
    },
    designMenu: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      top: "58px !important",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
      "&>.MuiPopover-paper": {
        width: "21% !important",
      },
      "&>.MuiPaper-elevation8": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      marginBottom: "0",
      position: "fixed",
    },
    root: {
      display: "flex",
    },
    appToolDiv: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },

    btnDiv: {
      display: "flex",
      justifyContent: "space-around",

      alignItems: "center",
    },
    Badge: {
      "&>svg": {
        fontSize: 30,
      },
      "&>.MuiBadge-anchorOriginTopRightRectangle": {
        top: "7px !important",
        right: "9px !important",
      },
      "&>.MuiBadge-dot": {
        height: "8px !important",
        minWidth: "8px !important",
      },
      "&>.MuiBadge-badge": {
        height: "15px !important",
        width: "15px !important",
        minWidth: "0px !important",
      },
    },
    AppBarBg: {
      boxShadow: "none",
      background: "white !important",
      borderBottom: "2px solid rgba(133, 133, 133, 0.1)",
      [theme.breakpoints.down('xs')]:{
        zIndex:111
      }
    },
    notifiction: {
      top: "58px !important",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
      "&>.MuiPopover-paper": {
        width: "21% ",
        height: "36.6% ",
        [theme.breakpoints.down("lg")]: {
          width: "27% ",
          left: "1039px",
          height: "38.300%",
        },
        ["@media (max-width: 1369px)"]: {
          height: "45.4%",
        },
      },
      "&>.MuiPaper-elevation8": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
    VieaAllDiv: {
      height: 10,
      marginTop: 25,
    },
    ViewAllBtn: {
      background: ButtonColor,
      marginTop: "-21px",
      width: "100%",
      borderRadius: 1,
      color: "white",
      padding: "12px 8px 15px 8px",
      fontWeight: 700,
    },
    MainHeaderBrod: {
      height: "275px",
      background: "linear-gradient(91.69deg, #ECFDFF -5.48%, #F2F0FF 111.08%)",
      width: "100%",
      position: "absolute",
      zIndex: -1,
      [theme.breakpoints.down("xs")]: {
        height: "350px",
        paddingRight: "25.25rem",
      },
    },
    notificationHeading: {
      background: "#80808038",
      paddingTop: 11,
      paddingBottom: 11,
      textAlign: "center",
      fontSize: 16,
      marginTop: -9,
      fontWeight: 800,
    },
    appBar: {
      // zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: "96%",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    MobileAppbar:{
      [theme.breakpoints.down('xs')]:{
        // zIndex:-1
      }
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      // width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    mobileDrawer: {
      width: "100% !important",
      background: "white !important",
    },
    MobileMenu: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    MobileDrawerheader: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      color: "white",
      alignItems: "center",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      background: "white !important",
    },
    MobileDrawerContent: {
      textAlign: "center",
      borderBottom: "1px solid grey",
      color: "black",
    },
    notifiction1: {
      "&>.MuiPaper-root": {
        width: "100%",
        top: "59px !important",
      },
    },
    notification1Text: {
      fontSize: "14px !important",
    },
    HeaderBtn: {
      background: "#f8f8f9",
      border: "1px solid transperent",
      borderRadius: "5px",
      marginLeft: "0.5rem",
    },
    MobileDrawerBtn: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      marginTop: "1rem",
    },
    content: {
      flexGrow: 1,
      padding: 55,
      paddingTop: 40,
      paddingBottom:15,
      [theme.breakpoints.down('xs')]:{
        padding:12,
        paddingTop:'3rem',
       
      }
    },
    mobileMenu:{
    "&>.MuiDrawer-paperAnchorDockedLeft":{
      width:'69% ',
      background:'#F8F8F8 !important'
    }
    }
  })
);
export default useStyles;
