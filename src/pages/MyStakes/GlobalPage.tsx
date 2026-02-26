import React, { Fragment } from "react";
import Screen from "../../components/Screen";
import { useScreenContext } from "../../contexts/ScreenContext";

export default function GlobalPage(): JSX.Element {
  const { stakeDetails } = useScreenContext();

  return (
    stakeDetails && (
      <Fragment>
        <Screen expectedRewards={stakeDetails.rewards} />
      </Fragment>
    )
  );
}
