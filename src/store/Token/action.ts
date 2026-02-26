import { createAction } from "@reduxjs/toolkit";
import { MainTokenData } from "./reducer";
//
export const filltoken =
  createAction<{ tokenlist: MainTokenData[] }>("token/filltoken");
