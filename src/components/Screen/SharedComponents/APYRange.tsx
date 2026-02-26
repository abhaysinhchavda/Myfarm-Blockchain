import { isEmpty } from "lodash";
import React from "react";
import MainComponent from "./MainComponent";

export default function APYRange({
  apyRange,
}: {
  apyRange: number[];
}): JSX.Element {
  return (
    <div>
      <MainComponent
        title="APY Range"
        tippyContent="Yield range you would potentially be earning if you stake in this pool"
        associatedValue={
          isEmpty(apyRange) ? "--" : `${apyRange[0]}-${apyRange[1]}%`
        }
      />
    </div>
  );
}
