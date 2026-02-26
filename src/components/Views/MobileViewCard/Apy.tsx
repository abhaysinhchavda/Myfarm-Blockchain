import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { APYProps } from "../ListView/Apy";
import { useApy } from "../../../hooks/useCohortHooks";
import { roundValue } from "../../../utilities";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/Info";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const useStyles = makeStyles(() => ({
  ApyTitle: {
    color: "black",
    fontWeight: 600,
    fontSize: "12px",
    position: "relative",
    left: "-15px",
    top: "-13px",
  },
  ApyValue: {
    marginTop: "-42px",
    fontWeight: 600,
    color: "#6338bc",
    textAlign: "right",
  },
  tippy: {
    position: "relative",
    top: "-42px",
    left: "30px",
  },
}));

const StyledInfoIcon = styled(InfoIcon)`
  font-size: 13px;
  color: #c4c4c4;
  margin-left: 0.5rem;
`;

export default function Apy({ action, APY, apyRange }: APYProps): JSX.Element {
  const classes = useStyles();
  const apy = useApy(action, APY, apyRange);
  return (
    <div>
      <p className={classes.ApyTitle}>Current APY</p>
      <span className={classes.tippy}>
        <Tippy
          theme="light"
          placement="top"
          content="Estimated APY rewards if you staked 100$ worth of tokens"
        >
          <StyledInfoIcon />
        </Tippy>
      </span>
      <p className={classes.ApyValue}>{roundValue(apy, 2)}%</p>
    </div>
  );
}
