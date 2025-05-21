import { createGate } from "effector-react";
import { currentUserQuery, tasksCountQuery } from "./mainPageService.api";
import { sample } from "effector";

export const MainPageGate = createGate();

sample({
  clock: MainPageGate.open,
  target: [currentUserQuery.start, tasksCountQuery.start],
});

export const mainPageService = {
  inputs: {},
  outputs: {},
  gates: { MainPageGate },
};
