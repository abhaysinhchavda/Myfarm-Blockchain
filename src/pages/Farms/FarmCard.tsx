import React from "react";
import { Fragment } from "react";
import { Farm } from "../../store/farms/reducer";
import GridView from "../../components/Views/GridView";
import GlobalLoader from "../../components/GlobalLoader";

export default function FarmCard({ farms }: { farms: Farm[] }): JSX.Element {
  const isLoading = !farms;
  return (
    <Fragment>
      {isLoading ? (
        <GlobalLoader color="black" />
      ) : (
        farms.map((farm, index) => {
          return <GridView key={index} action="STAKE" farm={farm} />;
        })
      )}
    </Fragment>
  );
}
