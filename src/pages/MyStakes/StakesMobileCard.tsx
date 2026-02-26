import _ from "lodash";
import React, { Fragment } from "react";
import ContentLoader from "../../components/ContentLoader";
import MobileViewCard from "../../components/Views/MobileViewCard";
import { StakeDetails } from "../../store/stakes/reducer";

export default function StakesMobileCard({
  activeOrUnActiveStakes,
}: {
  activeOrUnActiveStakes: StakeDetails[];
}) {
  const isLoading = _.isEmpty(activeOrUnActiveStakes);
  return (
    <Fragment>
      {isLoading ? (
        <ContentLoader
          color="black"
          message="Please Wait we are fetching your stakes"
        />
      ) : (
        activeOrUnActiveStakes !== null &&
        !_.isEmpty(activeOrUnActiveStakes) &&
        activeOrUnActiveStakes.map((items, index) => {
          return <MobileViewCard key={index} action="UNSTAKE" farm={items} />;
        })
      )}
    </Fragment>
  );
}
