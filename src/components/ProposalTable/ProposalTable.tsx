import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Illustration from "../../assets/images/others/Illustration.png";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import ProposalStatus from "./SubComponents/ProposalStatus";
import React from "react";
// import { Referral } from "../../store/referral/reducer";
// import { getDate, roundValue } from "../../utilities";
import Styled from "styled-components";
import ForAgainstBar from "./SubComponents/ForAgainstBar";
import TotalVotes from "./SubComponents/TotalVotes";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { alpha, styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProposalText from "./SubComponents/ProposalText";
import Rewards from "./SubComponents/Rewards";
// import { props } from "bluebird";

const NofoundContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20vh;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 143%;
    letter-spacing: 0.15px;
    color: #616161;
`;

interface Proposal1 {
  proposal: string;
  status: string;
  pollFor: number;
  pollAgainst: number;
  totalVotesNumber: number;
  totalVotesAddress: number;
  ImageofRwd: string;
  startsIn: any;
}

interface ProposalTableProps {
  proposal: Proposal1[];
  proposalBool: boolean;
  createdProposal: boolean;
  parentCallback: any;
  parentCallback2 : any;
  parentCallback3 : any;
}

const StyledMenu1 = styled((props: MenuProps) => (
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
    minWidth: "101px",
    minHeight: "152px",
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

const ProposalTable = (props: ProposalTableProps) => {
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const open3 = Boolean(anchorEl3);

  const handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const useStyles = makeStyles(() =>
    createStyles({
      header: {
        "& .MuiTableCell-root": {
          backgroundColor: "#F5F0FF",
          color: "#616161",
        },
      },
      ButtonClass: {
        maxWidth: "20px",
        maxHeight: "20px",
        minWidth: "20px",
        minHeight: "20px",
        marginLeft: "7px",
        marginTop: "-2px",
      },
      mobileImg: {
        position: "relative",
        left: "50px",
        width: 166,
        height: 170,
        top: "12px",
      },
      webImg: {
        position: "relative",
        left: "290px",
        width: 166,
        height: 170,
        top: "12px",
      },
      RewardMsg: {
        position: "relative",
        right: "-60px",
      },
      QtySpan: {
        top: "15px",
        position: "relative",
        left: "-14px",
      },
      TableContainer: {
        marginTop: "20px",
        width: "1181px",
      },
      proposalRow:{
        cursor:"pointer"
      }
    })
  );

  const classes = useStyles();

  const theme1 = useTheme();
  const Mobile = useMediaQuery(theme1.breakpoints.down("xs"));

  const handleCallback = (arrayNo:number) => {
    props.parentCallback("Details");
    props.parentCallback2(arrayNo);
    props.parentCallback3(props.createdProposal);
  };

  return (
    <div>
      {Mobile ? (
        <TableContainer style={{ marginTop: "20px" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell align="left">Proposal</TableCell>
                <TableCell align="right">
                  &nbsp;Status
                  <Button
                    className={classes.ButtonClass}
                    onClick={handleClick3}
                  >
                    <ArrowDropDownIcon width="10" height="10" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            {props.proposalBool ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <NofoundContainer>
                      <span> No Proposals found </span>
                    </NofoundContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.proposal?.map((items, index) => (
                  <TableRow key={index} onClick={() => handleCallback(index)} className={classes.proposalRow}>
                    <TableCell align="left">
                      <ProposalText proposalText={items.proposal} />
                    </TableCell>
                    <TableCell align="right"><ProposalStatus status={items.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : (
        <TableContainer className={classes.TableContainer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell align="left" size="small">
                  Proposal
                </TableCell>
                <TableCell align="left">
                  &nbsp;Status
                  <Button
                    className={classes.ButtonClass}
                    onClick={handleClick3}
                  >
                    <ArrowDropDownIcon width="10" height="10" />
                  </Button>
                </TableCell>
                <TableCell align="left">Poll&nbsp;</TableCell>
                <TableCell align="left">Total Votes&nbsp;</TableCell>
                <TableCell align="right">Rewards&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            {props.proposalBool ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <NofoundContainer>
                      <span> No Proposals Found</span>
                    </NofoundContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.proposal?.map((items, index) => (
                  <TableRow key={index} className={classes.proposalRow}  onClick={() => handleCallback(index)}>
                    <TableCell align="left" style={{ width: "350px" }}>
                      <ProposalText proposalText={items.proposal} />
                    </TableCell>
                    <TableCell align="left">
                      <ProposalStatus status={items.status} />
                    </TableCell>
                    <TableCell align="left">
                      <ForAgainstBar
                        proposalFor={items.pollFor}
                        proposalAgainst={items.pollAgainst}
                        status={items.status}
                        startsIn={items.startsIn}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TotalVotes
                        votes={items.totalVotesNumber}
                        addresses={items.totalVotesAddress}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Rewards rewards={items.ImageofRwd} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}

      <StyledMenu1
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose3}
      >
        <MenuItem onClick={handleClose3}>Scheduled</MenuItem>
        <MenuItem onClick={handleClose3}>Voting Live</MenuItem>
        <MenuItem onClick={handleClose3}>Passed</MenuItem>
        <MenuItem onClick={handleClose3}>Failed</MenuItem>
        <MenuItem onClick={handleClose3}>Cancelled</MenuItem>
      </StyledMenu1>
    </div>
  );
};

export default ProposalTable;
