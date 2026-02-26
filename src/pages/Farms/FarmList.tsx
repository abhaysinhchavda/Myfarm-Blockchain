import React, { Fragment } from "react";
import { Farm } from "../../store/farms/reducer";
import _ from "lodash";
import ListView from "../../components/Views/ListView";
import GlobalLoader from "../../components/GlobalLoader";
import styled from "styled-components";

const NoFarm = styled.div`
  margin-top: 50px;
`;

export default function FarmList({ farms }: { farms: Farm[] }): JSX.Element {
  const isLoading = !farms ? true : false;

  return (
    <Fragment>
      {isLoading ? (
        <GlobalLoader color="black" />
      ) : !_.isEmpty(farms) ? (
        farms.map((farm, index) => {
          return <ListView key={index} action="STAKE" farm={farm} />;
        })
      ) : (
        <NoFarm>No Farms Found</NoFarm>
      )}
    </Fragment>
  );
}
