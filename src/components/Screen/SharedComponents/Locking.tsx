import React from "react";
import MainComponent from "./MainComponent";

export default function Locking({ locking }: { locking: number }): JSX.Element {
  return (
    <div>
      <MainComponent
        title="Lock In"
        tippyContent="Pools can either be locked or open. If a pool is locked , you can only unstake once the pool ends."
        associatedValue={locking === 0 ? "Open" : `${locking} DAYS`}
      />
    </div>
  );
}
