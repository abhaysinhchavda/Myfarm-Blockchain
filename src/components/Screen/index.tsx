import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HeaderComponent from "./HeaderComponent";
import { useActionScreenType } from "../../store/application/hooks";
import StakeActionCard from "./ActionCards/StakeActionCard";
import UnstakeActionCard from "./ActionCards/UnStakeActionCard";
import ClaimCard from "./ActionCards/ClaimCard";
import MyReward, { ExpectedReward } from "./MyReward";
import { useApplicationUserState } from "../../store/user/hooks";
import { StakeTabPosition } from "../../store/user/reducer";
import TopHeaderComponent from "./TopHeaderComponent";

interface ScreenProps {
  expectedRewards: ExpectedReward[];
}

export default function Screen({ expectedRewards }: ScreenProps): JSX.Element {
  const { action } = useActionScreenType();

  const { myStakeTabPosition } = useApplicationUserState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopHeaderComponent />
      <Grid container spacing={2}>
        <HeaderComponent />

        {action === "STAKE" ? (
          <StakeActionCard />
        ) : myStakeTabPosition === StakeTabPosition.STAKE ? (
          <UnstakeActionCard />
        ) : (
          <ClaimCard />
        )}

        <MyReward expectedRewards={expectedRewards} title="Expected Rewards" />
      </Grid>
    </Box>
  );
}
