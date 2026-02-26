import React, { Fragment } from "react";
import Screen from "../../components/Screen";
import { useScreenContext } from "../../contexts/ScreenContext";

export default function GlobalPage(): JSX.Element {
  const { farm } = useScreenContext();

  return (
    farm && (
      <Fragment>
        <Screen expectedRewards={farm?.rewardSequence} />
      </Fragment>
    )
  );
}
