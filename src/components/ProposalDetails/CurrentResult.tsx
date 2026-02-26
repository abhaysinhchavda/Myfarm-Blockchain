import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import Divider from "@mui/material/Divider";
// import CircularProgress from "@mui/material/CircularProgress";
// import { withStyles } from "@material-ui/core/styles";
// import {CircularProgressbar,  buildStyles } from "react-circular-progressbar";
// import styled from "styled-components";

import Greendot from "../../assets/images/others/greendot.png";
import Reddot from "../../assets/images/others/reddot.png";
import Yellowdot from "../../assets/images/others/yellowdot.png";
// import { Chart, PieSeries } from "@devexpress/dx-react-chart-material-ui";
import { Theme } from "@material-ui/core/styles";
import Chart from "react-apexcharts";

interface CurrentResultProps {
  forer: any;
  against: any;
  abstain: any;
  status: any;
}

const options = {
  colors: ["#00C853", "#C62828", "#FFC107"],
  plotOptions: {
    pie: {
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  labels: ["For", "Against", "Abstain"],
  legend: {
    show: false,
  },
};
const series = [50, 25, 25];

const CurrentResult = (props: CurrentResultProps) => {
  // const data = [
  //   { transportationType: "Dummy", val: 0 },
  //   { transportationType: "Against", val: props.against },
  //   { transportationType: "For", val: props.forer },
  //   { transportationType: "Abstain", val: props.abstain },
  // ];

  const useStyles = makeStyles((theme: Theme) => ({
    paperClass: {
      width: "440px",
      boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
      height: props.status === "Scheduled" ? "138px" : "270px",
      marginLeft: "15%",
      marginTop: "20px",
      [theme.breakpoints.down(1200)]: {
        width: "100%",
        marginLeft: "10px",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "-0px",
      },
    },
    currentResult: {
      width: "158px",
      height: "24px",
      position: "relative",
      top: "15px",
      left: "9px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "19px",
      lineHeight: "24px",
      color: "#212121",
      letterSpacing: "0.15px",
    },
    Divider: {
      position: "relative",
      top: "25px",
    },
    donutchart: {
      position: "relative",
      marginTop: "35px",
      width: "120px",
      height: "120px",
      marginLeft: "27%",

      [theme.breakpoints.down(1200)]: {
        marginLeft: "40%",
      },
      [theme.breakpoints.between(600, 900)]: {
        marginLeft: "36%",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "29%",
      },
    },
    for: {
      position: "relative",
      left: "-60px",
      top: "27px",
    },
    against: {
      position: "relative",
      right: "-60px",
      top: "5px",
    },
    abstain: {
      position: "relative",
      top: "15px",
      marginBottom: "4rem",
    },
    notFound: {
      position: "relative",
      top: "50px",
    },
    textPoll: {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "143%",
      letterSpacing: "0.15px",

      color: "#212121",
      marginLeft: "10px",
      position: "relative",
      top: "-3px",
    },
  }));

  const classes = useStyles();

  return (
    <Grid item lg={4} sm={12} xs={12}>
      <Paper className={classes.paperClass}>
        <div className={classes.currentResult}>Current Result</div>
        <Divider className={classes.Divider} />

        {props.status === "Scheduled" ? (
          <div className={classes.notFound}> No data found</div>
        ) : (
          <div>
            <div className={classes.donutchart}>
              <Chart
                options={options}
                series={series}
                type="donut"
                width="200"
                legend={false}
              />
            </div>

            <div className={classes.for}>
              <img src={Greendot} height={17} width={17} />{" "}
              <span className={classes.textPoll}>For 50%</span>
            </div>
            <div className={classes.against}>
              <img src={Reddot} height={17} width={17} />
              <span className={classes.textPoll}> Against 25% </span>
            </div>
            <div className={classes.abstain}>
              <img src={Yellowdot} height={17} width={17} />
              <span className={classes.textPoll}> Abstain 25% </span>
            </div>
          </div>
        )}
      </Paper>
    </Grid>
  );
};

export default CurrentResult;
