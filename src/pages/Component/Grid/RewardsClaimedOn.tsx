// import { props } from "bluebird";
import React from "react";

interface RewardsProps {
  claimedDate: any;
}

const RewardsClaimedOn = (props: RewardsProps) => {
  return (
    <div>
      <span
        style={{
          display: "flex",
          top: "179px",
          left: "34px",
          marginBottom: "1rem",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "20px",
          lineHeight: "24px",
          color: "#000000",
        }}
      >
        Rewards Claimed On
      </span>
      <span
        style={{
          display: "flex",
          top: "225px",
          left: "37px",

          marginBottom: "1rem",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "20px",
          lineHeight: "24px",
          color: "#000000",
        }}
      >
        {props.claimedDate}
      </span>
    </div>
  );
};

export default RewardsClaimedOn;
