import React from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@material-ui/core";
import Styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";

const NofoundContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh
;
`;

const ViewMoreContainer = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 2vh;
    text-decoration: underline;
    color: #616161;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
;
`;

interface VoterArray {
  voters: any;
  proposalVoted: any;
  votingPower: any;
}

interface TableforDetailsProps {
  status: any;
  votes: VoterArray[];
}

const TableforDetails = (props: TableforDetailsProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      header: {
        "& .MuiTableCell-root": {
          backgroundColor: "#F5F0FF",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: " 14px",
          lineHeight: "24px",

          letterSpacing: "0.17px",

          color: "#616161",
        },
      },

      components: {
        "& .MuiTableCell-root": {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "14px",
          lineHeight: "143%",
          /* identical to box height, or 20px */

          letterSpacing: "0.15px",

          color: "#212121",
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
        marginLeft: "10px",
      },
      gridClass: {
        width: "642px",
        [theme.breakpoints.down(1200)]: {
          width: "1154px",
        },
      },
      tableRow: {
        cursor: "pointer",
      },
      voters: {
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: " 14px",
        lineHeight: "24px",

        letterSpacing: "0.17px",

        color: "#616161",
      },
    })
  );

  const [state, setState] = React.useState(false);

  const classes = useStyles();

  const theme1 = useTheme();
  const Mobile = useMediaQuery(theme1.breakpoints.down("xs"));
  return (
    <Grid item className={classes.gridClass}>
      {Mobile ? (
        props.status === "Scheduled" ? null : (
          <TableContainer style={{ marginTop: "20px" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className={classes.header}>
                  <TableCell align="left" className={classes.voters}>
                    Voters
                  </TableCell>
                  <TableCell align="right">Proposal Voted</TableCell>
                </TableRow>
              </TableHead>
              {props.status === "Cancelled" ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <NofoundContainer>No data found</NofoundContainer>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {props.votes?.map((items, index) => (
                    <TableRow key={index} className={classes.components}>
                      <TableCell align="left">
                        {items.voters.slice(0, 20)}...
                      </TableCell>
                      <TableCell align="right">{items.proposalVoted}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )
      ) : props.status === "Scheduled" ? null : (
        <TableContainer className={classes.TableContainer} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell align="left" className={classes.voters}>
                  Voters
                </TableCell>
                <TableCell align="left">Proposal Voted&nbsp;</TableCell>
                <TableCell align="right">Voting Power</TableCell>
              </TableRow>
            </TableHead>
            {props.status === "Cancelled" ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>
                    <NofoundContainer>No data found</NofoundContainer>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {props.votes?.slice(0, 3).map((items, index) => (
                  <TableRow key={index} className={classes.components}>
                    <TableCell align="left">{items.voters}</TableCell>
                    <TableCell align="left">{items.proposalVoted}</TableCell>
                    <TableCell align="right">{items.votingPower}</TableCell>
                  </TableRow>
                ))}

                {state === false ? (
                  <TableRow className={classes.tableRow}>
                    <TableCell colSpan={4}>
                      <ViewMoreContainer>
                        <a onClick={() => setState(true)}>Load more</a>
                      </ViewMoreContainer>
                    </TableCell>
                  </TableRow>
                ) : (
                  props.votes?.slice(3).map((items, index) => (
                    <TableRow key={index} className={classes.components}>
                      <TableCell align="left">{items.voters}</TableCell>
                      <TableCell align="left">{items.proposalVoted}</TableCell>
                      <TableCell align="right">{items.votingPower}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default TableforDetails;
