import sample from "lodash/fp/sample";
import difference from "lodash/fp/difference";

import React, { useEffect, useState } from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import { setVolume, sing } from "../../services/tone";

function ThresholdDetection({ leftLimit, rightLimit }) {
  const history = useHistory();
  const [processedVolumes, setProcessed] = useState([]);
  const [volumeLevel, setVolumeLevel] = useState(rightLimit);

  const [result, setResult] = useState({});
  const [progress, setProgress] = useState({});
  const stepsNumber = 5;
  const testsPerVolume = 3;
  const step = (rightLimit - leftLimit) / stepsNumber;

  function getRandomLevel() {
    const targetKeys = difference(Object.keys(result))(processedVolumes);
    console.log(Object.keys(result));
    console.log(processedVolumes);
    console.log(targetKeys);

    let candidate = sample(targetKeys);
    console.log(`${candidate} - ${progress[candidate]} - ${testsPerVolume}`);
    if (progress[candidate] === testsPerVolume - 1) {
      setProcessed([...processedVolumes, candidate]);
    }

    return candidate;
  }

  useEffect(() => {
    const initialState = {};
    for (let i = leftLimit; i <= rightLimit; i += step) {
      initialState[i] = 0;
    }
    setResult(initialState);
    setProgress(initialState);

    console.log(step);
    console.log();
  }, []);

  useEffect(() => {
    sing();
  }, [volumeLevel]);

  function onStart() {
    const randomLevel = getRandomLevel();
    setVolumeLevel(randomLevel);
  }

  function onYes() {
    const randomLevel = getRandomLevel();
    setResult({ ...result, [volumeLevel]: result[volumeLevel] + 1 });
    setProgress({ ...progress, [volumeLevel]: progress[volumeLevel] + 1 });
    setVolumeLevel(randomLevel);
  }

  function onNo() {
    const randomLevel = getRandomLevel();
    setProgress({ ...progress, [volumeLevel]: progress[volumeLevel] + 1 });
    setVolumeLevel(randomLevel);
  }

  // console.log(progress);

  if (Object.values(progress).every((x) => x === testsPerVolume)) {
    return null;
  }

  return (
    <Box>
      <Box>
        <ul>
          {Object.keys(progress).map((i) => (
            <li key={i}>
              {i}: {progress[i]} / {result[i]}
            </li>
          ))}
        </ul>
      </Box>
      <Box>
        <Button mr="20px" onClick={onStart}>
          Начать
        </Button>
      </Box>
      <Box>
        <Button mr="20px" onClick={onYes}>
          Слышно
        </Button>
        <Button mr="20px" onClick={onNo}>
          Не слышно
        </Button>
      </Box>
      <Box>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Link to="/result">Далее</Link>
      </Box>
    </Box>
  );
}

export default ThresholdDetection;
