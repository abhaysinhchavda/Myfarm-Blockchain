import _ from "lodash";
import React, { Fragment } from "react";
import GlobalLoader from "../../components/GlobalLoader";
import { Farm } from "../../store/farms/reducer";
import MobileViewCard from "../../components/Views/MobileViewCard";

export default function FarmMobileCard({ farms }: { farms: Farm[] }) {
  const isLoading = !farms;
  return (
    <Fragment>
      {isLoading ? (
        <GlobalLoader color="black" />
      ) : (
        farms !== null &&
        !_.isEmpty(farms) &&
        farms.map((farm, index) => {
          return <MobileViewCard key={index} action="STAKE" farm={farm} />;
        })
      )}
    </Fragment>
  );
}
