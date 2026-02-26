import { createAction } from "@reduxjs/toolkit";
import { Balance } from "./reducer";

export const setBalance = createAction<Balance>("balance/setBalance");