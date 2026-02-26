import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Style from 'styled-components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';

const MenuWrapper = Style.div`
display:flex;
align-items:center;
justify-content:space-between;
width:192px;
padding-left:1rem;
padding-top:0.8rem;
padding-right:0.5rem;
`;
const ButtonWrapper = Style.div`
display:flex;
justify-content:space-around;
margin-top:1.5rem;
margin-bottom:0.5rem;
`;
const SortByHeader = Style.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 19px;
padding-left:1rem;
padding-top:0.5rem;
padding-bottom:0.5rem;
`;

const useStyles = makeStyles((theme: Theme) => ({
  Menu: {
    padding: '4px !important',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      background: '#673AB7 !important',
      borderRadius: '4px !important',
    },
  },
  Arrows: {
    color: '#616161',
    textAlign: 'center',
    fontSize: 20,
    '&:hover': {
      color: 'white !important',
    },
  },
  Mybutton: {
    color: '#616161 !important',
    marginTop: '10px !important',
    marginLeft: '17px !important',
    paddingRight: '20px !important',
    display: 'flex !important',
    width: '100% !important',
    justifyContent: 'space-between !important',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
    },
    '&:hover': {
      background: 'transparent !important',
    },
  },
  Divider: {
    marginLeft: '20px !important',
    height: '1px !important',
    background: 'rgba(0, 0, 0, 0.42) !important',
    width: '225px !important',
    [theme.breakpoints.down('xs')]: {
      width: '100PX !important',
    },
  },
  buttonCancel: {
    color: '#673AB7 !important',
  },
  buttonApply: {
    border: '1px solid #673AB7 !important',
    width: '93px',
    height: '37px',
    color: '#673AB7 !important',
    fontFamily: 'Inter !important',
    fontStyle: 'normal !important',
    borderRadius: '10px !important',
    fontSize: '15px !important',
    '&:hover': {
      background: '#673AB7 !important',
      boxShadow: '0px 7px 18px -2px rgba(103, 58, 183, 0.56) !important',
      borderRadius: '10px !important',
      color: 'white !important',
    },
  },
}));

// eslint-disable-next-line
type SortOption = {
  /** sort label */
  sortLabel: string,
  /** left direction label */
  lDirLabel: string,
  /** right direction label */
  rDirection: string
}

export interface SortByProps {
  /** sort options */
  sortOptions: string[];
  /** sort handler for handling the sorting */
  sortHandler: (keys: string[]) => void;
  /** open */
  toggle: (anchorEl: HTMLElement | null) => void,
  /** element */
  anchorEl: HTMLElement | null,
  /** current keys */
  currentKeys: string[];
  /** apply */
  apply: () => void;
}

export default function SortBy({
  sortOptions,
  sortHandler,
  currentKeys,
  anchorEl,
  toggle,
  apply,
}: SortByProps) {

  const classes = useStyles();
  const open = Boolean(anchorEl);

  
  /* const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }; 

  const handleClose = () => {
    setAnchorEl(null);
  };  */
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => {
          toggle(e.currentTarget)
        }}
        className={classes.Mybutton}
        style={{ textTransform: 'capitalize' }}
      >
        Sort By
        <ArrowDropDownIcon />
      </Button>
      <Divider className={classes.Divider} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => toggle(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <SortByHeader>Sort By</SortByHeader>
        <Divider />
        {sortOptions.map((sortlabel, index) => {
          return (
            <MenuWrapper key={index}>
              <span>{sortlabel}</span>
              <div style={{ display: 'flex' }}>
                <MenuItem
                  onClick={() => sortHandler([sortlabel, 'ASC'])}
                  className={classes.Menu}
                  style={{
                    background: sortlabel === currentKeys[0] ? '#673AB7' : null,
                    borderRadius: 4,
                  }}
                >
                  <ArrowUpwardIcon
                    className={
                      classes.Arrows
                    } style={{ color: sortlabel === currentKeys[0]  ? 'white' : null }}
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => sortHandler([sortlabel, 'DESC'])}
                  className={classes.Menu}
                  style={{
                    background: sortlabel === currentKeys[0] ? '#673AB7' : null,
                    borderRadius: 4,
                  }}
                >
                  <ArrowDownwardIcon
                    className={
                      classes.Arrows
                    } style={{ color: sortlabel === currentKeys[0]  ? 'white' : null }}
                  />
                </MenuItem>
              </div>
            </MenuWrapper>
          );
        })}
        <ButtonWrapper>
          <Button
            style={{ textTransform: 'capitalize', fontWeight: 600 }}
            className={classes.buttonCancel}
            onClick={()  => toggle(null)}
          >
            Cancel
          </Button>
          <Button
            style={{ textTransform: 'capitalize', fontWeight: 600 }}
            className={classes.buttonApply}
            onClick={apply}
          >
            Apply
          </Button>
        </ButtonWrapper>
      </Menu>
    </div>
  );
}
