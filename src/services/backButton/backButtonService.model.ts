import { createEvent, createStore, sample } from "effector";

const handleBack = createEvent();
const goBack = createEvent();

const setGoBackHandler = createEvent<VoidFunction | null>();

const $goBackHandler = createStore<null | VoidFunction>(null).on(
  setGoBackHandler,
  (_, callback) => callback
);

sample({
  source: $goBackHandler,
  clock: handleBack,
  fn: (callback) => {
    if (callback) return callback();

    goBack();
  },
});

export const backButtonService = {
  inputs: { handleBack, goBack, setGoBackHandler },
};
