import React from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import styled from "styled-components";
import UnifarmLargeLogo from "../../assets/images/brand/Logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import NetworkContext from "../NetworkContext/NetworkContext";
import TradeOn from "../TradeOn";
import "./MobileSidebar.scss";
import LaunchIcon from '@mui/icons-material/Launch';
// import Home from "../../assets/svg/home";
import Earn from "../../assets/svg/earn";
import Trade from "../../assets/svg/trade";
// import Governance from "../../assets/svg/governance";
import Refferal from "../../assets/svg/refferal";
// import Bridge from "../../assets/svg/bridge";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { /* useLocation */ Link } from "react-router-dom";
import Governance from '../../assets/svg/governance';
import Telegrammer from '../../assets/images/telegram1.png';
import Discorder from '../../assets/images/Discord1.png';


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
  flex-direction:column;
  align-items:center;
`;

const FiberManualRecordIconFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const SmallFiberManualRecordIcon = styled(FiberManualRecordIcon)`
  font-size: 7px;
`;


const FlexBoxFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 130px;
  height: 100px;
  width: 90px;
`;

const Join = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #212121;
  margin-bottom:1rem;
`;

const Socials = styled.div`
  display:flex;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #212121;
  margin-bottom:15px;
  column-gap:10px;
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
      { fieldName: "All Farms", fieldPath: "/farms"},
      { fieldName: "My Stakes", fieldPath: "/mystakes"},
    ],
  },
  {
    fieldName: "Trade",
    fieldIcon: <Trade />,
    fieldPath: null,
    subMenus: [
      { fieldName: "Exchange", fieldPath: "/exchange"},
      { fieldName: "Liquidity", fieldPath: "/liquidity"},
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
    fieldIcon: (
      <Governance color="action"> </Governance>
    ),
    fieldPath: "/governance",
    subMenus: null,
  },
  {
    fieldName: "UniLaunch",
    fieldIcon: (
      <LaunchIcon color="action" style={{fontSize:20}}> </LaunchIcon>
    ),
    fieldPath: "/launch",
    subMenus: null,
  },

];

interface MobileSideBarProps {
  open:boolean;
  close:()=>void
  
}

export default function MobileSideBar2({ open,close }: MobileSideBarProps) {
  //const location = useLocation();
  const FixedProSideBar = styled(ProSidebar)`
  position: fixed;
  width:${open?' 0px !important':'216px !important'};
  min-width:${open?'0px !important':'216px !important'};
 
`;
  return (
    <FixedProSideBar collapsed={open}>
      <MobileSideBarFlexHeader>
        <UnifarmMobileLargeLogo src={UnifarmLargeLogo} />
        <CloseIcon
          style={{ color: "black" }}
          onClick={close}
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
                      <Link to={subItems.fieldPath} style={{ color: "black" }}>
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
   


      {open ? null : <FlexBoxFooter>
        <Join>Join:</Join>
        <Socials>
          <a target="_blank" rel="noreferrer" href="https://telegram.me/myunifarm">
          <img src={Telegrammer} width={32} height={32}  />
          </a>
          <span style={{marginTop:"3px"}}>Telegram</span>
        </Socials>
        <Socials>
          <a target="_blank" rel="noreferrer" href="https://discord.com/invite/bR6njxPsrg">
          <img src={Discorder} width={32} height={32} />
          </a>
          <span style={{marginTop:"3px"}}>Discord</span>
        </Socials>
      </FlexBoxFooter> }
      
    </FixedProSideBar>
  );
}
