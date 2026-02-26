import React, { useMemo } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import {
  useApplicationUserState,
  useChangeStakesTabPosition,
} from "../../store/user/hooks";
import { Views } from "../../store/user/reducer";
import GridViewParent from "../../components/Views/GridView/GridViewParent";
import StakesList from "./StakesList";
import StakesCard from "./StakesCard";
import { useWeb3React } from "@web3-react/core";
import PageHeader from "../../components/PageHeader";
import UserControlsContext from "../../contexts/UserControlContext";
import UserControls from "../../components/UserControls";
import MobileViewParent from "../../components/Views/MobileViewCard/MobileViewParent";
import StakesMobileCard from "./StakesMobileCard";
import styled from "styled-components";
import WalletNotConnected from "./WalletNotConnected";
import { useDeriveStakes } from "../../store/stakes/hooks";
import { useActionScreenType } from "../../store/application/hooks";
import ScreenContext from "../../contexts/ScreenContext";
import GlobalPage from "./GlobalPage";
import { useData, useSearchQuery } from "../../hooks/useMiscellaneous";
import { StakeDetails } from "../../store/stakes/reducer";
import { useSortingHandlers } from "../../hooks/useSortingHandlers";
import RefreshBanner from "../../components/RefreshBanner/RefreshBanner";
import _ from "lodash";

const Nostake = styled.div`
  margin-top: 50px;
`;

const sortingOptions = [
  { value: "Timestamp", label: "Timestamp" },
  { value: "APY", label: "APY" },
  { value: "TVL", label: "TVL" },
];

export default function MyStakes(): JSX.Element {
  const theme = useTheme();
  const Mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const Ipad = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { view, myStakeTabPosition } = useApplicationUserState();

  const { stakesOrClaims, noClaimFound, noStakesFound } = useDeriveStakes();

  const { sortingValue, sortHandler } = useSortingHandlers();
  const [search, searchQueryHandler] = useSearchQuery();

  const orderedStakes: StakeDetails[] = useMemo(() => {
    switch (sortingValue) {
      case "Timestamp":
        return _.orderBy(stakesOrClaims, ["time"], ["desc"]);
      case "APY":
        return _.orderBy(stakesOrClaims, ["APY"], ["desc"]);
      case "TVL":
        return _.orderBy(stakesOrClaims, ["totalStaking"], ["asc"]);
      default:
        return _.orderBy(stakesOrClaims, ["time"], ["desc"]);
    }
  }, [sortingValue, stakesOrClaims]);

  const finalStakeList = useMemo(() => {
    if (!orderedStakes) return null;
    if (!search) {
      return orderedStakes;
    }
    return orderedStakes.filter((e) => {
      return (
        e.farmDetails.symbol
          .toLowerCase()
          .startsWith(search.toLowerCase().trim()) ||
        e.farmDetails.name
          .toLowerCase()
          .startsWith(search.toLowerCase().trim()) ||
        e.farmDetails.address.toLowerCase() === search.toLowerCase()
      );
    });
  }, [orderedStakes, search]);

  const renderDesktopView = () => {
    return view === Views.LIST ? (
      <StakesList activeOrUnActiveStakes={finalStakeList} />
    ) : (
      <GridViewParent>
        <StakesCard activeOrUnActiveStakes={finalStakeList} />
      </GridViewParent>
    );
  };

  const { active } = useWeb3React();

  const { action } = useActionScreenType();

  const changeStakeTabPosition = useChangeStakesTabPosition();

  const data = useData();

  if (action === "UNSTAKE") {
    return (
      <>
        <ScreenContext data={data}>
          <GlobalPage />
        </ScreenContext>
      </>
    );
  }

  return (
    <div>
      
        <RefreshBanner />
        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
        <PageHeader
          title="My Stakes"
          content="Stake one token and earn multiple token as rewards with high APY and low risk"
          hasShowSwitch={true}
       />
          
        </div>
         
           <>
        <UserControlsContext
          action="UNSTAKE"
          currentTabPosition={myStakeTabPosition}
          onTabChange={changeStakeTabPosition}
          onSearch={searchQueryHandler}
          onSortingHandler={sortHandler}
          sortingOptions={sortingOptions}
        >
          <UserControls />
        </UserControlsContext>   
      
      {noStakesFound || noClaimFound ? (
        <Nostake>
          No staked cohorts found! Participate in a cohort to view your stakes
          here!
        </Nostake>
      ) : active ? (
        Mobile ? (
          <MobileViewParent>
            <StakesMobileCard activeOrUnActiveStakes={finalStakeList} />
          </MobileViewParent>
        ) : Ipad ? (
          <GridViewParent>
            <StakesCard activeOrUnActiveStakes={finalStakeList} />
          </GridViewParent>
        ) : (
          <>{renderDesktopView()}</>
        )
      ) : (
        <WalletNotConnected />
      )}
      </>

    </div>


  );
}
