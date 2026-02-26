import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "../style";
import styled from "styled-components";
import UFARM from "../../../assets/images/others/ufarm_mob.png";
// import ConnectWallet from "../ConnectWallet";
import ConnectWallet from '../ConnectWallet2'

const FlexToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const UnifarmMobileLogo = styled.img`
  width: 35px;
`;

interface MobileHeaderProps {
  setMobileOpen: () => void;

}

export default function MobileHeader({
  setMobileOpen,
}: MobileHeaderProps): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position="fixed" classes={{ colorPrimary: classes.AppBarBg }} className={classes.MobileAppbar}>
      <FlexToolBar>
        <ButtonFlexWrapper>
          <IconButton onClick={setMobileOpen}>
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <UnifarmMobileLogo src={UFARM} />
        </ButtonFlexWrapper>
        <ButtonFlexWrapper>
          {/* <ConnectWallet /> */}
          <ConnectWallet/>
        </ButtonFlexWrapper>
      </FlexToolBar>
    </AppBar>
  );
}
