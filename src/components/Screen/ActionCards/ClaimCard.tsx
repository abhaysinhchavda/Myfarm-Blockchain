import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { useScreenContext } from "../../../contexts/ScreenContext";
import { getDate, roundValue } from "../../../utilities/index";
import { explolers } from "../../../constants/chain";
import { useApplicationUserState } from "../../../store/user/hooks";

const SpanFlexWrapper = styled.span`
  display: flex;
  font-size: 24px;
  margin-top: -1rem;
  top: 21px;
  left: 29px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
  color: #717980;
`;

const StakedAmountWrapper = styled.span`
  display: flex;
  top: 78px;
  left: 31px;
  font-family: Inter;
  font-style: normal;
  color: #787878 !important;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  color: black;
  margin-top: 35px;
`;
const StakedRortWrapper = styled.span`
  display: flex;
  top: 78px;
  color: #787878 !important;
  left: 31px;
  font-family: Inter;
  font-style: normal;
  margin-bottom: 1rem;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  color: black;
  margin-top: 35px;
  text-align: left;
  width: 41px;
`;
const StyledStakedAmount = styled.span`
  display: flex;
  top: 75px;
  left: 31px;
  margin-bottom: 1rem;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`;

const FlexWrapperForReward = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 35px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FlexWrapperSmall = styled.span`
  display: flex;
  top: 179px;
  left: 34px;
  margin-bottom: 1rem;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  color: #787878 !important;
`;

const FlexWrapperLarge = styled.span`
  display: flex;
  top: 225px;
  left: 37px;
  margin-bottom: 1rem;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`;

const ViewOnExplolerLink = styled.a`
  margin-left: 65px;
  font-size: 15px;
  text-decoration: underline;
  color: #787878;
  margin-top: 21px;
  @media only screen and (max-width: 600px) {
    margin-left: 0px;
  }
`;

const Item = muiStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  background: "white",
  borderRadius: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-between",
  boxShadow:
    "0 0 0.5px rgba(6, 10, 13, 0.4), 0 8px 16px rgba(113, 121, 128, 0.08)",
  [theme.breakpoints.between("xs", "sm")]: {
    width: "343px !important",
    background: "#F8F4FF !important",
  },
}));

export default function ClaimCard(): JSX.Element {
  const { farm, stakeDetails } = useScreenContext();
  const { appChainId } = useApplicationUserState();
  return (
    <Fragment>
      <Grid item xs={12} lg={6}>
        <Item>
          <div style={{ width: "100%" }}>
            <SpanFlexWrapper>My Statistics</SpanFlexWrapper>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StakedAmountWrapper>Staked Amount</StakedAmountWrapper>
              <StakedRortWrapper>ROI</StakedRortWrapper>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StyledStakedAmount>
                {stakeDetails.stakedAmount} {farm.farmDetails.name}
              </StyledStakedAmount>
              <StyledStakedAmount>
                {roundValue(farm.APY, 3)}%
              </StyledStakedAmount>
            </div>
            <FlexWrapperForReward>
              <div>
                <FlexWrapperSmall>Rewards Claimed On</FlexWrapperSmall>
                <FlexWrapperLarge>
                  {getDate(stakeDetails.time)}
                </FlexWrapperLarge>
              </div>
              <ViewOnExplolerLink
                href={`${explolers[appChainId]}/tx/${stakeDetails.transactionHash}`}
                target="_blank"
              >
                View on Explorer
              </ViewOnExplolerLink>
            </FlexWrapperForReward>
          </div>
        </Item>
      </Grid>
    </Fragment>
  );
}
