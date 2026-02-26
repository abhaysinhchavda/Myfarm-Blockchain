import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import { IconButton, MenuItem } from "@material-ui/core";
import Setting from "../../assets/images/others/setting.svg";
import { makeStyles, createStyles } from "@material-ui/core/styles";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    maxWidth: 151,
    maxHeight: 184,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const useStyles = makeStyles(() =>
  createStyles({
    SettingDiv: {
      width: "224px",
      height: "23px",
      fontFamily: "DM Sans",
      fontWeight: "bold",
      fontStyle: "normal",
      fontSize: "18px",
      lineHeight: "23px",
      marginBottom: "10px",
    },
    MenuDiv: {
      left: "-10px",
      marginBottom: "10px",
      marginLeft: "3px",
    },
  })
);
const Setting1 = () => {
  const classes = useStyles();
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  return (
    <div>
      <IconButton style={{ marginLeft: "0.5rem" }} onClick={handleClick2}>
        <img src={Setting} />
      </IconButton>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        style={{
          maxWidth: "300px !important",
          minHeight: "208px !important",
        }}
      >
        <div className={classes.SettingDiv}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Settings
        </div>
        <MenuItem onClick={handleClose2} className={classes.MenuDiv}>
          TITLE1
        </MenuItem>
        <MenuItem onClick={handleClose2} className={classes.MenuDiv}>
          TITLTE2
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
export default Setting1;
