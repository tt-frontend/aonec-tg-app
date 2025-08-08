import { createGate } from "effector-react";
import {
  archiveTasksCountQuery,
  currentUserQuery,
  tasksCountQuery,
} from "./mainPageService.api";
import { sample } from "effector";
import { tasksListService } from "../tasks/tasksList/tasksListService.models";
import { tasksListQuery } from "../tasks/tasksList/tasksListService.api";

export const MainPageGate = createGate();

sample({
  clock: MainPageGate.open,
  target: [
    currentUserQuery.start,
    tasksCountQuery.start,
    archiveTasksCountQuery.start,
    tasksListService.inputs.resetFilters,
    tasksListQuery.reset,
  ],
});

export const mainPageService = {
  inputs: {},
  outputs: {},
  gates: { MainPageGate },
};
