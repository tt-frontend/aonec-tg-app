import { sample } from "effector";
import { createGate } from "effector-react";
import { taskQuery } from "./taskProfileService.api";

const TaskProfileGate = createGate<{ id: number }>();

sample({
  clock: TaskProfileGate.open,
  fn: ({ id }) => id,
  target: taskQuery.start,
});

export const taskProfileService = {
  inputs: {},
  outputs: {},
  gates: { TaskProfileGate },
};
