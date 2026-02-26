import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { RewardToken } from "../../utilities";
import _ from "loadsh";
import MySkeleton from "../skeleton";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import InfoIcon from "@material-ui/icons/Info";

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow:
    "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
  [theme.breakpoints.down("xs")]: {
    boxShadow: "none !important",
  },
}));
const useStyles = makeStyles((theme) => ({
  secondDiv: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    flexFlow: "wrap",
    alignItems: "center",
  },
  firstDiv: {
    width: "100%",
    marginTop: "0.8rem",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  reward: {
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none !important",
      background: "transparent !important",
    },
  },
  title: {
    display: "flex",
    fontSize: 22,
    marginTop:"-10px",
    marginLeft: "1rem",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  imageDiv: {
    width: 127,
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: 97,
    },
  },
}));

export interface ExpectedReward extends RewardToken {}

interface MYRewardProps {
  expectedRewards: ExpectedReward[];
  title: string;
}

const MyReward = ({ expectedRewards, title }: MYRewardProps) => {
  const classes = useStyles();
  const isLoading = true;

  return (
    <>
      {isLoading ? (
        <Grid item xs={12} lg={6}>
          <Item2 style={{ height: "100%" }} className={classes.reward}>
            <div className={classes.firstDiv}>
              <span className={classes.title}>{title}</span>
              <div className={classes.secondDiv}>
                {!_.isEmpty(expectedRewards) &&
                  expectedRewards.map((rewards, index) => {
                    return (
                      <div className={classes.imageDiv} key={index}>
                        <Tippy
                          theme="light"
                          placement="top"
                          content={<div>{rewards?.symbol}</div>}
                        >
                          <div>
                            <img src={rewards?.icon} style={{ width: 25 }} />
                          </div>
                        </Tippy>
                        <span>
                          {rewards?.reward?.toString().slice(0, 8)}
                          {rewards?.reward?.toString().length > 8 ? (
                            <>
                              ...
                              <Tippy
                                theme="light"
                                placement="top"
                                content={rewards.reward}
                              >
                                <InfoIcon
                                  style={{
                                    fontSize: "13px",
                                    color: "#C4C4C4",
                                  }}
                                />
                              </Tippy>
                            </>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Item2>
        </Grid>
      ) : (
        <MySkeleton width="50%" height={600} top="-7rem" left="1rem" />
      )}
    </>
  );
};
export default MyReward;
