import React, { useEffect, useState, useReducer } from "react";
import { Button, Box, Text, Flex } from "rebass";
import { Link, useHistory } from "react-router-dom";

import { setVolume, sing } from "../../services/tone";
import ParamsConfiguration from "./ParamsConfiguration";
import {
  initialState,
  reducer,
  init,
  markYes,
  markNo,
  enable,
  start,
} from "./store";

function ThresholdDetection({ leftLimit, rightLimit }) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [parameters, setParameters] = useState({
    volumesNumber: 5,
    testsPerVolume: 3,
  });

  useEffect(() => {
    dispatch(
      init(
        leftLimit,
        rightLimit,
        parameters.volumesNumber - 1,
        parameters.testsPerVolume
      )
    );
  }, [parameters]);

  useEffect(() => {
    if (!state.isStarted) {
      return () => {};
    }
    setVolume(state.volumeLevel);
    sing();
    const timer = setTimeout(() => dispatch(enable()), 1300);
    return () => clearTimeout(timer);
  }, [state.currentTry]);

  function onParamsChange(data) {
    console.log(data);
    setParameters(data);
  }

  function onStart() {
    dispatch(start());
  }

  function onYes() {
    dispatch(markYes());
  }

  function onNo() {
    dispatch(markNo());
  }

  const isSoundButtonsDisabled = state.isDisabled || state.isFinished;

  return (
    <Box>
      <ParamsConfiguration
        isDisabled={state.isStarted}
        volumesNumber={parameters.volumesNumber}
        testsPerVolume={parameters.testsPerVolume}
        onChange={onParamsChange}
      />
      <Box>
        <ul>
          {Object.keys(state.progress).map((i) => (
            <li key={i}>
              {i}: {state.progress[i]} / {state.result[i]}
            </li>
          ))}
        </ul>
      </Box>
      <Box>
        Прослушанно {state.currentTry} звуков из{" "}
        {parameters.volumesNumber * parameters.testsPerVolume}
      </Box>
      <Box>
        <Button disabled={state.isStarted} mr="20px" onClick={onStart}>
          Начать
        </Button>
      </Box>
      <Box my="20px">
        <Button disabled={isSoundButtonsDisabled} mr="20px" onClick={onYes}>
          Слышно
        </Button>
        <Button disabled={isSoundButtonsDisabled} mr="20px" onClick={onNo}>
          Не слышно
        </Button>
      </Box>
      {state.isFinished && (
        <Box>Тесты закончились, переходите на следующий шаг</Box>
      )}
      <Box>
        <Button mr="20px" onClick={() => history.goBack()}>
          Назад
        </Button>
        <Link to="/psyporog/result">Далее</Link>
      </Box>
    </Box>
  );
}

export default ThresholdDetection;
