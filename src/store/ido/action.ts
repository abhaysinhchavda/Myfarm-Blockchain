import { createAction } from "@reduxjs/toolkit";
import { Project } from "./reducer";

export const setIdoProjects = createAction<{ projects: Project[] }>(
  "/ido/setIdoProjects"
);
export const setRefetch = createAction<{ refetch: boolean }>("/ido/setRefetch");
