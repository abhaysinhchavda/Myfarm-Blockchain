import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
// import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
// import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import UnifarmLargeLogo from '../../assets/svg/Ulogo';
import UnifarmSmallLogo from '../../assets/images/brand/Logo.svg';
import styled from 'styled-components';
import { MenuItemsList, SmallFiberManualRecordIcon } from './MobileSideBar';
import Governance from '../../assets/svg/governance';
import Telegrammer from '../../assets/images/telegram1.png';
import Discorder from '../../assets/images/Discord1.png';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";


const FlexBoxHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const FlexBoxFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 130px;
  height: 100px;
  width: 90px;
  margin-left: 15%;
`;

const Join = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #212121;
  margin-bottom: 1rem;
`;

const Socials = styled.div`
  display: flex;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #212121;
  margin-bottom: 15px;
  column-gap: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const StyledUnifarmSmallLogo = styled.img`
  width: 180px;
`;

interface SideBarProps {
  open: boolean;
}
console.log(window.location.pathname);

const MenuItems: MenuItemsList[] = [
  // {
  //   fieldName: "Dashboard",
  //   fieldIcon: <HomeOutlinedIcon color="action"></HomeOutlinedIcon>,
  //   fieldPath: null,
  //   subMenus: null,
  // },
  {
    fieldName: 'Earn',
    fieldIcon: <OpacityOutlinedIcon color="action"></OpacityOutlinedIcon>,
    fieldPath: null,

    subMenus: [
      { fieldName: 'All Farms', fieldPath: '/farms' },
      { fieldName: 'My Stakes', fieldPath: '/mystakes' },
    ],
  },
  {
    fieldName: 'Trade',
    fieldIcon: <SwapHorizIcon color="action"> </SwapHorizIcon>,
    fieldPath: null,
    subMenus: [
      { fieldName: 'Exchange', fieldPath: '/exchange' },
      { fieldName: 'Liquidity', fieldPath: '/liquidity' },
    ],
  },
  // {
  //   fieldName: "Bridge",
  //   fieldIcon: <LayersOutlinedIcon color="action"> </LayersOutlinedIcon>,
  //   fieldPath: null,
  //   subMenus: null,
  // },
  // {
  //   fieldName: "Governance",
  //   fieldIcon: <HowToVoteOutlinedIcon color="action"> </HowToVoteOutlinedIcon>,
  //   fieldPath: null,
  //   subMenus: null,
  // },
  {
    fieldName: 'Governance',
    fieldIcon: <Governance color="action"> </Governance>,
    fieldPath: '/governance',
    subMenus: null,
  },

  {
    fieldName: 'Refer and Earn',
    fieldIcon: <InsertLinkOutlinedIcon color="action"> </InsertLinkOutlinedIcon>,
    fieldPath: '/referral',
    subMenus: null,
  },
  {
    fieldName: 'UniLaunch',
    fieldIcon: (
      <LaunchIcon color="action" style={{ fontSize: 20 }}>
        {' '}
      </LaunchIcon>
    ),
    fieldPath: '/launch',
    subMenus: null,
  },
];

export default function DesktopSideBar({ open }: SideBarProps): JSX.Element {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const FixedProSideBar = styled(ProSidebar)`
    position: fixed;
    width: ${open ? '80px!important' : '240px !important'};
    min-width: ${open ? '80px!important' : '240px !important'};
  `;

  return (
    <FixedProSideBar collapsed={open}>
      <FlexBoxHeader>
        {open ? (
          <UnifarmLargeLogo />
        ) : (
          <StyledUnifarmSmallLogo src={UnifarmSmallLogo} alt="UFARM" />
        )}
      </FlexBoxHeader>

      <Menu iconShape="square">
        {MenuItems.map((items) => {
          return items.subMenus === null ? (
            <MenuItem
              icon={items.fieldIcon}
              style={{ color: 'black' }}
              className={
                splitLocation[1] == items.fieldName.toLowerCase() ? 'active' : null
              }
            >
              <Link to={items.fieldPath} style={{ color: 'black' }}>
                {items.fieldName}
              </Link>
            </MenuItem>
          ) : (
            <SubMenu
              title={items.fieldName}
              icon={
                items.fieldIcon
              } /* onClick={() =>{return(openPage(index))}} className={MainMenu == index ? 'active' : null} */
            >
              {items.subMenus.map((subItems, subItemsIndex) => {
                return (
                  <MenuItem
                    key={subItemsIndex}
                    className={
                      splitLocation[2] == items.fieldName.toLowerCase() ? 'active' : null
                    }
                  >
                    <FlexWrapper>
                      <SmallFiberManualRecordIcon /> &nbsp;
                      <Link style={{ color: 'black' }} to={subItems.fieldPath}>
                        {subItems.fieldName}
                      </Link>
                    </FlexWrapper>
                  </MenuItem>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>

      <FlexBoxFooter>
        {open ? null : <Join>Join:</Join>}
        <Socials>
          <a target="_blank" rel="noreferrer" href="https://telegram.me/myunifarm">
            {open ? <Tippy content="Telegram"><img src={Telegrammer} width={32} height={32} /></Tippy>  :<img src={Telegrammer} width={32} height={32} />}
          </a>
          {!open && <span style={{ marginTop: '3px' }}>Telegram</span>}
        </Socials>
        <Socials>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/invite/bR6njxPsrg"
          >
            {open ? <Tippy content="Discord"><img src={Discorder} width={32} height={32} /></Tippy> : <img src={Discorder} width={32} height={32} />}
          </a>
          {!open && <span style={{ marginTop: '3px' }}>Discord</span>}
        </Socials>
      </FlexBoxFooter>
    </FixedProSideBar>
  );
}
