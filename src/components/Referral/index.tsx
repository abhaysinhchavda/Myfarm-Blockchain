import ReferralWork from "./ReferralWork";
import Horse from "../../assets/images/others/horse.png";
import React from "react";

const Referral = () => {

  const rows = [
    {
      index: 0,
      address: "3J98t1WpEZ73CNmQviecrnyiWrnqiWrnqRhWNLy",
      cohort: "V24",
      rewards: [
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
      ],
      claimedOn: "24 Jan 2021",
    },
    {
      index: 1,
      address: "3J98t1WpEZ73CNmQviecrnyiWrnqiWrnqRhWNLy",
      cohort: "V24",
      rewards: [
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
      ],
      claimedOn: "24 Jan 2021",
    },
    {
      index: 2,
      address: "3J98t1WpEZ73CNmQviecrnyiWrnqiWrnqRhWNLy",
      cohort: "V24",
      rewards: [
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
        { Imageofrwd: Horse, Qty: 4 },
      ],
      claimedOn: "24 Jan 2021",
    },
  ];

  return (
    <div>
    <ReferralWork totalReferredFriends={8} rewardsUSDValue="888.888" linkAddress="CXROIOER%$)(CXROIOER%$)(" arrayOfRows={rows} />
    </div>
  )
};

export default Referral;
