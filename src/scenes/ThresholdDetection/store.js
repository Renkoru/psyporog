import produce from "immer";
import sample from "lodash/fp/sample";
import difference from "lodash/fp/difference";

function getRandomLevel(levels, processedVolumes) {
  const targetKeys = difference(levels)(processedVolumes);
  // console.log(
  //   `!!!!------------| ${targetKeys} | ${levels} | ${processedVolumes}`
  // );
  return sample(targetKeys);
}

function isTriesFinished(progress, testsPerVolume) {
  return Object.values(progress).every((x) => x === testsPerVolume);
}

const initialState = {
  currentTry: 0,
  testsPerVolume: 0,
  isStarted: false,
  isFinished: false,
  isDisabled: true,
  result: {},
  progress: {},
  volumeLevel: null,
  processedVolumes: [],
};

const reducer = produce((draft, { type, payload }) => {
  let candidate;
  let isLastTryForLevel;

  const levels = Object.keys(draft.result);
  switch (type) {
    case "init":
      draft.result = payload.data;
      draft.progress = payload.data;
      draft.volumeLevel = payload.volumeLevel;
      draft.testsPerVolume = payload.testsPerVolume;
      return;
    case "start":
      draft.volumeLevel = getRandomLevel(levels, draft.processedVolumes);
      draft.currentTry += 1;
      draft.isStarted = true;
      draft.isDisabled = false;
      return;
    case "enable":
      draft.isDisabled = false;
      return;
    case "mark_yes":
      draft.result[draft.volumeLevel] += 1;
      draft.progress[draft.volumeLevel] += 1;

      isLastTryForLevel =
        draft.progress[draft.volumeLevel] === draft.testsPerVolume;

      if (isLastTryForLevel) {
        draft.processedVolumes.push(draft.volumeLevel);
      }

      draft.volumeLevel = getRandomLevel(levels, draft.processedVolumes);
      draft.isDisabled = true;
      draft.isFinished = isTriesFinished(draft.progress, draft.testsPerVolume);
      if (!draft.isFinished) {
        draft.currentTry += 1;
      }
      return;
    case "mark_no":
      draft.progress[draft.volumeLevel] += 1;

      isLastTryForLevel =
        draft.progress[draft.volumeLevel] === draft.testsPerVolume;
      if (isLastTryForLevel) {
        draft.processedVolumes.push(draft.volumeLevel);
      }

      draft.volumeLevel = getRandomLevel(levels, draft.processedVolumes);
      draft.isDisabled = true;
      draft.isFinished = isTriesFinished(draft.progress, draft.testsPerVolume);
      if (!draft.isFinished) {
        draft.currentTry += 1;
      }
      return;
  }
});

function init(leftLimit, rightLimit, stepsNumber, testsPerVolume) {
  const step = (rightLimit - leftLimit) / stepsNumber;
  console.log(step);
  const initialState = {};

  for (let i = leftLimit; i <= rightLimit; i += step) {
    const rounded = Math.round(i);
    initialState[rounded] = 0;
  }

  return {
    type: "init",
    payload: { data: initialState, volumeLevel: rightLimit, testsPerVolume },
  };
}

const markYes = () => ({ type: "mark_yes" });
const markNo = () => ({ type: "mark_no" });
const enable = () => ({ type: "enable" });
const start = () => ({ type: "start" });

export { init, markYes, markNo, enable, start, reducer, initialState };
