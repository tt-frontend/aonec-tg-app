import { sample } from "effector";
import { createGate } from "effector-react";
import { addCommnetMutation, taskQuery } from "./taskProfileService.api";

const TaskProfileGate = createGate<{ id: number }>();

sample({
  clock: [TaskProfileGate.open],
  fn: ({ id }) => id,
  target: taskQuery.start,
});

sample({
  clock: addCommnetMutation.finished.success,
  source: TaskProfileGate.state,
  filter: TaskProfileGate.status,
  fn: ({ id }) => id,
  target: taskQuery.start,
});

export const taskProfileService = {
  inputs: {},
  outputs: {},
  gates: { TaskProfileGate },
};
