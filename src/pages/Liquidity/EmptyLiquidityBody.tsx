import React from "react";
import emptyImage from "../../assets/images/liqudity/empty-box.png";

function EmptyLiquidityBody() {
  return (
    <div className="empty-liquidity-body">
      <img src={emptyImage} alt="empty-img" />
      <h1>No Liquidity Found </h1>
      <p>
        Din&apos;t see a pool you joined ? <a>Import Here</a>
      </p>
    </div>
  );
}

export default EmptyLiquidityBody;
