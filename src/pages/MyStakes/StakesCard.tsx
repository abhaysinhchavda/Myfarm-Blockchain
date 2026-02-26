import React from "react";
import _ from "lodash";
import { Fragment } from "react";
import GridView from "../../components/Views/GridView";
import { StakeDetails } from "../../store/stakes/reducer";
import ContentLoader from "../../components/ContentLoader";

export default function StakesCard({
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
          message="Please wait we are fetching your stakes"
        />
      ) : (
        activeOrUnActiveStakes.map((items, index) => {
          return (
            <GridView
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
