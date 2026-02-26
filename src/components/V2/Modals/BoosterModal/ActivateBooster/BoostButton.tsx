import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";

import TimelineContent from "@mui/lab/TimelineContent";

import { makeStyles } from "@material-ui/core/styles";
import style from "styled-components";
// import Token1 from "../../../assets/V2/Images/tk1.png";
// import Tk1 from "../../../assets/V2/Images/tk1.png";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
// import ChildModal from "./ChildModal";

const BoosterStakeButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 15px;
text-transform: capitalize;
position: static;
font-size: 15px;
font-weight: 500;
height: 40px;
left: calc(50% - 400px/2);
top: calc(50% - 55px/2 + 97px);
border:none;
/* primary brand/main */
color:white;
background: #673AB7;
box-shadow: 0px 7px 18px -2px rgba(103, 58, 183, 0.56);
border-radius: 10px;
cursor: pointer;
/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;

`;
const VersionWrapper = style.span`
color: #000000;
font-size: 14px;
font-weight: 400;
margin-left: 0.6rem;
font-family: Inter;
font-style: normal;
width:  100%;
line-height: 24px;
`;

const useStyles = makeStyles(() => ({
  timelineItem: {
    minHeight: "50px !important",
    "&:before": {
      display: "none",
    },
  },
  activeTimelineContent: {
    height: "80px",
    margin: "5px 0px !important",
    border: "1px solid #E0E0E0",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  approvedTimelineContent: {
    height: "44px",
    margin: "5px 0px !important",
    border: "1px solid #009F42",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timelineContent: {
    height: "44px",
    margin: "5px 0px !important",
    justifyContent: "space-between",
    border: "1px solid #E0E0E0",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  timelineConnector: {
    border: "1px dashed #bdbdbd",
    backgroundColor: "transparent !important",
  },
  timeLine: {
    padding: "0 !important",
    margin: "8px 0px !important",
  },
  timeLineSeparator: {
    paddingRight: "5px",
  },
  timeLineDot: {
    background: "#FFF !important",
    marginTop: "0px !important",
    marginBottom: "0px !important",
  },
  timeLineDotActive: {
    background: "#673AB7 !important",
    marginTop: "0px !important",
    marginBottom: "0px !important",
  },
  timeLineDotApproved: {
    background: "#009F42 !important",
    marginTop: "0px !important",
    marginBottom: "0px !important",
  },
}));

interface IsBoostButton{
  click:()=>void
}

function BoostButton({click}:IsBoostButton) {
  const classes = useStyles();


  return (
    <>

      <Timeline className={classes.timeLine}>
        <TimelineItem className={classes.timelineItem}>
          <TimelineContent className={classes.activeTimelineContent}>
            <VersionWrapper>
              Boost the transaction made
            </VersionWrapper>
            <BoosterStakeButton onClick={click}>
              Boost Transaction<RocketLaunchOutlinedIcon style={{ marginLeft: '5px', fontSize: 25 }} />
            </BoosterStakeButton>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

    </>
  );
}

export default BoostButton
