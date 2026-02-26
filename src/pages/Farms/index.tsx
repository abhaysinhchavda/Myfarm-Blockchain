import React, { useMemo } from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import "react-circular-progressbar/dist/styles.css";
import PageHeader from "../../components/PageHeader";
import MobileViewParent from "../../components/Views/MobileViewCard/MobileViewParent";
import {
  useApplicationUserState,
  useChangePoolsTabPosition,
} from "../../store/user/hooks";
import { Views } from "../../store/user/reducer";
import FarmCard from "./FarmCard";
import FarmMobileCard from "./FarmMobileCard";
import GridViewParent from "../../components/Views/GridView/GridViewParent";
import UserControlsContext from "../../contexts/UserControlContext";
import UserControls from "../../components/UserControls";
import { useActionScreenType } from "../../store/application/hooks";
import {
  usePoolFilter,
  /* usePoolFilter, */
  useSearchQuery,
} from "../../hooks/useMiscellaneous";
import ScreenContext from "../../contexts/ScreenContext";
import GlobalPage from "./GlobalPage";
import { useSortingHandlers } from "../../hooks/useSortingHandlers";
import _ from "loadsh";
import FarmList from "./FarmList";
import { Farm } from "../../store/farms/reducer";
import { useExactFarms } from "../../hooks/useHotPools";

const sortingOptions = [
  { value: "pools", label: "New pools" },
  { value: "APY", label: "APY" },
  { value: "TVL", label: "TVL" },
  { value: "strength", label: "Pool Strength" },
];

const Farms = () => {
  const theme = useTheme();
  const Mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const Ipad = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { sortingValue, sortHandler } = useSortingHandlers();

  const [search, searchQueryHandler] = useSearchQuery();

  const pools = useExactFarms();

  const orderedFarms: Farm[] = useMemo(() => {
    switch (sortingValue) {
      case "pools":
        return _.orderBy(pools, ["cohortDetails.poolStartTime"], ["desc"]);
      case "APY":
        return _.orderBy(pools, ["APY"], ["desc"]);
      case "TVL":
        return _.orderBy(pools, ["totalStaking"], ["desc"]);
      case "strength":
        return _.orderBy(pools, ["poolFilled"], ["desc"]);
      default:
        return _.orderBy(pools, ["cohortDetails.poolStartTime"], ["desc"]);
    }
  }, [sortingValue, pools]);

  const finalPoolsList = useMemo(() => {
    if (!orderedFarms) return null;
    if (!search) {
      return orderedFarms;
    }
    return orderedFarms.filter((e) => {
      return (
        e.farmDetails.symbol
          .toLowerCase()
          .startsWith(search.toLowerCase().trim()) ||
        e.farmDetails.name
          .toLowerCase()
          .startsWith(search.toLowerCase().trim()) ||
        e.cohortDetails.cohortVersion.toLowerCase() === search.toLowerCase()
      );
    });
  }, [orderedFarms, search]);

  const { action } = useActionScreenType();

  const { view } = useApplicationUserState();

  const setPoolsTabPosition = useChangePoolsTabPosition();

  const { poolTabPosition } = useApplicationUserState();

  const data = usePoolFilter();

  if (action === "STAKE") {
    return (
      <>
        <ScreenContext data={data}>
          <GlobalPage />
        </ScreenContext>
      </>
    );
  }

  // render desktop view
  const renderDesktopView = () => {
    return view === Views.LIST ? (
      <FarmList farms={finalPoolsList} />
    ) : (
      <GridViewParent>
        <FarmCard farms={finalPoolsList} />
      </GridViewParent>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <PageHeader
          title="Farms"
          content="Stake one token and earn multiple token as rewards with high APY and low risk"
          hasShowSwitch={true}
        />
      
      </div>
        <>
          <UserControlsContext
            action="STAKE"
            currentTabPosition={poolTabPosition}
            onTabChange={setPoolsTabPosition}
            onSearch={searchQueryHandler}
            onSortingHandler={sortHandler}
            sortingOptions={sortingOptions}
          >
            <UserControls />
          </UserControlsContext>

          <div>
            {Mobile ? (
              <MobileViewParent>
                <FarmMobileCard farms={finalPoolsList} />
              </MobileViewParent>
            ) : Ipad ? (
              <GridViewParent>
                <FarmCard farms={finalPoolsList} />
              </GridViewParent>
            ) : (
              <>{renderDesktopView()}</>
            )}
          </div>
        </>
    </div>
  );
};
export default Farms;
