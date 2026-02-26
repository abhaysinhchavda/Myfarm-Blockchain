import React, { Fragment } from "react";
//import { AppNetworkError } from "./AppNetworkError";
import { AppNetworkErrorAlert } from "./AppNetworkErrorAlert";
import WrongNetworkError from "./WrongNetworkError";

export default function ApplicationError(): JSX.Element {
  return (
    <Fragment>
      <AppNetworkErrorAlert />
      {/* <AppNetworkError /> */}
      <WrongNetworkError />
    </Fragment>
  );
}
