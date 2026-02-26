import React, { Fragment } from "react";
import _ from "lodash";
import ListView from "../../components/Views/ListView";
//import GlobalLoader from "../../components/GlobalLoader";
import { StakeDetails } from "../../store/stakes/reducer";
import ContentLoader from "../../components/ContentLoader";

export default function StakesList({
  activeOrUnActiveStakes,
}: {
  activeOrUnActiveStakes: StakeDetails[];
}): JSX.Element {
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
          return (
            <ListView
              key={index}
              action="UNSTAKE"
              farm={items}
              stakedAmount={items.stakedAmount}
            />
          );
        })
      )}
    </Fragment>
  );
}
