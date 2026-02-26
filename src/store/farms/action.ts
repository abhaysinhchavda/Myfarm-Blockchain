import { createAction } from "@reduxjs/toolkit";
import { Farms } from "./reducer";

export const setFarms = createAction<Farms>("farms/setFarms");
