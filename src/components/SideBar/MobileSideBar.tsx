import React from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import styled from "styled-components";
import UnifarmLargeLogo from "../../assets/images/brand/Logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import NetworkContext from "../NetworkContext/NetworkContext";
import TradeOn from "../TradeOn";
// import Home from "../../assets/svg/home";
import Earn from "../../assets/svg/earn";
import Trade from "../../assets/svg/trade";
// import Governance from "../../assets/svg/governance";
import Refferal from "../../assets/svg/refferal";
// import Bridge from "../../assets/svg/bridge";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { /* useLocation */ Link } from "react-router-dom";
import Governance from "../../assets/svg/governance";

const FixedProSideBar = styled(ProSidebar)`
  position: fixed;
  width: 216px !important;
`;

const MobileSideBarFlexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const UnifarmMobileLargeLogo = styled.img`
  width: 150px;
`;

const UnifarmButtonGroup = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  padding-right: 11px;
`;

const FiberManualRecordIconFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const SmallFiberManualRecordIcon = styled(FiberManualRecordIcon)`
  font-size: 7px;
`;

interface SubMenuList {
  fieldName: string;
  fieldPath: string;
}

export interface MenuItemsList {
  fieldName: string;
  fieldIcon: JSX.Element;
  fieldPath: string | null;
  subMenus: SubMenuList[] | null;
}

const menuItems: MenuItemsList[] = [
  // {
  //   fieldName: "Dashboard",
  //   fieldIcon: <Home />,
  //   fieldPath: null,
  //   subMenus: null,
  // },
  {
    fieldName: "Earn",
    fieldIcon: <Earn />,
    fieldPath: null,
    subMenus: [
      {
        fieldName: "All Farms",
        fieldPath: "/earn/farms"
      },
      {
        fieldName: "My Stakes",
        fieldPath: "/earn/mystakes"
      },
    ],
  },
  {
    fieldName: "Trade",
    fieldIcon: <Trade />,
    fieldPath: null,
    subMenus: [
      { fieldName: "Exchange", fieldPath: "/trade/exchange" },
      {
        fieldName: "Liquidity",
        fieldPath: "/trade/liquidity"
      },
    ],
  },
  // {
  //   fieldName: "Bridge",
  //   fieldIcon: <Bridge />,
  //   fieldPath: null,
  //   subMenus: null,
  // },
  // {
  //   fieldName: "Governance",
  //   fieldIcon: <Governance />,
  //   fieldPath: null,
  //   subMenus: null,
  // },

  {
    fieldName: "Refer and Earn",
    fieldIcon: <Refferal />,
    fieldPath: "/referral",
    subMenus: null,
  },
  {
    fieldName: "Governance",
    fieldIcon: <Governance color="action"> </Governance>,
    fieldPath: "/governance",
    subMenus: null,
  },
  {
    fieldName: "Governance",
    fieldIcon: <Governance color="action"> </Governance>,
    fieldPath: "/governance",
    subMenus: null,
  },
];

interface MobileSideBarProps {
  setMobileOpen: (isOpen: boolean) => void;
}

export default function MobileSideBar({ setMobileOpen }: MobileSideBarProps) {
  //const location = useLocation();

  return (
    <FixedProSideBar collapsed={false}>
      <MobileSideBarFlexHeader>
        <UnifarmMobileLargeLogo src={UnifarmLargeLogo} />
        <CloseIcon
          style={{ color: "black" }}
          onClick={() => setMobileOpen(false)}
        />
      </MobileSideBarFlexHeader>

      <UnifarmButtonGroup>
        <TradeOn />
        <NetworkContext />
      </UnifarmButtonGroup>

      <Menu iconShape="square">
        {menuItems.map((items) => {
          return items.subMenus === null ? (
            <MenuItem
              icon={items.fieldIcon}
              style={{ color: "black" }}
              /* className={MainMenu == index ? "active" : null} */
            >
              <Link to={items.fieldPath} style={{ color: "black" }}>
                {items.fieldName}
              </Link>
            </MenuItem>
          ) : (
            <SubMenu
              title={items.fieldName}
              icon={items.fieldIcon}
              onClick={() => {
                return null;
              }}
              /* className={MainMenu == index ? "active" : null} */
            >
              {items.subMenus.map((subItems, submenuIndex) => {
                return (
                  <MenuItem
                    key={submenuIndex}
                    /* className={
                    MainMenu == index
                      ? SubMenu1 == index1
                        ? "active"
                        : null
                      : null
                  } */
                  >
                    <FiberManualRecordIconFlexWrapper>
                      <SmallFiberManualRecordIcon />
                      &nbsp;
                      <Link
                        to={
                          subItems.fieldPath
                        }
                        style={{ color: "black" }}
                      >
                        {subItems.fieldName}
                      </Link>
                    </FiberManualRecordIconFlexWrapper>
                  </MenuItem>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </FixedProSideBar>
  );
}
