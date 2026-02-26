import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Illustration from "../../assets/images/others/Illustration.png";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";

import React from "react";
import { Referral } from "../../store/referral/reducer";
import { getDate, roundValue } from "../../utilities";
import Styled from 'styled-components'
const NofoundContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh
;
`

interface RefernEarnTableProps {
  referrals: Referral[];
  noReferFound: boolean;
}

const RefernEarnTable = ({ referrals, noReferFound }: RefernEarnTableProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      header: {
        "& .MuiTableCell-root": {
          backgroundColor: "#F5F0FF",
        },
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
    })
  );

  const classes = useStyles();

  const theme1 = useTheme();
  const Mobile = useMediaQuery(theme1.breakpoints.down("xs"));

  return (
    <div>
      {Mobile ? (
        <TableContainer
          style={{ marginTop: "20px"}}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell align="left">Address</TableCell>
                <TableCell align="right">Claimed On&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            {noReferFound ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <NofoundContainer>
                     <img src={Illustration} />
                      <span > No Rewards found. Refer Friends to Earn</span>
                    </NofoundContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {referrals?.map((items, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">
                      {items.referedUserAddress.slice(0, 20)}...
                    </TableCell>
                    <TableCell align="right">
                      {getDate(items.claimedOn)}
                    </TableCell>
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
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Cohort</TableCell>
                <TableCell align="left">Rewards&nbsp;</TableCell>
                <TableCell align="right">Claimed On&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            {noReferFound ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <NofoundContainer>
                     <img src={Illustration} />
                      <span > No Rewards found. Refer Friends to Earn</span>
                    </NofoundContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {referrals?.map((items, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">
                      {items.referedUserAddress}
                    </TableCell>
                    <TableCell align="left">
                      {items.cohortDetails.cohortVersion}
                    </TableCell>
                    <TableCell align="left">
                      {items.referralRewards.map((rItems, rI) => {
                        return (
                          <span key={rI}>
                            {" "}
                            <img
                              src={rItems.icon}
                              alt={rItems.symbol}
                              width="20px"
                              height="20px"
                              style={{ marginTop: "10px" }}
                            />
                            <span className={classes.QtySpan}>
                              {roundValue(rItems.reward, 2)}
                            </span>
                          </span>
                        );
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {getDate(items.claimedOn)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RefernEarnTable;
