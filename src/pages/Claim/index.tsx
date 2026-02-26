import Tab from "../../components/Tabs/ClaimActionTabs";
import React from "react";
import Brodcame from "../../components/PageHeader";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
const MyClaim = () => {
  return (
    <div>
      <div>
        <Brodcame title="Claim UFARM" content="" hasShowSwitch={false}/>
      </div>
      <div style={{ textAlign: "left" }}>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
      </div>
      <Tab />
    </div>
  );
};
export default MyClaim;
