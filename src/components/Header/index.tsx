import { Button, Container, useMediaQuery } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import clsx from "clsx";
import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import {
  useApplicationUserState,
  useSetCollapseSideBar,
} from "../../store/user/hooks";
import Network from "../NetworkContext/NetworkContext";
import DesktopSideBar from "../SideBar/DeskTopSideBar";
import MobileSideBar from "../SideBar/MobileSideBar";
import MobileSidebar2 from "../SideBar/MobileSidebar2";
import "../SideBar/SideBar.scss";
import SwitchToLegacyInterface from "../SwitchToLeagcyInterface";
import TradeOn from "../TradeOn";
import ConnectWallet from "./ConnectWallet";
import ConnectWallet2 from "./ConnectWallet2";
import MobileHeader from "./MobileHeader";
import useStyles from "./style";
import Drawer from "@mui/material/Drawer";
//import { useReloadOnChainIdError } from "../../hooks/useReloadOnChainIdError";
export interface State extends SnackbarOrigin {
  open: boolean;
}

interface IsDrawer {
  children: React.ReactNode;
}

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
const IpadBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export default function MiniDrawer(props: IsDrawer) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const ipad = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isopen, setIsopen] = useState(true);

  const setCollapseSideBar = useSetCollapseSideBar();

  const { collapseSideBar } = useApplicationUserState();

  // reload on chainId Error
  //useReloadOnChainIdError();

  return (
    <div className={classes.root}>
      <CssBaseline />

      {mobile ? (
        <>
          <Button
            onClick={() => setIsopen(false)}
            style={{ position: "absolute", height: 60 }}
          ></Button>
          <MobileHeader setMobileOpen={() => setIsopen(false)} />
        </>
      ) : ipad ? (
        <MobileHeader setMobileOpen={() => alert("hello")} />
      ) : (
        <AppBar
          position="fixed"
          classes={{ colorPrimary: classes.AppBarBg }}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: !collapseSideBar,
          })}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <FlexBox>
              {collapseSideBar ? (
                <IconButton onClick={() => setCollapseSideBar(false)}>
                  <MenuIcon style={{ color: "black" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => setCollapseSideBar(true)}>
                  <MenuOpenIcon style={{ color: "black" }} />
                </IconButton>
              )}
              {ipad ? null : <SwitchToLegacyInterface />}
            </FlexBox>
            {ipad ? (
              <IpadBox>
                <TradeOn />

                <Network />
                <ConnectWallet />
              </IpadBox>
            ) : (
              <FlexBox>
                <TradeOn />

                <Network />
                <ConnectWallet2 />
              </FlexBox>
            )}
          </Toolbar>
        </AppBar>
      )}

      {mobile ? (
        // <Drawer
        //   open={mobileOpen}
        //    // onClose={() => setMobileOpen(false)}
        // >
        //   <MobileSideBar setMobileOpen={setMobileOpen} />
        // </Drawer>

        <MobileSidebar2 open={isopen} close={() => setIsopen(true)} />
      ) : ipad ? (
        <Drawer
          open={mobileOpen}
          // onClose={() => setMobileOpen(false)}
        >
          <MobileSideBar setMobileOpen={setMobileOpen} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: !collapseSideBar,
            [classes.drawerClose]: collapseSideBar,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: !collapseSideBar,
              [classes.drawerClose]: collapseSideBar,
            }),
          }}
        >
          <DesktopSideBar open={collapseSideBar} />
        </Drawer>
      )}

      <Container className={classes.content} maxWidth="lg">
        <div className={classes.toolbar} />
        {props.children}
      </Container>
    </div>
  );
}
